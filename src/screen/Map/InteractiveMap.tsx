import { LocationObject } from 'expo-location';
import React, {useState} from 'react';
import { View, Button, TextInput, StyleSheet, Dimensions } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import appStyles from '../../appStyles';
import parkingLocations, { ParkingSpotLocation, ParkingSpotType } from '../../database/parkingData';
import MapMarker from './MapMarker';

interface InteractiveMapProps {
  location: LocationObject
}

const InteractiveMap = ({ location }: InteractiveMapProps) => {
  const [searchString, setSearchString] = useState('');
  const [showPaidParking, setShowPaidParking] = useState(true);
  const [paidParkingButtonText, setPaidParkingButtonText] = useState('show free parking only');

  const showDestinationOnMap = () => {
    // TODO: open driving directions
  };

  const toggleParkingPaidParkingLocations = () => {
    setShowPaidParking(!showPaidParking);

    if(showPaidParking) {
      setPaidParkingButtonText('show free parking only');
    } else {
      setPaidParkingButtonText('show all parking');
    }
  };

  const displayParkingSpots = parkingLocations.filter((parkingSpot: ParkingSpotLocation) => {
    if(showPaidParking) {
      return true;
    } else {
      return parkingSpot.type === ParkingSpotType.Free_LotCovered || parkingSpot.type === ParkingSpotType.Free_LotUncovered || parkingSpot.type === ParkingSpotType.Free_Street;  
    }
  });

  return (
    <>
      <MapView
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={componentStyles.map}
        moveOnMarkerPress = {true}
        showsUserLocation={true}
        showsCompass={true}
        showsPointsOfInterest = {false}  
      >
        { displayParkingSpots.map((props: ParkingSpotLocation)=> <MapMarker key={props.id} {...props}/>) }
      </MapView>
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
        <Button
          onPress={toggleParkingPaidParkingLocations}
          title={paidParkingButtonText}
        />
      </Callout>
    </>
  );
};

const componentStyles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  callout: {
    margin: 30,
  },
});

export default InteractiveMap;
