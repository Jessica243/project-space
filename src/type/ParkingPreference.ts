
enum ParkingPreference {
  Cost = 'Cost',
  Distance = 'Distance',
  Security = 'Security',
}

export const parkingPreference: Record<ParkingPreference, string> = {
  [ ParkingPreference.Cost ]: 'Cost',
  [ ParkingPreference.Distance ]: 'Distance',
  [ ParkingPreference.Security ]: 'Security',
};

export const possibleParkingPreferences: ParkingPreference[] =
  (Object.keys(ParkingPreference) as Array<ParkingPreference>);

export default ParkingPreference;
