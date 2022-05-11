import React, {useState} from 'react';
import { Text, View, Button } from 'react-native';
import UserSettings from '../UserSettings';
import ParkingPreference, { parkingPreference, possibleParkingPreferences } from '../ParkingPreference';

import RNPickerSelect from 'react-native-picker-select';
import appStyles from '../appStyles';

interface SettingProps {
  onSave: (newSetting: UserSettings) => void,
  onCancel: () => void,
  settings: UserSettings,
}


const Setting = ({onSave, onCancel, settings}: SettingProps) => {
  const [preference1, setPreference1] = useState<ParkingPreference>(settings.preferences.firstChoice);
  const [preference2, setPreference2] = useState<ParkingPreference>(settings.preferences.secondChoice);
  const [preference3, setPreference3] = useState<ParkingPreference>(settings.preferences.thirdChoice);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(settings.speechEnabled);

  const items = possibleParkingPreferences.map(p => ({label: parkingPreference[p], value: p}));

  return (
    <View>
      <Text style={appStyles.title}>Preferences</Text>
      <View style={appStyles.row}>
        <Text>1</Text>
        <RNPickerSelect
          onValueChange={(value) => setPreference1(value)}
          value={preference1}
          items={items}
        />
      </View>
      <View style={appStyles.row}>
        <Text>2</Text>
        <RNPickerSelect
          onValueChange={(value) => setPreference2(value)}
          value={preference2}
          items={items}
        />
      </View>
      <View style={appStyles.row}>
        <Text>3</Text>
        <RNPickerSelect
          onValueChange={(value) => setPreference3(value)}
          value={preference3}
          items={items}
        />
      </View>
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
            preferences: {firstChoice: preference1, secondChoice: preference2, thirdChoice: preference3},
            speechEnabled: speechEnabled,
          })}
          title="Save"
        />
      </View>
    </View>

  );
};

export default Setting;
