import React, { useState } from 'react';
import { Button, Text, TextInput, StyleSheet, View, ImageBackground } from 'react-native';
import appStyles from '../appStyles';
import userInformation from '../database/userData';
// import parkingImage from '../../assets/parkingLot.jpg';

interface LoginProps {
  onLoginSuccess: () => void,
  onRequestRegistration: () => void,
  onForgotPassword: () => void,
}

const Login = ({
  onLoginSuccess,
  onRequestRegistration,
  onForgotPassword,
}: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [emailError, setEmailError ] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = () => {
    let validEmail = true;
    let validPassword = true;

    setEmailError('');
    setPasswordError('');

    if(email.length == 0) {
      setEmailError(`Please enter your email`);
      validEmail = false;
    }

    if(validEmail && ! email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setEmailError("Please enter a valid email");
      validEmail = false;
    }

    if(password.length == 0) {
      setPasswordError("Please enter your password");
      validPassword = false;
    }

    console.log('>>> userInformation', userInformation);

    const user = userInformation.find(i => i.email === email);

    if (validEmail && !user) {
      setEmailError("Unknown email");
      validEmail = false;
    }

    if (validEmail && user && user.password !== password) {
      setPasswordError("Invalid password");
      validPassword = false;
    }

    if(validEmail && validPassword) {
      onLoginSuccess();
    }

  };

  return (
    <View>
      {/* <ImageBackground source={parkingImage} resizeMode="cover" style={componentStyles.backgroundImage}> */}
      <Text style={appStyles.title}>The Space</Text>
      <View style={componentStyles.loginSection}>
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={(value) => {
              setEmailError('');
              setEmail(value);
            }}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
          { emailError.length > 0 && <Text style={appStyles.validationError}>{emailError}</Text> }
        </View>
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={(value) => {
              setPasswordError('');
              setPassword(value);
            }}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
          />
          { passwordError.length > 0 && <Text style={appStyles.validationError}>{passwordError}</Text> }
        </View>
      </View>
      <View style={componentStyles.linksSection}>
        <Text onPress={onRequestRegistration} style={appStyles.link}>
       I want to register an account
        </Text>
        <Text onPress={onForgotPassword} style={appStyles.link}>
       I forgot my password
        </Text>
      </View>
      <Button
        onPress={onSubmit}
        title="Login"
      />
      {/* </ImageBackground> */}
    </View>
  );
};

const componentStyles = StyleSheet.create({
  loginSection: {
    paddingBottom: 10,
  },
  linksSection: {
    paddingBottom: 10,
    alignItems: 'center',
  },
  // backgroundImage: {
  //   flex: 1,
  //   justifyContent: "center",
  //   width: '100%'
  // }
});

export default Login;