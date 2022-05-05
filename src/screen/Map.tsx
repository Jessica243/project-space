import * as React from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

// https://betterprogramming.pub/google-maps-and-places-in-a-real-world-react-native-app-100eff7474c6

const Map = () => {
  return (
    <MapView
      initialRegion={{
        latitude: -37.8136,
        longitude: 144.9631,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      }}
      style={styles.map}
    />
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


export default Map;
