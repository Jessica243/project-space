import { LocationObject } from 'expo-location';
import React, { Component } from 'react';
import { Button, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Callout } from 'react-native-maps';
import appStyles from '../../appStyles';
import { Avatar } from '@rneui/themed';
import Autocomplete from '../../components/Autocomplete';
import mapLocations, { MapLocation } from '../../database/mapLocationData';
import UserSettings from '../../type/UserSettings';
import { UserInformation } from '../../database/userData';
import parkingLocations, { ParkingSpotLocation, ParkingSpotType, parkingTypeName } from '../../database/parkingData';

interface ListViewPageProps {
  location: LocationObject;
  user: UserInformation;
  settings: UserSettings;
  onOpenSettings: () => void;
  onOpenTimer: () => void;
  onDetail: (location: ParkingSpotLocation) => void;
  onPlayVoiceInteraction: () => void;
  onChangeToMapView: () => void;
}

interface ListViewPageState {
  onlyShowFreeParking: boolean;
  location: LocationObject;
}

class ListViewPage extends Component<ListViewPageProps, ListViewPageState> {
  state: ListViewPageState = {
    onlyShowFreeParking: false,
    location: this.props.location,
  };

  styles = StyleSheet.create({
    searchResults: {
      marginTop: 80,
      marginBottom: 20,
    },
    bold: {
      fontWeight: 'bold',
    },
    item: {
      backgroundColor: '#f0f0f0',
      marginTop: 5,
      marginBottom: 5,
      padding: 5,
    },
    scroll: {
      paddingVertical: 10,
    },
    topLeftCallout: {
      marginTop: 45,
      marginLeft: 20,
      width: Dimensions.get('window').width - 90,
    },
    topRightCallout: {
      right: 0,
      marginTop: 45,
      marginRight: 20,
    },
    bottomRightCallout: {
      right: 0,
      bottom: 0,
      margin: 20,
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

  filterMapLocations = (name: string) => {
    return mapLocations.filter((mapLocation: MapLocation) => {
      return mapLocation.name.toLowerCase().includes(name.toLowerCase());
    });
  };

  toggleParkingPaidParkingLocations = () => {
    this.setState({ onlyShowFreeParking: !this.state.onlyShowFreeParking });
  };

  searchLocation = (location?: MapLocation) => {
    if (location) {
      if(location.id === 1){
        this.setState({
          location: this.props.location,
        });
      }else {
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
      }

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
      <View style={appStyles.page}>
        <View style={this.styles.searchResults}>
          <ScrollView
            contentContainerStyle={this.styles.scroll}
          >
            { displayParkingSpots.map((park: ParkingSpotLocation) => {
              return (
                <View key={park.id} style={this.styles.item}>
                  {/* <Text>{park.name}</Text>
                  <Button title="Select this" onPress={() => this.props.onDetail(park)} /> */}
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
        <Callout style={this.styles.topLeftCallout}>
          <Autocomplete
            placeholder="Where do you want to go?"
            initialValue="Current location"
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
          <Button title="🗺" onPress={this.props.onChangeToMapView} />
          <Button title="⏰" onPress={this.props.onOpenTimer} />
        </Callout>
        <Callout style={this.styles.bottomRightCallout}>
          <View style={this.styles.avatar}>
            {
              this.props.settings.speechEnabled &&
              <Button title="🎙" onPress={() => this.props.onPlayVoiceInteraction()} />
            }
            <Avatar
              onPress={this.props.onOpenSettings}
              size={64}
              rounded
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRih-FNWiHbIHG6jHWSZyCGTBqWN2chuunYfG6YVaY9SoKoUfQVK_87J7K9oHrMmrlpTVY&usqp=CAU',
              }}
            />
            <Text>{this.props.user.firstName} {this.props.user.surname}</Text>
          </View>
        </Callout>
      </View>
    );
  }
}

export default ListViewPage;
