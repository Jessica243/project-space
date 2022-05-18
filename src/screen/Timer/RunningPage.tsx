import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import appStyles from '../../appStyles';

interface RunningPageProps {
  onStop: () => void;
  seconds: number;
}

class RunningPage extends Component<RunningPageProps> {
  styles = StyleSheet.create({
    countDownNumber: {
      fontSize: 70,
    },
  });

  toTwoDigitString = (value: number) => {
    return String(value).padStart(2, '0');
  };

  getHours = (seconds: number) => {
    return Math.floor(seconds / 3600) % 60;
  };

  getMinutes = (seconds: number) => {
    return Math.floor(seconds / 60) % 60;
  };

  getSeconds = (seconds: number) => {
    return seconds % 60;
  };

  render() {
    return (
      <View>
        <View style={appStyles.row}>
          <Text style={this.styles.countDownNumber}>
            {this.toTwoDigitString(this.getHours(this.props.seconds))}
          :
            {this.toTwoDigitString(this.getMinutes(this.props.seconds))}
          :
            {this.toTwoDigitString(this.getSeconds(this.props.seconds))}
          </Text>
        </View>
        <View style={appStyles.buttonRow}>
          <Button title="Stop" onPress={() => {
            this.props.onStop();
          }}/>
        </View>
      </View>
    );
  }
}

export default RunningPage;
