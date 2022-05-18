import ParkingPreference from './ParkingPreference';

interface UserSettings {
  preference: ParkingPreference,
  speechEnabled: boolean,
}

export const initialUserSettings: UserSettings = {
  preference: ParkingPreference.Distance,
  speechEnabled: false, //TODO: change back to true
};

export default UserSettings;
