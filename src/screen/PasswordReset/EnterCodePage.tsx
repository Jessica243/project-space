import React, { Component } from 'react';
import {
  Button, Text, TextInput, View,
} from 'react-native';
import appStyles from '../../appStyles';
import validate from '../../util/validator';

interface EnterCodePageProps {
  onSuccess: () => void,
  onCancel: () => void,
}

interface EnterCodePageState {
  code: string,
  codeError: string,
}

class EnterCodePage extends Component<EnterCodePageProps, EnterCodePageState> {
  state: EnterCodePageState = {
    code: '',
    codeError: '',
  };

  isLengthGreaterThanZero = (value: string) => value.length > 0;

  isCodeNumber = (code: string) => {
    if (code.match(/^\d+$/)) {
      return true;
    } else {
      return false;
    }
  };

  onSubmit = () => {
    this.setState({ codeError: '' });

    const codeResult = validate(this.state.code, [
      {
        check: this.isLengthGreaterThanZero,
        errorMsg: 'Please enter your code',
      },
      {
        check: this.isCodeNumber,
        errorMsg: 'Please enter a valid numeric code',
      },
    ]);

    if (codeResult.isValid) {
      this.props.onSuccess();
    } else {
      const [ codeError ] = codeResult.errorMessages;
      this.setState({
        codeError: codeError || '',
      });
    }
  };

  render() {
    return (
      <View>
        <Text>Please enter your code</Text>
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={(value) => this.setState({ code: value })}
            value={this.state.code}
            placeholder="Code"
            keyboardType="number-pad"
          />
          {
            this.state.codeError.length > 0 &&
          <Text style={appStyles.validationError}>{this.state.codeError}</Text>
          }
        </View>
        <View style={appStyles.buttonRow}>
          <Button
            onPress={this.props.onCancel}
            title="Cancel"
          />
          <Button
            onPress={this.onSubmit}
            title="Verify code"
          />
        </View>
      </View>
    );
  }
}

export default EnterCodePage;
