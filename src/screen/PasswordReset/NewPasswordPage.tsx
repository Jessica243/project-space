import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import appStyles from '../../appStyles';
import { UserInformation } from '../../database/userData';
import validate from '../../util/validator';

interface NewPasswordPageProps {
  onSuccess: () => void,
  onCancel: () => void,
  selectedUser: UserInformation,
}

interface NewPasswordPageState {
  password: string,
  confirmPassword: string,
  passwordError: string,
  confirmPasswordError: string,
}

class NewPasswordPage extends Component<NewPasswordPageProps, NewPasswordPageState> {
  state: NewPasswordPageState = {
    password: '',
    confirmPassword: '',
    passwordError: '',
    confirmPasswordError: '',
  };

  isLengthGreaterThanZero = (value: string) => value.length > 0;

  isPasswordTheSame = (password: string) => (confirmPassword: string) => {
    return password === confirmPassword;
  };

  onSubmit = () => {
    this.setState({ passwordError: '', confirmPasswordError: '' });

    const passwordResult = validate(this.state.password, [
      {
        check: this.isLengthGreaterThanZero,
        errorMsg: 'Please enter your password',
      },
    ]);

    const confirmPasswordResult = validate(this.state.confirmPassword, [
      {
        check: this.isPasswordTheSame(this.state.password),
        errorMsg: "Please check, your password don't match",
      },
    ]);

    if(passwordResult.isValid && confirmPasswordResult.isValid) {
      this.props.selectedUser.password = this.state.password;
      this.props.onSuccess();
    } else {
      const [ passwordError ] = passwordResult.errorMessages;
      const [ confirmPasswordError ] = confirmPasswordResult.errorMessages;
      this.setState({
        passwordError: passwordError || '',
        confirmPasswordError: confirmPasswordError || '',
      });
    }
  };

  render(){
    return (
      <View>
        <Text>Please enter your new password</Text>
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={(value) => this.setState({ password: value })}
            value={this.state.password}
            secureTextEntry={true}
            placeholder="Password"
          />
          {
            this.state.passwordError.length > 0 &&
            <Text style={appStyles.validationError}>{this.state.passwordError}</Text>
          }
        </View>
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={(value) => this.setState({ confirmPassword: value })}
            value={this.state.confirmPassword}
            secureTextEntry={true}
            placeholder="Confirm password"
          />
          {
            this.state.confirmPasswordError.length > 0 &&
            <Text style={appStyles.validationError}>{this.state.confirmPasswordError}</Text>
          }
        </View>
        <View style={appStyles.buttonRow}>
          <Button
            onPress={this.props.onCancel}
            title="Cancel"
          />
          <Button
            onPress={this.onSubmit}
            title="Save new password"
          />
        </View>
      </View>
    );
  }

}

export default NewPasswordPage;
