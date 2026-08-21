import { openDB } from 'idb'

/**
 * Everything lives in IndexedDB on this device. Nothing is ever sent anywhere.
 */
const DB_NAME = 'bulig-ai'
const DB_VERSION = 1

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    const chats = db.createObjectStore('chats', { keyPath: 'id' })
    chats.createIndex('updatedAt', 'updatedAt')
    db.createObjectStore('settings', { keyPath: 'key' })
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
    console.warn('bulig-ai: another tab is holding the database open at an older version.')
  },
})

export const DEFAULT_SETTINGS = {
  systemPrompt:
    'You are Bulig, a helpful AI assistant running privately on the user\'s own device. ' +
    'Answer in the same language the user writes in. Be clear and concise. ' +
    'If you are not sure about something, say so plainly instead of inventing an answer.',
  temperature: 0.7,
  contextWindow: 10,
  lastModelId: 'qwen3-4b',
  ollamaUrl: 'http://127.0.0.1:11434',
  theme: 'dark',
  autoLoadModel: true,
  // Ids of models this device has finished downloading at least once. Used to
  // decide whether a start-up auto-load would hit the cache or kick off a
  // multi-gigabyte download, without having to pull in the WebLLM runtime.
  cachedModels: [],
}

function newId() {
  return crypto.randomUUID()
}

export async function listChats() {
  const db = await dbPromise
  const all = await db.getAllFromIndex('chats', 'updatedAt')
  return all.reverse()
}

export async function getChat(id) {
  return (await dbPromise).get('chats', id)
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
  await (await dbPromise).put('chats', chat)
  return chat
}

export async function deleteChat(id) {
  await (await dbPromise).delete('chats', id)
}

export async function getSettings() {
  const db = await dbPromise
  const rows = await db.getAll('settings')
  const stored = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  return { ...DEFAULT_SETTINGS, ...stored }
}

export async function setSetting(key, value) {
  await (await dbPromise).put('settings', { key, value })
}

export async function exportAll() {
  return {
    format: 'bulig-ai/v1',
    exportedAt: new Date().toISOString(),
    settings: await getSettings(),
    chats: await listChats(),
  }
}

export async function importAll(payload) {
  if (payload?.format !== 'bulig-ai/v1' || !Array.isArray(payload.chats)) {
    throw new Error('This is not a valid Bulig AI backup file.')
  }
  const db = await dbPromise
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
  return count
}

/** Derives a short title from the first user message. */
export function deriveTitle(text) {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > 42 ? `${clean.slice(0, 42)}…` : clean || 'New chat'
}
