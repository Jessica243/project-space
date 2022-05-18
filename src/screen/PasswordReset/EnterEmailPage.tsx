import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import appStyles from '../../appStyles';
import userInformation, { UserInformation } from '../../database/userData';
import validate from '../../util/validator';

interface EnterEmailPageProps {
  onSuccess: (user: UserInformation) => void,
  onCancel: () => void,
}

interface EnterEmailPageState {
  email: string;
  emailError: string;
}

class EnterEmailPage extends Component<EnterEmailPageProps, EnterEmailPageState> {
  state: EnterEmailPageState = {
    email: '',
    emailError: '',
  };

  isLengthGreaterThanZero = (value: string) => value.length > 0;

  isEmailInCorrectFormat = (email: string) => {
    const validEamilRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.toLowerCase().match(validEamilRegex)) {
      return true;
    } else {
      return false;
    }
  };

  isEmailRegistered = (email: string) => {
    if(this.findUserByEmail(email)) {
      return true;
    } else {
      return false;
    }
  };

  findUserByEmail = (email: string) => {
    return userInformation.find(i => i.email.toLowerCase() === email.toLowerCase());
  };

  onSubmit = () => {
    this.setState({ emailError: '' });

    const emailResult = validate(this.state.email, [
      {
        check: this.isLengthGreaterThanZero,
        errorMsg: 'Please enter your email',
      },
      {
        check: this.isEmailInCorrectFormat,
        errorMsg: 'Please enter a valid email',
      },
      {
        check: this.isEmailRegistered,
        errorMsg: 'Email not found, try another',
      },
    ]);

    if(emailResult.isValid) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const user = this.findUserByEmail(this.state.email)!;
      this.props.onSuccess(user);
    } else {
      const [ emailError ] = emailResult.errorMessages;
      this.setState({
        emailError: emailError || '',
      });
    }
  };

  render(){
    return (
      <View>
        <Text>Please enter your email</Text>
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={(value) => this.setState({ email: value })}
            value={this.state.email}
            placeholder="Email"
            keyboardType="email-address"
          />
          {
            this.state.emailError.length > 0 &&
            <Text style={appStyles.validationError}>{this.state.emailError}</Text>
          }
        </View>
        <View style={appStyles.buttonRow}>
          <Button
            onPress={this.props.onCancel}
            title="Cancel"
          />
          <Button
            onPress={this.onSubmit}
            title="Send code"
          />
        </View>
      </View>
    );
  }
}

export default EnterEmailPage;
