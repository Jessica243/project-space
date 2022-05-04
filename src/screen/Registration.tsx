import * as React from 'react'
import { Button, Text } from 'react-native';

interface RegistrationProps {
  onRegistrationSuccess: () => void,
}

const Registration = ({
  onRegistrationSuccess
}: RegistrationProps) => {
  return (
    <>
      <Text>Registration Page</Text>
      <Button
        onPress={onRegistrationSuccess}
        title="Successfully registered an account"
        accessibilityLabel=''
      />
    </>
  )
}

export default Registration;
