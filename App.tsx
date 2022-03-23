import { StyleSheet, Text, View, Dimensions } from 'react-native';

import * as React from 'react';
import MapView from 'react-native-maps';

export default function App() {
  return (
    <ParkingScreen />
  );
}

function ParkingScreen() {
  return (
    <View style={styles.container}>
      <Text>Parking</Text>
      <MapView
        initialRegion={{
          latitude: -37.8136,
          longitude: 144.9631,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
        style={styles.map}
      />
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

