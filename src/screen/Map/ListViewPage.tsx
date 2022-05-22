import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { ParkingDestination } from '.';
import { ParkingSpotLocation, parkingTypeName } from '../../database/parkingData';

interface ListViewPageProps {
  onDetail: (location: ParkingSpotLocation) => void;
  displayParkingSpots: Array<ParkingDestination>
}

class ListViewPage extends Component<ListViewPageProps, any> {

  styles = StyleSheet.create({
    searchResults: {
      marginTop: 80,
      marginBottom: 20,
    },
    scroll: {
      paddingVertical: 10,
    },
    item: {
      backgroundColor: '#f0f0f0',
      marginTop: 5,
      marginBottom: 5,
      padding: 5,
    },
    bold: {
      fontWeight: 'bold',
    },
  });

  render() {
    return (
      <View style={this.styles.searchResults}>
        <ScrollView
          contentContainerStyle={this.styles.scroll}
        >
          { this.props.displayParkingSpots.map((park: ParkingDestination) => {
            return (
              <View key={park.location.id} style={this.styles.item}>
                <Text style={this.styles.bold}>{park.location.name}</Text>
                <Text>Price: ${park.location.price}</Text>
                <Text>Distance: {park.distanceInMeters.toFixed(0)}m</Text>
                <Text>Clearance: {park.location.clearanceHeight.toFixed(1)}m</Text>
                <Text>Type: {parkingTypeName[ park.location.type ]}</Text>
                <Button
                  title='Select parking spot'
                  onPress = {()=>this.props.onDetail(park.location)}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default ListViewPage;
