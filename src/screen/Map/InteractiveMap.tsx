import { LocationObject } from 'expo-location';
import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import parkingLocations, { ParkingSpotLocation, ParkingSpotType } from '../../database/parkingData';
import MapMarker from './MapMarker';
import { Avatar } from '@rneui/themed';
// import { CheckBox } from 'react-native-elements';

interface InteractiveMapProps {
  location: LocationObject
  onOpenSettings: () => void;
  onOpenTimer: () => void;
}

interface InteractiveMapState {
  searchString: string;
  onlyShowFreeParking: boolean;
}

class InteractiveMap extends Component<InteractiveMapProps, InteractiveMapState> {
  state: InteractiveMapState = {
    searchString: '',
    onlyShowFreeParking: false,
  };

  styles = StyleSheet.create({
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
    },
  });

  showDestinationOnMap = () => {
    // TODO: open driving directions
  };

  toggleParkingPaidParkingLocations = () => {
    this.setState({ onlyShowFreeParking: !this.state.onlyShowFreeParking });
  };

  render() {
    const displayParkingSpots = parkingLocations.filter((parkingSpot: ParkingSpotLocation) => {
      if(this.state.onlyShowFreeParking) {
        return parkingSpot.type === ParkingSpotType.Free_LotCovered
          || parkingSpot.type === ParkingSpotType.Free_LotUncovered
          || parkingSpot.type === ParkingSpotType.Free_Street;
      } else {
        return true;
      }
    });

    return (
      <View>
        <MapView
          initialRegion={{
            latitude: this.props.location.coords.latitude,
            longitude: this.props.location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          loadingEnabled={true}
          style={this.styles.map}
          moveOnMarkerPress = {true}
          showsUserLocation={true}
          showsCompass={true}
          showsPointsOfInterest = {false}
        >
          { displayParkingSpots.map((props: ParkingSpotLocation) =>
            <MapMarker key={props.id} {...props}/>,
          ) }
        </MapView>
        <Callout style={this.styles.topLeftCallout}>
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
            onPress={this.toggleParkingPaidParkingLocations}
            title={this.state.onlyShowFreeParking ? 'show all parking': 'show free parking only'}
          />
        </Callout>
        <Callout style={this.styles.topRightCallout}>
          <Button title="Timer" onPress={this.props.onOpenTimer} />
        </Callout>
        <Callout style={this.styles.bottomRightCallout}>
          <View style={this.styles.avatar}>
            <Avatar
              onPress={this.props.onOpenSettings}
              size={64}
              rounded
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRih-FNWiHbIHG6jHWSZyCGTBqWN2chuunYfG6YVaY9SoKoUfQVK_87J7K9oHrMmrlpTVY&usqp=CAU',
              }}
            />
            <Text>Jess</Text>
          </View>
        </Callout>
      </View>
    );
  }
}

export default InteractiveMap;
