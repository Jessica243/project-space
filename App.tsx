import { View } from 'react-native';
import React, { useState } from 'react';
// import { createRealmContext } from '@realm/react';
import Login from './src/screen/Login';
import Registration from './src/screen/Registration/Registration';
import Map from './src/screen/Map';
import appStyles from './src/appStyles';
import PasswordReset from './src/screen/PasswordReset/PasswordReset';
// import User from './src/database/User';

// const { RealmProvider, useRealm, useQuery } = createRealmContext({
//   schema: [
//     User,
//   ],
// });

enum AppPages {
  Login,
  Registration,
  PassswordReset,
  Map,
}

const Page = () : JSX.Element => {
  const [page, setPage] = useState(AppPages.Login);
  switch (page) {
  case AppPages.Login:
    return (
      <Login
        onLoginSuccess={() => setPage(AppPages.Map)}
        onRequestRegistration={() => setPage(AppPages.Registration)}
        onForgotPassword={() => setPage(AppPages.PassswordReset)}
      />
    );
  case AppPages.Registration:
    return (
      <Registration
        onRegistrationSuccess={() => setPage(AppPages.Login)}
        onCancel={() => setPage(AppPages.Login)}
      />
    );
  case AppPages.PassswordReset:
    return (
      <PasswordReset
        onPasswordResetSuccess={() => setPage(AppPages.Login)}
        onCancel={() => setPage(AppPages.Login)}
      />
    );
  case AppPages.Map:
    return (
      <Map />
    );
  default: return <></>;
  }
};

const App = () => {
  return (
    // <RealmProvider>
    <View style={appStyles.container}>
      <Page />
    </View>
    // </RealmProvider>
  );
};

export default App;
