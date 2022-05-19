import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

interface AvoidKeyboardProps {
  children: React.ReactNode;
}

const AvoidKeyboard = ({ children }: AvoidKeyboardProps) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AvoidKeyboard;
