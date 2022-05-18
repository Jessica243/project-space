import React, { Component } from 'react';
import { Button, Text, TextInput, StyleSheet, View } from 'react-native';
import appStyles from '../../appStyles';
import userInformation from '../../database/userData';
import validate from '../../util/validator';

interface LoginProps {
  onLoginSuccess: () => void,
  onRequestRegistration: () => void,
  onForgotPassword: () => void,
}

interface LoginState {
  email: string,
  password: string,
  emailError: string,
  passwordError: string,
}

class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  };

  styles = StyleSheet.create({
    loginSection: {
      paddingBottom: 10,
    },
    linksSection: {
      paddingBottom: 10,
      alignItems: 'center',
    },
  });

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

  isPasswordCorrect = (email: string) => (password: string) => {
    const user = this.findUserByEmail(email);
    if(user) {
      return user.password === password;
    } else {
      return false;
    }
  };

  onSubmit = () => {
    this.setState({ emailError: '', passwordError: '' });

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

    const passwordResult = validate(this.state.password, [
      {
        check: this.isLengthGreaterThanZero,
        errorMsg: 'Please enter your password',
      },
      {
        check: this.isPasswordCorrect(this.state.email),
        errorMsg: 'Invalid password',
      },
    ]);

    if(emailResult.isValid && passwordResult.isValid) {
      this.props.onLoginSuccess();
    } else {
      const [ emailError ] = emailResult.errorMessages;
      const [ passwordError ] = passwordResult.errorMessages;
      this.setState({
        emailError: emailError || '',
        passwordError: passwordError || '',
      });
    }
  };

  render() {
    return (
      <View>
        <Text style={appStyles.title}>The Space</Text>
        <View style={this.styles.loginSection}>
          <View>
            <TextInput
              style={appStyles.userInput}
              onChangeText={(value) => {
                this.setState({ email: value, emailError: '' });
              }}
              value={this.state.email || ''}
              placeholder="Email"
              keyboardType="email-address"
            />
            {
              this.state.emailError.length > 0 &&
              <Text style={appStyles.validationError}>
                {this.state.emailError}
              </Text>
            }
          </View>
          <View>
            <TextInput
              style={appStyles.userInput}
              onChangeText={(value) => {
                this.setState({ password: value, passwordError: '' });
              }}
              value={this.state.password || ''}
              secureTextEntry={true}
              placeholder="Password"
            />
            {
              this.state.passwordError.length > 0 &&
              <Text style={appStyles.validationError}>
                {this.state.passwordError}
              </Text>
            }
          </View>
        </View>
        <View style={this.styles.linksSection}>
          <Text
            onPress={this.props.onRequestRegistration}
            style={appStyles.link}
          >
         I want to register an account
          </Text>
          <Text onPress={this.props.onForgotPassword} style={appStyles.link}>
         I forgot my password
          </Text>
        </View>
        <Button
          onPress={this.onSubmit}
          title="Login"
        />
      </View>
    );
  }
}

export default Login;