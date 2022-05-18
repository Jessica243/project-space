import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import appStyles from '../../appStyles';
import validate from '../../util/validator';

interface StoppedPageProps {
  onStart: (seconds: number) => void;
}

interface StoppedPageState {
  hours: number;
  minutes: number;
  seconds: number;
  error: string;
}

class StoppedPage extends Component<StoppedPageProps, StoppedPageState> {
  state: StoppedPageState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    error: '',
  };

  styles = StyleSheet.create({
    constDownNumberEditMode: {
      fontSize: 70,
      color: 'red',
    },
  });

  toTwoDigitString = (value: number) => {
    return String(value).padStart(2, '0');
  };

  isTimeGreaterThanZero = (
    { hours, minutes, seconds }:{hours: number, minutes: number, seconds: number},
  ) => {
    if(hours < 0 || minutes < 0 || seconds < 0) {
      return false;
    }
    return true;
  };

  onSubmit = () => {
    this.setState({ error: '' });

    const validateResult = validate({
      hours: this.state.hours,
      minutes: this.state.minutes,
      seconds: this.state.seconds,
    }, [
      {
        check: this.isTimeGreaterThanZero,
        errorMsg: 'Please enter a time greater than zero',
      },
    ]);

    if (validateResult.isValid){
      this.props.onStart(this.state.hours * 3600 + this.state.minutes * 60 + this.state.seconds);
    } else {
      const [ error ] = validateResult.errorMessages;
      this.setState({
        error: error || '',
      });
    }
  };

  render() {
    return (
      <View>
        <View style={appStyles.row}>
          <TextInput
            style={this.styles.constDownNumberEditMode}
            onChangeText={(value) => this.setState({ hours: parseInt(value) }) }
            value={this.toTwoDigitString(this.state.hours)}
            keyboardType="decimal-pad"
          />
          <Text style={this.styles.constDownNumberEditMode}>:</Text>
          <TextInput
            style={this.styles.constDownNumberEditMode}
            onChangeText={(value) =>this.setState({ minutes: parseInt(value) })}
            value={this.toTwoDigitString(this.state.minutes)}
            keyboardType="decimal-pad"
          />
          <Text style={this.styles.constDownNumberEditMode}>:</Text>
          <TextInput
            style={this.styles.constDownNumberEditMode}
            onChangeText={(value) => this.setState({ seconds: parseInt(value) })}
            value={this.toTwoDigitString(this.state.seconds)}
            keyboardType="decimal-pad"
          />
        </View>
        {
          this.state.error.length > 0 &&
          <Text style={appStyles.validationError}>
            {this.state.error}
          </Text>
        }
        <View style={appStyles.buttonRow}>
          <Button title='Clear' onPress={() => {
            this.setState({ hours: 0, minutes: 0, seconds: 0 });
          }}/>
          <Button title="Start" onPress={() => {
            this.onSubmit();
          }}/>
        </View>
      </View>
    );
  }
}

export default StoppedPage;
