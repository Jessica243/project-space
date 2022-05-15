import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import appStyles from '../../appStyles';
import { UserInformation } from '../../database/userData';
import EnterCodePage from './EnterCodePage';
import EnterEmailPage from './EnterEmailPage';
import NewPasswordPage from './NewPasswordPage';

interface PageProps {
  pageNumber: number,
  onPasswordResetSuccess: () => void,
  onCancel: () => void,
  setPageNumber: (page: number) => void,
}

const Page = ({ pageNumber, setPageNumber, onPasswordResetSuccess, onCancel }: PageProps) => {
  const [selectedUser, setSelectedUser] = useState<UserInformation>();
  switch (pageNumber) {
  case 1:
    return <EnterEmailPage onSuccess={(user: UserInformation) => {
      setSelectedUser(user);
      setPageNumber(2);
    }} onCancel={onCancel} />;
  case 2:
    return <EnterCodePage onSuccess={() => setPageNumber(3)} onCancel={onCancel} />;
  case 3:
    return (
      <View>
        <Text>We have successfully validated your code!</Text>
        <View style={appStyles.buttonRow}>
          <Button
            onPress={onCancel}
            title="Cancel"
          />
          <Button
            onPress={() => setPageNumber(4)}
            title="Reset password"
          />
        </View>
      </View>
    );
  case 4:
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return <NewPasswordPage selectedUser={selectedUser!} onSuccess={() => setPageNumber(5)} onCancel={onCancel} />;
  case 5:
    return (
      <View>
        <Text>You have successfully reset your password!</Text>
        <Button
          onPress={onPasswordResetSuccess}
          title="Back to login"
        />
      </View>
    );
  default:
    return null;
  }
};

export default Page;
