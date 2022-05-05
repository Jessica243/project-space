import * as React from 'react'
import { Button, Text, TextInput, View } from 'react-native';
import appStyles from '../../appStyles';

interface DetailFormProps {
  onSuccess: () => void,
}

const DetailForm = ({ onSuccess }: DetailFormProps) => {
  const [firstName, setFirstName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [firstNameError, setFirstNameError] = React.useState("");
  const [surnameError, setSurnameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

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
      setFirstNameError(`Please enter your firstname`);
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
      setEmailError("Please enter a valid email")
      validEmail = false;
    }

    if(password.length == 0) {
      setPasswordError("Please enter your password")
      validPassword = false;
    }

    if(confirmPassword !== password){
      setConfirmPasswordError("Please check, your password don't match")
      validConfirmPassword = false;
    }

    if(validFirstname && validSurname && validEmail && validPassword && validConfirmPassword) {
      onSuccess();
    }
  }

  return (
    <View>
      <Text>Please enter you details to create an account:</Text>
      <View>
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="Firstname"
          />
          { firstNameError.length > 0 && <Text style={appStyles.validationError}>{firstNameError}</Text> }
        </View>
        <View>
          <TextInput
            style={appStyles.userInput}
            onChangeText={setSurname}
            value={surname}
            placeholder="Surname"
          />
          { surnameError.length > 0 && <Text style={appStyles.validationError}>{surnameError}</Text> }
        </View>
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
      </View>
      <View style={appStyles.buttonRow}>
        <Button
          onPress={onSubmit}
          title="Register"
        />
      </View>
    </View>
    
  )
}

export default DetailForm;
