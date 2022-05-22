import { LocationObject } from 'expo-location';
import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { ParkingSpotLocation } from '../../database/parkingData';
import MapMarker from './MapMarker';
interface InteractiveMapProps {
  onDetail: (location: ParkingSpotLocation) => void;
  displayParkingSpots: Array<ParkingSpotLocation>,
  location: LocationObject,
}

interface InteractiveMapState {
  location: LocationObject;
}

class InteractiveMap extends Component<InteractiveMapProps, InteractiveMapState> {
  state: InteractiveMapState = {
    location: this.props.location,
  };

  styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

  render() {
    return (
      <MapView
        region={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        loadingEnabled={true}
        style={this.styles.map}
        moveOnMarkerPress = {true}
        showsUserLocation={true}
        showsCompass={false}
        showsPointsOfInterest = {false}
      >
        { this.props.displayParkingSpots.map((park: ParkingSpotLocation) => {
          return (
            <MapMarker
              key={park.id}
              parking={park}
              onDetail={this.props.onDetail}
            />
          );
        })}
      </MapView>
    );
  }
}

export default InteractiveMap;
