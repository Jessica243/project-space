import { LocationObject } from 'expo-location';
import React, {useState} from 'react';
import { View, Button, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import parkingLocations, { ParkingSpotLocation, ParkingSpotType } from '../../database/parkingData';
import MapMarker from './MapMarker';
import { Avatar } from "@rneui/themed";
// import { CheckBox } from 'react-native-elements';

interface InteractiveMapProps {
  location: LocationObject
  onOpenSettings: () => void;
  onOpenTimer: () => void;
}

const InteractiveMap = ({ location, onOpenSettings, onOpenTimer }: InteractiveMapProps) => {
  const [searchString, setSearchString] = useState('');
  const [onlyShowFreeParking, setOnlyShowFreeParking] = useState(false);
  const [paidParkingButtonText, setPaidParkingButtonText] = useState('show free parking only');

  const showDestinationOnMap = () => {
    // TODO: open driving directions
  };

  const toggleParkingPaidParkingLocations = () => {
    setOnlyShowFreeParking(!onlyShowFreeParking);

    if(onlyShowFreeParking) {
      setPaidParkingButtonText('show all parking');
    } else {
      setPaidParkingButtonText('show free parking only');
    }
  };

  const displayParkingSpots = parkingLocations.filter((parkingSpot: ParkingSpotLocation) => {
    if(onlyShowFreeParking) {
      return parkingSpot.type === ParkingSpotType.Free_LotCovered || parkingSpot.type === ParkingSpotType.Free_LotUncovered || parkingSpot.type === ParkingSpotType.Free_Street;  
    } else {
      return true;
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
        loadingEnabled={true}
        style={componentStyles.map}
        moveOnMarkerPress = {true}
        showsUserLocation={true}
        showsCompass={true}
        showsPointsOfInterest = {false}  
      >
        { displayParkingSpots.map((props: ParkingSpotLocation)=> <MapMarker key={props.id} {...props}/>) }
      </MapView>
      <Callout style={componentStyles.topLeftCallout}>
        {/* <View style={appStyles.row}>
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
        </View> */}
        {/* <CheckBox
          title='Click Here'
          checked={true}
        /> */}
        <Button
          onPress={toggleParkingPaidParkingLocations}
          title={paidParkingButtonText}
        />
      </Callout>
      <Callout style={componentStyles.topRightCallout}>
        <Button title="Timer" onPress={onOpenTimer} />
      </Callout>
      <Callout style={componentStyles.bottomRightCallout}>
        <View style={componentStyles.avatar}>
          <Avatar
            onPress={onOpenSettings}
            size={64}
            rounded
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRih-FNWiHbIHG6jHWSZyCGTBqWN2chuunYfG6YVaY9SoKoUfQVK_87J7K9oHrMmrlpTVY&usqp=CAU"
            }}
          />
          <Text>Jess</Text>
        </View>
      </Callout>
    </>
  );
};

const componentStyles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  topLeftCallout: {
    margin: 30,
  },
  topRightCallout: {
    right: 0,
    margin: 30,
  },
  bottomRightCallout: {
    right: 0,
    bottom: 0,
    margin: 30,
  },
  avatar: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
  }
});

export default InteractiveMap;
