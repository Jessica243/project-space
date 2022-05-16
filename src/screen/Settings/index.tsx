import React, {useState} from 'react';
import { Text, View, Button } from 'react-native';
import UserSettings from '../../type/UserSettings';
import ParkingPreference, { parkingPreference, possibleParkingPreferences } from '../../type/ParkingPreference';

import RNPickerSelect from 'react-native-picker-select';
import appStyles from '../../appStyles';

interface SettingProps {
  onSave: (newSetting: UserSettings) => void,
  onCancel: () => void,
  settings: UserSettings,
}


const Setting = ({onSave, onCancel, settings}: SettingProps) => {
  const [preference, setPreference] = useState<ParkingPreference>(settings.preference);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(settings.speechEnabled);

  const items = possibleParkingPreferences.map(p => ({label: parkingPreference[p], value: p}));

  return (
    <View>
      <Text style={appStyles.title}>Preferences</Text>
      <RNPickerSelect
        onValueChange={(value) => setPreference(value)}
        value={preference}
        items={items}
      />
      <Text style={appStyles.title}>Speech</Text>
      <View>
        <RNPickerSelect
          onValueChange={(value) => setSpeechEnabled(value)}
          value={speechEnabled}
          items={[{label: 'Speech enabled', value: true}, {label: 'No speech', value: false}]}
        />
      </View>
      <View style={appStyles.buttonRow}>
        <Button
          onPress={onCancel}
          title="Cancel"
        />
        <Button
          onPress={() => onSave({
            preference,
            speechEnabled: speechEnabled,
          })}
          title="Save"
        />
      </View>
    </View>

  );
};

export default Setting;
