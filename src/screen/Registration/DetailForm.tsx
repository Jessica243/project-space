import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import appStyles from '../../appStyles';
import userInformation from '../../database/userData';
import validate from '../../util/validator';

interface DetailFormProps {
  onSuccess: () => void,
  onCancel: () => void,
}

interface DetailFormState {
  firstName: string,
  firstNameError: string,
  surname: string,
  surnameError: string,
  email: string,
  emailError: string,
  password: string,
  passwordError: string,
  confirmPassword: string,
  confirmPasswordError: string,
}

class DetailForm extends Component<DetailFormProps, DetailFormState> {
  state: DetailFormState = {
    firstName: '',
    firstNameError: '',
    surname: '',
    surnameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
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

  isPasswordTheSame = (password: string) => (confirmPassword: string) => {
    return password === confirmPassword;
  };

  isEmailUnregistered = (email: string) => {
    if(userInformation.find(i => i.email.toLowerCase() === email.toLowerCase())) {
      return false;
    } else {
      return true;
    }
  };

  onSubmit = () => {
    this.setState({ firstNameError: '', surnameError: '', emailError: '', passwordError: '', confirmPasswordError: '' });

    const firstNameResult = validate(this.state.firstName, [
      {
        check: this.isLengthGreaterThanZero,
        errorMsg: 'Please enter your first name',
      },
    ]);

    const surnameResult = validate(this.state.surname, [
      {
        check: this.isLengthGreaterThanZero,
        errorMsg: 'Please enter your surname',
      },
    ]);

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
        check: this.isEmailUnregistered,
        errorMsg: 'Email already registered, try another',
      },
    ]);

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

    if (
      firstNameResult.isValid &&
      surnameResult.isValid &&
      emailResult.isValid &&
      passwordResult.isValid &&
      confirmPasswordResult.isValid
    ) {
      userInformation.push({
        firstName: this.state.firstName,
        surname: this.state.surname,
        email: this.state.email,
        password: this.state.password,
      });
      this.props.onSuccess();
    } else {
      const [ firstNameError ] = firstNameResult.errorMessages;
      const [ surnameError ] = surnameResult.errorMessages;
      const [ emailError ] = emailResult.errorMessages;
      const [ passwordError ] = passwordResult.errorMessages;
      const [ confirmPasswordError ] = confirmPasswordResult.errorMessages;

      this.setState({
        firstNameError: firstNameError || '',
        surnameError: surnameError || '',
        emailError: emailError || '',
        passwordError: passwordError || '',
        confirmPasswordError: confirmPasswordError || '',
      });
    }
  };

  render() {
    return (
      <View>
        <Text>Please enter you details to create an account:</Text>
        <View>
          <View>
            <TextInput
              style={appStyles.userInput}
              onChangeText={(value) => {
                this.setState({ firstName: value, firstNameError: '' });
              }}
              value={this.state.firstName}
              placeholder="Firstname"
            />
            {
              this.state.firstNameError.length > 0 &&
              <Text style={appStyles.validationError}>{this.state.firstNameError}</Text>
            }
          </View>
          <View>
            <TextInput
              style={appStyles.userInput}
              onChangeText={(value) => {
                this.setState({ surname: value, surnameError: '' });
              }}
              value={this.state.surname}
              placeholder="Surname"
            />
            {
              this.state.surnameError.length > 0 &&
              <Text style={appStyles.validationError}>{this.state.surnameError}</Text>
            }
          </View>
          <View>
            <TextInput
              style={appStyles.userInput}
              onChangeText={(value) => {
                this.setState({ email: value, emailError: '' });
              }}
              value={this.state.email}
              placeholder="Email"
              keyboardType="email-address"
            />
            {
              this.state.emailError.length > 0 &&
              <Text style={appStyles.validationError}>{this.state.emailError}</Text>
            }
          </View>
          <View>
            <TextInput
              style={appStyles.userInput}
              onChangeText={(value) => {
                this.setState({ password: value, passwordError: '' });
              }}
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
              onChangeText={(value) => {
                this.setState({ confirmPassword: value, confirmPasswordError: '' });
              }}
              value={this.state.confirmPassword}
              secureTextEntry={true}
              placeholder="Confirm password"
            />
            {
              this.state.confirmPasswordError.length > 0 &&
              <Text style={appStyles.validationError}>{this.state.confirmPasswordError}</Text>
            }
          </View>
        </View>
        <View style={appStyles.buttonRow}>
          <Button
            onPress={this.props.onCancel}
            title="Cancel"
          />
          <Button
            onPress={this.onSubmit}
            title="Register"
          />
        </View>
      </View>
    );
  }
}

export default DetailForm;
