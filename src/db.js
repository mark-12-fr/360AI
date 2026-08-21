import { openDB } from 'idb'

/**
 * Everything lives in IndexedDB on this device. Nothing is ever sent anywhere.
 */
const DB_NAME = '360ai'
const DB_VERSION = 2

/** Pre-rename database. Its chats are pulled across once, on first open. */
const LEGACY_DB_NAME = 'bulig-ai'

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db, oldVersion) {
    if (oldVersion < 1) {
      const chats = db.createObjectStore('chats', { keyPath: 'id' })
      chats.createIndex('updatedAt', 'updatedAt')
      db.createObjectStore('settings', { keyPath: 'key' })
    }
    // v2: the facts the user teaches the brain. Same shape as the built-in
    // entries in brain/facts.js so both can be searched as one list.
    if (oldVersion < 2) {
      const facts = db.createObjectStore('facts', { keyPath: 'id' })
      facts.createIndex('createdAt', 'createdAt')
    }
  },
  /**
   * This tab is holding an older version open and blocking another one from
   * upgrading. Let go: leaving both tabs deadlocked is strictly worse than
   * this tab needing a reload.
   */
  blocking(_currentVersion, _blockedVersion, event) {
    event.target.close()
  },
  blocked() {
    console.warn('360ai: another tab is holding the database open at an older version.')
  },
})

/**
 * The app was renamed from Bulig AI to 360AI, and an IndexedDB rename is a new,
 * empty database — so anyone who used the old build would silently lose every
 * chat. Copy them over once, then leave the old database alone as a backup.
 */
async function adoptLegacyData(db) {
  if (!indexedDB.databases) return
  const names = await indexedDB.databases().catch(() => [])
  if (!names.some((d) => d.name === LEGACY_DB_NAME)) return
  if (await db.count('chats')) return

  const old = await openDB(LEGACY_DB_NAME).catch(() => null)
  if (!old?.objectStoreNames.contains('chats')) return

  const chats = await old.getAll('chats').catch(() => [])
  const settings = old.objectStoreNames.contains('settings')
    ? await old.getAll('settings').catch(() => [])
    : []
  const tx = db.transaction(['chats', 'settings'], 'readwrite')
  for (const chat of chats) tx.objectStore('chats').put(chat)
  for (const row of settings) tx.objectStore('settings').put(row)
  await tx.done
  old.close()
  console.info(`360ai: carried over ${chats.length} chat(s) from the previous version.`)
}

const ready = dbPromise.then(async (db) => {
  await adoptLegacyData(db).catch((err) => console.warn('360ai: legacy import skipped', err))
  return db
})

/* ------------------------------------------------------------- taught facts */

/**
 * What the user has taught the brain, newest last. Returned in the entry shape
 * the brain expects: `{ id, source, q: [...], a }`.
 */
export async function listFacts() {
  const rows = await (await ready).getAllFromIndex('facts', 'createdAt')
  return rows.map((row) => ({ id: row.id, source: 'taught', q: [row.q], a: row.a }))
}

/** Teaching the same question twice updates the answer rather than duplicating it. */
export async function saveFact(question, answer) {
  const db = await ready
  const key = question.trim().toLowerCase()
  const existing = (await db.getAll('facts')).find((r) => r.q.trim().toLowerCase() === key)
  const row = {
    id: existing?.id ?? newId(),
    q: question.trim(),
    a: answer.trim(),
    createdAt: existing?.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  }
  await db.put('facts', row)
  return row
}

export async function deleteFact(id) {
  await (await ready).delete('facts', id)
}

export async function clearFacts() {
  await (await ready).clear('facts')
}

export const DEFAULT_SETTINGS = {
  theme: 'dark',
  /**
   * Which engine answers: '360 Brain' by default, or the catalogue id of a
   * downloaded model. Storing the id rather than the WebLLM model name keeps
   * the setting valid when a device switches between the f16 and f32 builds.
   */
  engine: 'brain',
  /** How much detail an answer carries. Applies to both engines. */
  replyLength: 'normal',
  /**
   * Catalogue ids of the models this device has downloaded.
   *
   * The authority is the browser cache, not this list — but reading that
   * cache means loading the six-megabyte WebLLM runtime, which someone who
   * only uses 360 Brain should never pay for. So the app keeps its own record
   * and reconciles it with the cache when the model picker is opened.
   */
  downloaded: [],
}

function newId() {
  return crypto.randomUUID()
}

export async function listChats() {
  const db = await ready
  const all = await db.getAllFromIndex('chats', 'updatedAt')
  return all.reverse()
}

export async function getChat(id) {
  return (await ready).get('chats', id)
}

/**
 * Builds a chat in memory only. It is not written to IndexedDB until the first
 * message is saved — otherwise every page load and every click of "new chat"
 * would leave an empty row behind in the sidebar.
 */
export function createChat() {
  const now = Date.now()
  return {
    id: newId(),
    title: 'New chat',
    messages: [],
    createdAt: now,
    updatedAt: now,
  }
}

/** Most recently updated non-empty chat, or null. */
export async function latestChat() {
  const all = await listChats()
  return all.find((c) => c.messages.length > 0) ?? null
}

export async function saveChat(chat) {
  chat.updatedAt = Date.now()
  await (await ready).put('chats', chat)
  return chat
}

export async function deleteChat(id) {
  await (await ready).delete('chats', id)
}

export async function getSettings() {
  const db = await ready
  const rows = await db.getAll('settings')
  const stored = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  return { ...DEFAULT_SETTINGS, ...stored }
}

export async function setSetting(key, value) {
  await (await ready).put('settings', { key, value })
}

export async function exportAll() {
  return {
    format: '360ai/v1',
    exportedAt: new Date().toISOString(),
    settings: await getSettings(),
    chats: await listChats(),
    facts: await listFacts(),
  }
}

export async function importAll(payload) {
  // Backups written by the pre-rename build stay importable.
  const known = ['360ai/v1', 'bulig-ai/v1']
  if (!known.includes(payload?.format) || !Array.isArray(payload.chats)) {
    throw new Error('This is not a valid 360AI backup file.')
  }
  const db = await ready
  const tx = db.transaction('chats', 'readwrite')
  let count = 0
  for (const chat of payload.chats) {
    if (!chat?.id || !Array.isArray(chat.messages)) continue
    // Re-key on import so a backup can be merged into an existing device
    // without silently overwriting chats that happen to share an id.
    await tx.store.put({ ...chat, id: newId() })
    count++
  }
  await tx.done

  // Taught facts travel with the backup; older files simply have none.
  for (const fact of payload.facts ?? []) {
    const question = Array.isArray(fact?.q) ? fact.q[0] : fact?.q
    if (question && fact?.a) await saveFact(String(question), String(fact.a))
  }

  return count
}

/** Derives a short title from the first user message. */
export function deriveTitle(text) {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > 42 ? `${clean.slice(0, 42)}…` : clean || 'New chat'
}
