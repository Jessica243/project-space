import ParkingPreference from '../type/ParkingPreference';
import ResultView from '../type/ResultView';

export interface UserSettings {
  userId: number,
  preference: ParkingPreference,
  speechEnabled: boolean,
  preferredView: ResultView,
}

const userSettings: Array<UserSettings> = [
  {
    userId: 1,
    preference: ParkingPreference.Cost,
    speechEnabled: true,
    preferredView: ResultView.List,
  },
  {
    userId: 2,
    preference: ParkingPreference.Distance,
    speechEnabled: false,
    preferredView: ResultView.Map,
  },
  {
    userId: 3,
    preference: ParkingPreference.Security,
    speechEnabled: true,
    preferredView: ResultView.List,
  },
];

export default userSettings;
