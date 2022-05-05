import * as React from 'react'
import { Button, Text, TextInput, View } from 'react-native';
import appStyles from '../../appStyles';

interface EnterEmailPageProps {
  onSuccess: () => void,
  onCancel: () => void,
}

const EnterEmailPage = ({ onSuccess, onCancel }: EnterEmailPageProps) => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const onSubmit = () => {
    let validEmail = true;
    setEmailError('');

    if(email.length == 0) {
      setEmailError(`Please enter your email`);
      validEmail = false;
    }

    if(! email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setEmailError("Please enter a valid email")
      validEmail = false;
    }

    if(validEmail) {
      onSuccess();
    }
  }

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
}

export default EnterEmailPage;
