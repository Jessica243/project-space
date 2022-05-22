import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { ParkingSpotLocation, parkingTypeName } from '../../database/parkingData';

interface ListViewPageProps {
  onDetail: (location: ParkingSpotLocation) => void;
  displayParkingSpots: Array<ParkingSpotLocation>
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
          { this.props.displayParkingSpots.map((park: ParkingSpotLocation) => {
            return (
              <View key={park.id} style={this.styles.item}>
                <Text style={this.styles.bold}>{park.name}</Text>
                <Text>Price: ${park.price}</Text>
                <Text>Clearance: {park.clearanceHeight}</Text>
                <Text>Type: {parkingTypeName[ park.type ]}</Text>
                <Button
                  title='Select parking spot'
                  onPress = {()=>this.props.onDetail(park)}
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
