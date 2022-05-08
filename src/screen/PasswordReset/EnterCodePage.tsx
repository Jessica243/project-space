import React, { useState } from 'react';
import {
  Button, Text, TextInput, View,
} from 'react-native';
import appStyles from '../../appStyles';

interface EnterCodePageProps {
  onSuccess: () => void,
  onCancel: () => void,
}

const EnterCodePage = ({ onSuccess, onCancel }: EnterCodePageProps): JSX.Element => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const onSubmit = () => {
    let validCode = true;
    setCodeError('');

    if (code.length === 0) {
      setCodeError('Please enter your code');
      validCode = false;
    }

    if (!code.match(/^\d+$/)) {
      setCodeError('Please enter a valid numeric code');
      validCode = false;
    }

    if (validCode) {
      onSuccess();
    }
  };

  return (
    <View>
      <Text>Please enter your code</Text>
      <View>
        <TextInput
          style={appStyles.userInput}
          onChangeText={setCode}
          value={code}
          placeholder="Code"
          keyboardType="number-pad"
        />
        { codeError.length > 0 && <Text style={appStyles.validationError}>{codeError}</Text> }
      </View>
      <View style={appStyles.buttonRow}>
        <Button
          onPress={onCancel}
          title="Cancel"
        />
        <Button
          onPress={onSubmit}
          title="Verify code"
        />
      </View>
    </View>
  );
};

export default EnterCodePage;
