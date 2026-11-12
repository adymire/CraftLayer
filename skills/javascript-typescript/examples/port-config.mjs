export function parsePort(value) {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) {
    throw new TypeError("PORT must be a positive integer");
  }

  const port = Number(value);
  if (!Number.isSafeInteger(port) || port > 65535) {
    throw new RangeError("PORT must be between 1 and 65535");
  }

  return port;
}
