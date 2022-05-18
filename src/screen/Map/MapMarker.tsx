import React, { Component } from 'react';
import { StyleSheet, ImageURISource, Text, Button } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { ParkingSpotLocation, ParkingSpotType } from '../../database/parkingData';
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

const parkingTypeName: Record<ParkingSpotType, string> = {
  [ ParkingSpotType.Free_LotCovered ]: 'Free covered parking lot',
  [ ParkingSpotType.Free_LotUncovered ]: 'Free uncovered parking lot',
  [ ParkingSpotType.Free_Street ]: 'Free street parking',

  [ ParkingSpotType.Paid_LotCovered ]: 'Paid covered parking lot',
  [ ParkingSpotType.Paid_LotUncovered ]: 'Paid uncovered parking lot',
  [ ParkingSpotType.Paid_Street ]: 'Paid street parking',
};

interface MapMarkerProps {
  parking: ParkingSpotLocation;
  onDrive: (location: ParkingSpotLocation) => void;
}

class MapMarker extends Component<MapMarkerProps, any> {
  styles = StyleSheet.create({
  });

  render() {
    return (
      <Marker
        key={this.props.parking.id}
        coordinate = {{
          latitude: this.props.parking.latitude,
          longitude: this.props.parking.longitude,
        }}
        image={parkingIcon[ this.props.parking.type ]}
      >
        <Callout>
          <Text>{this.props.parking.name}</Text>
          <Text>{this.props.parking.address}</Text>
          <Text>{parkingTypeName[ this.props.parking.type ]}</Text>
          <Button
            title='Drive'
            onPress = {()=>this.props.onDrive(this.props.parking)}
          />
        </Callout>
      </Marker>
    );
  }
}

export default MapMarker;
