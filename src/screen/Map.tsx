import * as React from 'react'
import { StyleSheet, Dimensions, View, Text, Button, TextInput } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import appStyles from '../appStyles';
import openMap from 'react-native-open-maps';

const Map = () => {

  const [location, setLocation] = React.useState<LocationObject | null>(null);
  const [locationError, setLocationError] = React.useState("");
  const [searchString, setSearchString] = React.useState("");

  const showDestinationOnMap = () =>  {
    openMap({ 
      latitude: -37.8136,
      longitude: 144.9631,
      end: 'Parliament Station',
      travelType: 'drive',
      navigate: true,
     });
  }

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
        <>
          <MapView
            initialRegion={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            style={componentStyles.map}
          />
          <Callout style={componentStyles.callout}>
            <View style={appStyles.row}>
              <TextInput
                style={appStyles.userInput}
                onChangeText={setSearchString}
                value={searchString}
                placeholder="Current location"
              />
              <Button
                onPress={showDestinationOnMap}
                title="Open maps"
              />
            </View>
          </Callout>
        </>
      }
    </View>
  )
}

const componentStyles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  callout: {
    margin: 30
  }
});


export default Map;
