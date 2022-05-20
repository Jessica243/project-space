import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import UserSettings from '../../type/UserSettings';
import ParkingPreference, { parkingPreference, possibleParkingPreferences } from '../../type/ParkingPreference';

import RNPickerSelect from 'react-native-picker-select';
import appStyles from '../../appStyles';
import ResultView, { possibleResultViews, resultView } from '../../type/ResultView';

interface SettingProps {
  onSave: (newSetting: UserSettings) => void,
  onCancel: () => void,
  onLogout: () => void,
  settings: UserSettings,
}

interface SettingState {
  preference: ParkingPreference;
  speechEnabled: boolean;
  preferredView: ResultView;
}

class Setting extends Component<SettingProps, SettingState> {
  state: SettingState = {
    preference: this.props.settings.preference,
    speechEnabled: this.props.settings.speechEnabled,
    preferredView: this.props.settings.preferredView,
  };

  render() {
    return (
      <View>
        <Text style={appStyles.title}>Preferences</Text>
        <RNPickerSelect
          onValueChange={(value) => this.setState({ preference: value })}
          value={this.state.preference}
          items={possibleParkingPreferences.map(p => ({
            label: parkingPreference[ p ],
            value: p,
          }))}
        />
        <Text style={appStyles.title}>Speech</Text>
        <View>
          <RNPickerSelect
            onValueChange={(value) => this.setState({ speechEnabled: value })}
            value={this.state.speechEnabled}
            items={[
              { label: 'Speech enabled', value: true },
              { label: 'No speech', value: false },
            ]}
          />
        </View>
        <Text>Default View</Text>
        <View>
          <RNPickerSelect
            onValueChange={(value) => this.setState({ preferredView: value })}
            value={this.state.preferredView}
            items={possibleResultViews.map(v => ({
              label: resultView[ v ],
              value: v,
            }))}
          />
        </View>
        <View style={appStyles.buttonRow}>
          <Button
            onPress={this.props.onCancel}
            title="Cancel"
          />
          <Button
            onPress={() => this.props.onSave({
              preference: this.state.preference,
              speechEnabled: this.state.speechEnabled,
              preferredView: this.state.preferredView,
            })}
            title="Save"
          />
          <Button
            onPress={this.props.onLogout}
            title="Logout"
          />
        </View>
      </View>
    );
  }
}

export default Setting;
