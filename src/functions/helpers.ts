export const allowFalsyFallback = <T>(value: T, fallback: T) => {
  return value ||
    value === 0 ||
    value === false ||
    value === null ||
    value === undefined
    ? value
    : fallback
}
