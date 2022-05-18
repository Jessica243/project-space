import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import appStyles from '../../appStyles';
import { UserInformation } from '../../database/userData';
import EnterCodePage from './EnterCodePage';
import EnterEmailPage from './EnterEmailPage';
import NewPasswordPage from './NewPasswordPage';

interface PasswordResetProps {
  onPasswordResetSuccess: () => void,
  onCancel: () => void,
}

interface PasswordResetState {
  pageNumber: number;
  selectedUser: UserInformation | null;
}

class PasswordReset extends Component<PasswordResetProps, PasswordResetState> {
  state: PasswordResetState = {
    pageNumber: 1,
    selectedUser: null,
  };

  getPage = () => {
    switch (this.state.pageNumber) {
    case 1:
      return (
        <EnterEmailPage
          onSuccess={(user: UserInformation) => {
            this.setState({ selectedUser: user, pageNumber: 2 });
          }}
          onCancel={this.props.onCancel}
        />
      );
    case 2:
      return (
        <EnterCodePage
          onSuccess={() => this.setState({ pageNumber: 3 })}
          onCancel={this.props.onCancel}
        />
      );
    case 3:
      return (
        <View>
          <Text>We have successfully validated your code!</Text>
          <View style={appStyles.buttonRow}>
            <Button
              onPress={this.props.onCancel}
              title="Cancel"
            />
            <Button
              onPress={() => this.setState({ pageNumber: 4 })}
              title="Reset password"
            />
          </View>
        </View>
      );
    case 4:
      return (
        <NewPasswordPage
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          selectedUser={this.state.selectedUser!}
          onSuccess={() => this.setState({ pageNumber: 5 })}
          onCancel={this.props.onCancel}
        />
      );
    case 5:
      return (
        <View>
          <Text>You have successfully reset your password!</Text>
          <Button
            onPress={this.props.onPasswordResetSuccess}
            title="Back to login"
          />
        </View>
      );
    default:
      return null;
    }
  };

  render() {
    return <View>{this.getPage()}</View>;
  }

}

export default PasswordReset;
