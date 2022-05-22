import { LocationObject } from 'expo-location';
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { ParkingDestination } from '.';
import { StyleSheet, ImageURISource, Text, Button, Dimensions } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { ParkingSpotLocation, ParkingSpotType, parkingTypeName } from '../../database/parkingData';
import parkingRed from '../../../assets/parkingRed.png';
import parkingOrange from '../../../assets/parkingOrange.png';
import parkingYellow from '../../../assets/parkingYellow.png';
import parkingGreen from '../../../assets/parkingGreen.png';
import parkingBlue from '../../../assets/parkingBlue.png';
import parkingPurple from '../../../assets/parkingPurple.png';

const parkingIcon: Record<ParkingSpotType, ImageURISource> = {
  [ ParkingSpotType.Free_LotCovered ]: parkingPurple,
  [ ParkingSpotType.Free_LotUncovered ]: parkingBlue,
  [ ParkingSpotType.Free_Street ]: parkingGreen,

  [ ParkingSpotType.Paid_LotCovered ]: parkingYellow,
  [ ParkingSpotType.Paid_LotUncovered ]: parkingOrange,
  [ ParkingSpotType.Paid_Street ]: parkingRed,
};

interface InteractiveMapProps {
  onDetail: (location: ParkingSpotLocation) => void;
  displayParkingSpots: Array<ParkingDestination>,
  location: LocationObject,
}

class InteractiveMap extends Component<InteractiveMapProps, any> {
  styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    bold: {
      fontWeight: 'bold',
    },
  });

  render() {
    return (
      <MapView
        region={{
          latitude: this.props.location.coords.latitude,
          longitude: this.props.location.coords.longitude,
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
        { this.props.displayParkingSpots.map((park: ParkingDestination) => {
          return (
            <Marker
              key={park.location.id}
              coordinate = {{
                latitude: park.location.latitude,
                longitude: park.location.longitude,
              }}
              image={parkingIcon[ park.location.type ]}
            >
              <Callout>
                <Text style={this.styles.bold}>{park.location.name}</Text>
                <Text>Price: ${park.location.price}</Text>
                <Text>Distance: {park.distanceInMeters.toFixed(0)}m</Text>
                <Text>Clearance: {park.location.clearanceHeight.toFixed(1)}m</Text>
                <Text>Type: {parkingTypeName[ park.location.type ]}</Text>
                <Button
                  title='Select parking spot'
                  onPress = {()=>this.props.onDetail(park.location)}
                />
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    );
  }
}

export default InteractiveMap;
