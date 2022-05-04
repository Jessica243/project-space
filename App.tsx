import { StyleSheet, Text, View, Dimensions } from 'react-native';

import * as React from 'react';
import Login from './src/screen/Login';
import { AppPages } from './src/types/AppPages';
import Registration from './src/screen/Registration';
import Map from './src/screen/Map';
// import MapView from 'react-native-maps';

const Page = () => {
  const [page, setPage] = React.useState(AppPages.Login);
  switch(page){
    case AppPages.Login:
      return (
        <Login 
          onLoginSuccess={() => setPage(AppPages.Map)}
          onRequestRegistration={()=> setPage(AppPages.Registration)}
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
    <View style={styles.container}>
      <Text>Parking</Text>
      <Page/>
      
      {/* <MapView
        initialRegion={{
          latitude: -37.8136,
          longitude: 144.9631,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
        style={styles.map}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default App;