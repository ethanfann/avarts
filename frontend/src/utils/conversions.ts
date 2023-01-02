const MPS_TO_MPH_FACTOR: number = 2.23694
const MPS_TO_KMH_FACTOR: number = 3.6
const DECIMAL_PLACES: number = 1

export const formatSpeed = (
  speed: number,
  measurementPreference: string
): string => {
  return (measurementPreference === 'feet'
    ? speed * MPS_TO_MPH_FACTOR
    : speed * MPS_TO_KMH_FACTOR
  ).toFixed(DECIMAL_PLACES)
}
