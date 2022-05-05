import * as React from 'react'
import { Button, Text, TextInput, View } from 'react-native';
import appStyles from '../../appStyles';

interface NewPasswordPageProps {
  onSuccess: () => void,
  onCancel: () => void,
}

const NewPasswordPage = ({ onSuccess, onCancel }: NewPasswordPageProps) => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  const onSubmit = () => {
    let validPassword = true;
    let validConfirmPassword = true;
    setPasswordError('');
    setConfirmPasswordError('');

    if(password.length == 0) {
      setPasswordError("Please enter your password")
      validPassword = false;
    }

    if(confirmPassword !== password){
      setConfirmPasswordError("Please check, your password don't match")
      validConfirmPassword = false;
    }

    if(validPassword && validConfirmPassword) {
      onSuccess();
    }
  }

  return (
    <View>
      <Text>Please enter your new password</Text>
      <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
          />
          { passwordError.length > 0 && <Text style={appStyles.validationError}>{passwordError}</Text> }
        </View>
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={true}
            placeholder="Confirm password"
          />
          { confirmPasswordError.length > 0 && <Text style={appStyles.validationError}>{confirmPasswordError}</Text> }
        </View>
      <View style={appStyles.buttonRow}>
        <Button
          onPress={onCancel}
          title="Cancel"
        />
        <Button
          onPress={onSubmit}
          title="Save new password"
        />
      </View>
    </View>
  );
}

export default NewPasswordPage;
