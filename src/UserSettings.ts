import ParkingPreference from "./ParkingPreference";

interface UserSettings {
  preference: ParkingPreference,
  speechEnabled: boolean,
}

export const initialUserSettings: UserSettings = {
  preference: ParkingPreference.Distance,
  speechEnabled: true,
};

export default UserSettings;
