import { View } from 'react-native';
import * as React from 'react';
import Login from './src/screen/Login';
import { AppPages } from './src/types/AppPages';
import Registration from './src/screen/Registration';
import Map from './src/screen/Map';
import appStyles from './src/appStyles';

const Page = () => {
  const [page, setPage] = React.useState(AppPages.Login);
  switch(page){
    case AppPages.Login:
      return (
        <Login 
          onLoginSuccess={() => setPage(AppPages.Map)}
          onRequestRegistration={()=> setPage(AppPages.Registration)}
          onForgotPassword={() => {}}
        />
      )
    case AppPages.Registration:
      return (
        <Registration
          onRegistrationSuccess={() => setPage(AppPages.Login)}
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