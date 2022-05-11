import ParkingPreference from "./ParkingPreference";

interface UserSettings {
  preferences: {
    firstChoice: ParkingPreference,
    secondChoice: ParkingPreference,
    thirdChoice: ParkingPreference
  },
  speechEnabled: boolean,
}

export const initialUserSettings: UserSettings = {
  preferences: {
    firstChoice: ParkingPreference.Cost,
    secondChoice: ParkingPreference.Distance,
    thirdChoice: ParkingPreference.Security,
  },
  speechEnabled: true,
};

export default UserSettings;
