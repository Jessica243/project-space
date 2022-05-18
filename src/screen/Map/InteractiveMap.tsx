import { LocationObject } from 'expo-location';
import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import parkingLocations, { ParkingSpotLocation, ParkingSpotType } from '../../database/parkingData';
import MapMarker from './MapMarker';
import { Avatar } from '@rneui/themed';
import mapLocations, { MapLocation } from '../../database/mapLocations';
import Autocomplete from '../../components/Autocomplete';
// import { CheckBox } from 'react-native-elements';

interface InteractiveMapProps {
  location: LocationObject
  onOpenSettings: () => void;
  onOpenTimer: () => void;
}

interface InteractiveMapState {
  searchString: string;
  onlyShowFreeParking: boolean;
  location: LocationObject;
}

class InteractiveMap extends Component<InteractiveMapProps, InteractiveMapState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchString: '',
      onlyShowFreeParking: false,
      location: props.location,
    };
  }

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

  filterMapLocations = (name: string) => {
    return mapLocations.filter((mapLocation: MapLocation) => {
      return mapLocation.name.toLowerCase().includes(name.toLowerCase());
    });
  };

  searchLocation = (location?: MapLocation) => {
    if (location) {
      this.setState({
        location: {
          coords: {
            latitude: location.latitude,
            longitude: location.longitude,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: 0,
        },
      });

      console.log('>>> set location to ', this.state.location);
    }
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
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
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
          <Autocomplete
            placeholder="Current location"
            onSelect={(_: string, value?: MapLocation) => {
              this.searchLocation(value);
            }}
            filterValues={(value: string) => this.filterMapLocations(value)}
            displayValue={(value: MapLocation) => value.name}
            displayKey={(value: MapLocation) => value.id.toString()}
          />
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
