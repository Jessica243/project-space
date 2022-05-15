import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import appStyles from '../../appStyles';
import userInformation, { UserInformation } from '../../database/userData';

interface EnterEmailPageProps {
  onSuccess: (user: UserInformation) => void,
  onCancel: () => void,
}

const EnterEmailPage = ({ onSuccess, onCancel }: EnterEmailPageProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const onSubmit = () => {
    let validEmail = true;
    setEmailError('');

    if(email.length == 0) {
      setEmailError(`Please enter your email`);
      validEmail = false;
    }

    if(! email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setEmailError("Please enter a valid email");
      validEmail = false;
    }

    const user = userInformation.find(i => i.email === email);

    if(!user) {
      setEmailError("Email not found in system, please try a different email.");
      validEmail = false;
    }

    if(user && validEmail) {
      onSuccess(user);
    }
  };

  return (
    <View>
      <Text>Please enter your email</Text>
      <View>
        <TextInput
          style={appStyles.userInput}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
        />
        { emailError.length > 0 && <Text style={appStyles.validationError}>{emailError}</Text> }
      </View>
      <View style={appStyles.buttonRow}>
        <Button
          onPress={onCancel}
          title="Cancel"
        />
        <Button
          onPress={onSubmit}
          title="Send code"
        />
      </View>
    </View>
  );
};

export default EnterEmailPage;
