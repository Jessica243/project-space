import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import Login from './src/screen/Login';
import Registration from './src/screen/Registration';
import Map from './src/screen/Map';
import PasswordReset from './src/screen/PasswordReset';
import Settings from './src/screen/Settings';
import userSettings, { UserSettings } from './src/database/userSettingsData';
import Timer from './src/screen/Timer';
import { UserInformation } from './src/database/userData';

enum AppPages {
  Login,
  Registration,
  PasswordReset,
  Map,
  Settings,
  Timer,
}

interface AppState {
  page: AppPages;
  userSettings?: UserSettings;
  user?: UserInformation;
}

class App extends Component<null, AppState> {
  state: AppState = {
    page: AppPages.Login,
  };

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  findUserSettingsByUserId = (userId: number) => {
    return userSettings.find(s => s.userId === userId);
  };

  getPage = () => {
    switch (this.state.page) {
    case AppPages.Login:
      return (
        <Login
          onLoginSuccess={(user: UserInformation) => {
            const settings = this.findUserSettingsByUserId(user.id);
            if(settings){
              // This is an existing user
              this.setState({
                page: AppPages.Map,
                user,
                userSettings: settings,
              });
            } else {
              // This is a new user
              this.setState({
                page: AppPages.Settings,
                user,
                userSettings: settings,
              });
            }
          }}
          onRequestRegistration={() => this.setState({ page: AppPages.Registration })}
          onForgotPassword={() => this.setState({ page: AppPages.PasswordReset })}
        />
      );
    case AppPages.Registration:
      return (
        <Registration
          onRegistrationSuccess={() => this.setState({ page: AppPages.Login })}
          onCancel={() => this.setState({ page: AppPages.Login })}
        />
      );
    case AppPages.PasswordReset:
      return (
        <PasswordReset
          onPasswordResetSuccess={() => this.setState({ page: AppPages.Login })}
          onCancel={() => this.setState({ page: AppPages.Login })}
        />
      );
    case AppPages.Map:
      return (
        <Map
          onOpenSettings={() => this.setState({ page: AppPages.Settings })}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          settings={this.state.userSettings!}
          onOpenTimer={() => this.setState({ page: AppPages.Timer })}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          user={this.state.user!}
        />
      );
    case AppPages.Settings:
      return (
        <Settings
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          user={this.state.user!}
          settings={this.state.userSettings}
          onSave={(newSetting: UserSettings) => {
            this.setState({ page: AppPages.Map, userSettings: newSetting });
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const user = this.findUserSettingsByUserId(this.state.user!.id);
            if(user){
              // this is an existing user
              user.preference = newSetting.preference;
              user.speechEnabled = newSetting.speechEnabled;
              user.preferredView = newSetting.preferredView;
            } else {
              // this is a new user
              userSettings.push(newSetting);
            }
          }}
          onCancel={() => this.setState({ page: AppPages.Map })}
          onLogout={() => this.setState({ page: AppPages.Login })}
        />
      );
    case AppPages.Timer:
      return (
        <Timer onReturn={() => this.setState({ page: AppPages.Map })}/>
      );
    default: return null;
    }
  };

  render() {
    return (
      <View style={this.styles.container}>
        {this.getPage()}
      </View>
    );
  }
}

export default App;
