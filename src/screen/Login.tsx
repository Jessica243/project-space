import * as React from 'react'
import { Button, Text } from 'react-native'

interface LoginProps {
  onLoginSuccess: () => void,
  onRequestRegistration: () => void,
}

const Login = ({ onLoginSuccess, onRequestRegistration }: LoginProps) => {
  return (
    <>
      <Text>Login Screen</Text>
      <Button
        onPress={onRequestRegistration}
        title="I want to register an account"
        accessibilityLabel=''
      />
      <Button
        onPress={onLoginSuccess}
        title="Successfully logged in"
        accessibilityLabel=''
      />
    </>
  )
}

export default Login