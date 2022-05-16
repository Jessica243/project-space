import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import appStyles from '../../appStyles';
import userInformation from '../../database/userData';

interface DetailFormProps {
  onSuccess: () => void,
  onCancel: () => void,
}

const DetailForm = ({ onCancel, onSuccess }: DetailFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const onSubmit = () => {
    let validFirstname = true;
    let validSurname = true;
    let validEmail = true;
    let validPassword = true;
    let validConfirmPassword = true;

    setFirstNameError('');
    setSurnameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if(firstName.length == 0) {
      setFirstNameError(`Please enter your first name`);
      validFirstname = false;
    }

    if(surname.length == 0) {
      setSurnameError(`Please enter your surname`);
      validSurname = false;
    }

    if(email.length == 0) {
      setEmailError(`Please enter your email`);
      validEmail = false;
    }

    if(! email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setEmailError("Please enter a valid email");
      validEmail = false;
    }

    if(password.length == 0) {
      setPasswordError("Please enter your password");
      validPassword = false;
    }

    if(confirmPassword !== password){
      setConfirmPasswordError("Please check, your password don't match");
      validConfirmPassword = false;
    }

    if (userInformation.find(i => i.email.toLowerCase() === email.toLowerCase())) {
      setEmailError("Email already registered, please use a different email");
      validEmail = false;
    }

    if (validFirstname && validSurname && validEmail && validPassword && validConfirmPassword) {
      userInformation.push({
        firstName,
        surname,
        email,
        password
      });
      onSuccess();
    }
  };

  return (
    <View>
      <Text>Please enter you details to create an account:</Text>
      <View>
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={(value) => {
              setFirstNameError('');
              setFirstName(value);
            }}
            value={firstName}
            placeholder="Firstname"
          />
          { firstNameError.length > 0 && <Text style={appStyles.validationError}>{firstNameError}</Text> }
        </View>
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={(value) => {
              setSurnameError('');
              setSurname(value);
            }}
            value={surname}
            placeholder="Surname"
          />
          { surnameError.length > 0 && <Text style={appStyles.validationError}>{surnameError}</Text> }
        </View>
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
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={(value) => {
              setConfirmPasswordError('');
              setConfirmPassword(value);
            }}
            value={confirmPassword}
            secureTextEntry={true}
            placeholder="Confirm password"
          />
          { confirmPasswordError.length > 0 && <Text style={appStyles.validationError}>{confirmPasswordError}</Text> }
        </View>
      </View>
      <View style={appStyles.buttonRow}>
        <Button
          onPress={onCancel}
          title="Cancel"
        />
        <Button
          onPress={onSubmit}
          title="Register"
        />
      </View>
    </View>
    
  );
};

export default DetailForm;
