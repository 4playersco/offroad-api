export function createTimestamp(time: Date = new Date()) {
  // ex: 2017-06-29 17:54:04
  return time.toISOString().slice(0, 19).replace("T", " ");
}
