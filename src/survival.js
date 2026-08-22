/**
 * Did the last session end on its own terms?
 *
 * A model that is too big for the device does not fail politely. On iOS the
 * whole web-content process is killed the moment the memory budget is passed —
 * no exception, no rejected promise, nothing an error handler can catch. The
 * page simply dies.
 *
 * That alone would be survivable. What is not is what happens next: 360AI
 * remembers the chosen model and restores it at the next launch, so the app
 * reopens, loads the same model, and is killed the same way. After a few
 * rounds Safari stops trying and shows "A problem repeatedly occurred", and
 * the app is no longer merely limited on that device — it is unopenable, with
 * no way back in from inside it.
 *
 * So the two spans that can take the process down — loading a model, and
 * generating with one — are marked before they start and unmarked when they
 * finish. A mark still standing at the next launch means the tab did not
 * survive the last one. Two of those in a row and the model stops being
 * restored on its own.
 *
 * Two rather than one because iOS discards backgrounded tabs as a matter of
 * routine, and a user switching apps mid-answer must not be mistaken for a
 * crash. Twice running is a pattern.
 *
 * localStorage rather than IndexedDB, deliberately: it is synchronous, so the
 * mark is on disk before the work that might kill the process begins. An
 * IndexedDB write is a promise, and a killed process never resolves it.
 */

const MARK = '360ai:in-flight'
const STRIKES = '360ai:unclean-exits'

/** Unclean exits with one model before it stops being restored automatically. */
export const STRIKE_LIMIT = 2

function read(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    // Private windows and locked-down browsers refuse storage outright. Without
    // it there is no crash detection, which is a smaller loss than a thrown
    // error on the boot path.
    return null
  }
}

function write(key, value) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // As above: best effort.
  }
}

/**
 * Marks the start of something that could take the process down.
 * `kind` is 'load' or 'answer', and is only used to word the explanation.
 */
export function beginRisk(kind, model) {
  write(MARK, { kind, model, at: Date.now() })
}

/** The span finished — cleanly, whether it succeeded or threw. */
export function endRisk() {
  write(MARK, null)
}

/**
 * Reads and consumes the mark left by a previous session, counting it against
 * the model if there is one. Call once at boot, before anything starts a new
 * risky span, or this session's own mark will be read as last session's death.
 *
 * Returns `{ kind, model, strikes }`, or null if the last session ended
 * cleanly.
 */
export function takeUncleanExit() {
  const mark = read(MARK)
  write(MARK, null)
  if (!mark?.model) return null

  const record = read(STRIKES) ?? {}
  // The kind is kept with the count, not just returned: the model picker has
  // to say *when* it died — loading, or part-way through an answer — on every
  // later launch too, not only on the one that noticed.
  const strikes = (record[mark.model]?.count ?? 0) + 1
  write(STRIKES, { ...record, [mark.model]: { count: strikes, kind: mark.kind } })
  return { kind: mark.kind, model: mark.model, strikes }
}

export function strikesFor(model) {
  return read(STRIKES)?.[model]?.count ?? 0
}

/** How it died last time: 'load' or 'answer'. Null if it never has. */
export function deathKind(model) {
  return read(STRIKES)?.[model]?.kind ?? null
}

/** Called once a model has answered end to end, which is proof it works here. */
export function clearStrikes(model) {
  const record = read(STRIKES)
  if (!record?.[model]) return
  delete record[model]
  write(STRIKES, record)
}

/** A model this device has repeatedly failed to run. */
export function isUnsafe(model) {
  return strikesFor(model) >= STRIKE_LIMIT
}
