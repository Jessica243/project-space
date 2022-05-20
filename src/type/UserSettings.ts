import ParkingPreference from './ParkingPreference';
import ResultView from './ResultView';

interface UserSettings {
  preference: ParkingPreference,
  speechEnabled: boolean,
  preferredView: ResultView,
}

export const initialUserSettings: UserSettings = {
  preference: ParkingPreference.Distance,
  speechEnabled: true,
  preferredView: ResultView.Map,
};

export default UserSettings;
