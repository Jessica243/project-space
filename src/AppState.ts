import ParkingPreference from "./ParkingPreference";

interface AppState {
  preferences: {
    firstChoice: ParkingPreference,
    secondChoice: ParkingPreference,
    thirdChoice: ParkingPreference
  }
}

export const initialState: AppState = {
  preferences: {
    firstChoice: ParkingPreference.Cost,
    secondChoice: ParkingPreference.Distance,
    thirdChoice: ParkingPreference.Security,
  }
};

export default AppState;
