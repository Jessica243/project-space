import * as React from 'react'
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import appStyles from '../appStyles';

const Map = () => {

  const [location, setLocation] = React.useState<LocationObject | null>(null);
  const [locationError, setLocationError] = React.useState("");

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permission to access location was denied.\nPlease grant permission and try again.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);  
  
  return (
    <View>
      {
        locationError.length > 0 &&
        <Text style={appStyles.validationError}>{locationError}</Text>
      }
      {
        locationError.length === 0 && location !== null &&
        <MapView
          initialRegion={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={styles.map}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


export default Map;
