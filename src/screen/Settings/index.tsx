import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import ParkingPreference, { parkingPreference, possibleParkingPreferences } from '../../type/ParkingPreference';

import RNPickerSelect from 'react-native-picker-select';
import appStyles from '../../appStyles';
import ResultView, { possibleResultViews, resultView } from '../../type/ResultView';
import { UserSettings } from '../../database/userSettingsData';
import { UserInformation } from '../../database/userData';

interface SettingProps {
  onSave: (newSetting: UserSettings) => void,
  onCancel: () => void,
  onLogout: () => void,
  settings: UserSettings | undefined,
  user: UserInformation,
}

interface SettingState {
  preference: ParkingPreference;
  speechEnabled: boolean;
  preferredView: ResultView;
}

class Setting extends Component<SettingProps, SettingState> {
  state: SettingState = this.props.settings
    ? {
      preference: this.props.settings.preference,
      speechEnabled: this.props.settings.speechEnabled,
      preferredView: this.props.settings.preferredView,
    }
    : {
      preference: ParkingPreference.Cost,
      speechEnabled: true,
      preferredView: ResultView.Map,
    };

  styles = StyleSheet.create({
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 10,
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 10,
      marginTop: 10,
    },
  });

  render() {
    return (
      <View style={appStyles.page}>
        {
          this.props.settings
            ? <Text style={this.styles.title}>Preferences</Text>
            : <Text style={this.styles.title}>
              Welcome {this.props.user.firstName}.
              Please select your preferences for parking.
            </Text>
        }
        <RNPickerSelect
          onValueChange={(value) => this.setState({ preference: value })}
          value={this.state.preference}
          items={possibleParkingPreferences.map(p => ({
            label: parkingPreference[ p ],
            value: p,
          }))}
        />
        <Text style={this.styles.subtitle}>Speech</Text>
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
        <Text style={this.styles.subtitle}>Default View</Text>
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
          {
            this.props.settings &&
            <Button
              onPress={this.props.onCancel}
              title="Cancel"
            />
          }
          <Button
            onPress={() => this.props.onSave({
              userId: this.props.user.id,
              preference: this.state.preference,
              speechEnabled: this.state.speechEnabled,
              preferredView: this.state.preferredView,
            })}
            title="Save"
          />
          {
            this.props.settings &&
            <Button
              onPress={this.props.onLogout}
              title="Logout"
            />
          }
        </View>
      </View>
    );
  }
}

export default Setting;
