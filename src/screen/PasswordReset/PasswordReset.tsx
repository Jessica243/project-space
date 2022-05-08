import React, { useState } from 'react';
import { View } from 'react-native';
import Page from './Page';

interface PasswordResetProps {
  onPasswordResetSuccess: () => void,
  onCancel: () => void,
}

const PasswordReset = ({
  onPasswordResetSuccess,
  onCancel,
}: PasswordResetProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <View>
      <Page
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        onPasswordResetSuccess={onPasswordResetSuccess}
        onCancel={onCancel}
      />
    </View>
  );
};

export default PasswordReset;
