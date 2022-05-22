import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
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
  vehicleHelightCentimetre: number;
}

class Setting extends Component<SettingProps, SettingState> {
  state: SettingState = this.props.settings
    ? {
      preference: this.props.settings.preference,
      speechEnabled: this.props.settings.speechEnabled,
      preferredView: this.props.settings.preferredView,
      vehicleHelightCentimetre: this.props.settings.vehicleHelightCentimetre,
    }
    : {
      preference: ParkingPreference.Cost,
      speechEnabled: true,
      preferredView: ResultView.Map,
      vehicleHelightCentimetre: 150,
    };

  styles = StyleSheet.create({
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 10,
    },
    question: {
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10,
    },
    headingSection: {
      paddingBottom: 20,
    },
  });

  render() {
    return (
      <View style={appStyles.page}>
        <View style={this.styles.headingSection}>
          {
            this.props.settings
              ? (
                <View>
                  <Text style={appStyles.title}>Settings</Text>
                  <View>
                    <Text>First Name: {this.props.user.firstName}</Text>
                    <Text>Surname: {this.props.user.surname}</Text>
                    <Text>Email: {this.props.user.email}</Text>
                  </View>
                </View>
              )
              : (
                <View>
                  <Text style={appStyles.title}>
                  Welcome {this.props.user.firstName}
                  </Text>
                  <Text>
                  Please answer the questions below to set up your account.
                  You can change this later by going to user settings.
                  </Text>
                </View>
              )
          }
        </View>
        <View>
          <Text style={this.styles.question}>What is your vehicle height?</Text>
          <View style={appStyles.row}>
            <TextInput
              onChangeText={(value) => this.setState({ vehicleHelightCentimetre: parseInt(value) })}
              value={
                this.state.vehicleHelightCentimetre
                  ? this.state.vehicleHelightCentimetre.toString()
                  : ''
              }
              placeholder="vehicle height"
              keyboardType='number-pad'
            />
            <Text>cm</Text>
          </View>
        </View>
        <View>
          <Text style={this.styles.question}>
            What is most important when you look for parking?
          </Text>
          <RNPickerSelect
            onValueChange={(value) => this.setState({ preference: value })}
            value={this.state.preference}
            items={possibleParkingPreferences.map(p => ({
              label: parkingPreference[ p ],
              value: p,
            }))}
          />
        </View>
        <View>
          <Text style={this.styles.question}>Would you like to enable speech?</Text>
          <RNPickerSelect
            onValueChange={(value) => this.setState({ speechEnabled: value })}
            value={this.state.speechEnabled}
            items={[
              { label: 'Speech enabled', value: true },
              { label: 'No speech', value: false },
            ]}
          />
        </View>
        <View>
          <Text style={this.styles.question}>Which result view would you like to use? </Text>
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
              vehicleHelightCentimetre: this.state.vehicleHelightCentimetre,
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
