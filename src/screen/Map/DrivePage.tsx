import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import appStyles from '../../appStyles';
import { ParkingSpotLocation } from '../../database/parkingData';

interface DrivePageProps {
  onBack: () => void;
  destination: ParkingSpotLocation;
}

class DrivePage extends Component<DrivePageProps, any> {
  render() {
    return (
      <View style={appStyles.page}>
        <Text>Drive to [{this.props.destination.name}]</Text>
        <Text>{this.props.destination.address}</Text>
        <Text></Text>
        <Text style={appStyles.validationError}>Coming soon!</Text>
        <Button title="Back" onPress={this.props.onBack} />
      </View>
    );
  }
}

export default DrivePage;
