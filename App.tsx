import { View } from 'react-native';
import * as React from 'react';
import Login from './src/screen/Login';
import Registration from './src/screen/Registration/Registration';
import Map from './src/screen/Map';
import appStyles from './src/appStyles';
import PasswordReset from './src/screen/PasswordReset/PasswordReset';

enum AppPages {
  Login,
  Registration,
  PassswordReset,
  Map,
}

const Page = () => {
  const [page, setPage] = React.useState(AppPages.Login);
  switch(page){
    case AppPages.Login:
      return (
        <Login 
          onLoginSuccess={() => setPage(AppPages.Map)}
          onRequestRegistration={() => setPage(AppPages.Registration)}
          onForgotPassword={() => setPage(AppPages.PassswordReset)}
        />
      )
    case AppPages.Registration:
      return (
        <Registration
          onRegistrationSuccess={() => setPage(AppPages.Login)}
          onCancel={() => setPage(AppPages.Login)}
        />
      )
    case AppPages.PassswordReset:
      return (
        <PasswordReset
          onPasswordResetSuccess={() => setPage(AppPages.Login)}
          onCancel={() => setPage(AppPages.Login)}
        />
      )
    case AppPages.Map:
      return (
        <Map />
      )
  }
}

const App = () => {
  return (
    <View style={appStyles.container}>
      <Page/>
    </View>
  );
}

export default App;