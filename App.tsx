import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
// import { createRealmContext } from '@realm/react';
import Login from './src/screen/Login';
import Registration from './src/screen/Registration/Registration';
import Map from './src/screen/Map/Map';
import PasswordReset from './src/screen/PasswordReset/PasswordReset';
import Settings from './src/screen/Setting';
import AppState, { initialState } from './src/AppState';
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
  Settings,
}

const Page = () : JSX.Element => {
  const [page, setPage] = useState(AppPages.Login);
  const [pageState, setPageState] = useState<AppState>(initialState);
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
      <Map onOpenSettings={() => setPage(AppPages.Settings)} />
    );
  case AppPages.Settings:
    return (
      <Settings
        state={pageState}
        onSave={(newSetting: AppState) => {
          setPageState(newSetting);
          setPage(AppPages.Map);
        }}
        onCancel={() => setPage(AppPages.Map)}
      />
    );
  default: return <></>;
  }
};

const App = () => {
  return (
    // <RealmProvider>
    <View style={componentStyles.container}>
      <Page />
    </View>
    // </RealmProvider>
  );
};


const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
