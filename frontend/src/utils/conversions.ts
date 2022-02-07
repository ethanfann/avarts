export const formatSpeed = (
  speed: number,
  measurementPreference: string
): string => {
  return measurementPreference === 'feet'
    ? (speed * 2.23694).toFixed(1)
    : (speed * 3.6).toFixed(1)
}
