import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import Login from './src/screen/Login';
import Registration from './src/screen/Registration';
import Map from './src/screen/Map';
import PasswordReset from './src/screen/PasswordReset';
import Settings from './src/screen/Settings';
import UserSettings, { initialUserSettings } from './src/type/UserSettings';
import Timer from './src/screen/Timer';

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
  userSettings: UserSettings;
}

class App extends Component<null, AppState> {
  state: AppState = {
    page: AppPages.Map,
    userSettings: initialUserSettings,
  };

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  getPage = () => {
    switch (this.state.page) {
    case AppPages.Login:
      return (
        <Login
          onLoginSuccess={() => this.setState({ page: AppPages.Map })}
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
          settings={this.state.userSettings}
          onOpenTimer={() => this.setState({ page: AppPages.Timer })}
        />
      );
    case AppPages.Settings:
      return (
        <Settings
          settings={this.state.userSettings}
          onSave={(newSetting: UserSettings) => {
            this.setState({ page: AppPages.Map, userSettings: newSetting });
          }}
          onCancel={() => this.setState({ page: AppPages.Map })}
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
