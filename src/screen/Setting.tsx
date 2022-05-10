import React, {useState} from 'react';
import { Text, View, Button } from 'react-native';
import AppState from '../AppState';
import ParkingPreference, { parkingPreference, possibleParkingPreferences } from '../ParkingPreference';

import RNPickerSelect from 'react-native-picker-select';
import appStyles from '../appStyles';

interface SettingProps {
  onSave: (newSetting: AppState) => void,
  onCancel: () => void,
  state: AppState,
}


const Setting = ({onSave, onCancel, state}: SettingProps) => {
  const [preference1, setPreference1] = useState<ParkingPreference>(state.preferences.firstChoice);
  const [preference2, setPreference2] = useState<ParkingPreference>(state.preferences.secondChoice);
  const [preference3, setPreference3] = useState<ParkingPreference>(state.preferences.thirdChoice);

  const items = possibleParkingPreferences.map(p => ({label: parkingPreference[p], value: p}));

  return (
    <View>
      <Text style={appStyles.title}>Settings</Text>
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
      <View style={appStyles.buttonRow}>
        <Button
          onPress={onCancel}
          title="Cancel"
        />
        <Button
          onPress={() => onSave({preferences: {firstChoice: preference1, secondChoice: preference2, thirdChoice: preference3}})}
          title="Save"
        />
      </View>
    </View>

  );
};

export default Setting;
