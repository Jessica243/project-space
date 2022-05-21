import { LocationObject } from 'expo-location';
import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import parkingLocations, { ParkingSpotLocation, ParkingSpotType } from '../../database/parkingData';
import MapMarker from './MapMarker';
import { Avatar } from '@rneui/themed';
import mapLocations, { MapLocation } from '../../database/mapLocationData';
import Autocomplete from '../../components/Autocomplete';
import { UserInformation } from '../../database/userData';
import { UserSettings } from '../../database/userSettingsData';
import { Badge } from 'react-native-elements';
import appStyles from '../../appStyles';
import { Pressable } from 'react-native';
import ParkingPreference from '../../type/ParkingPreference';

interface InteractiveMapProps {
  location: LocationObject;
  user: UserInformation;
  settings: UserSettings;
  onOpenSettings: () => void;
  onOpenTimer: () => void;
  onDetail: (location: ParkingSpotLocation) => void;
  onPlayVoiceInteraction: () => void;
  onChangeToListView: () => void;
}

enum DisplayPerference {
  FREE_ONLY,
  PARKING_LOT_ONLY,
  ALL,
}

const displayPreferenceName: Record<DisplayPerference, string> = {
  [ DisplayPerference.FREE_ONLY ]: 'free parking',
  [ DisplayPerference.PARKING_LOT_ONLY ]: 'parking lot',
  [ DisplayPerference.ALL ]: 'all parking',
};

const orderByname: Record<ParkingPreference, string> = {
  [ ParkingPreference.Cost ]: 'order by cheapest',
  [ ParkingPreference.Distance ]: 'order by closest',
  [ ParkingPreference.Security ]: 'order by most secure',
};

interface InteractiveMapState {
  location: LocationObject;
  sortBy: ParkingPreference;
  duration: number;
  displayPreference: DisplayPerference;
}

class InteractiveMap extends Component<InteractiveMapProps, InteractiveMapState> {
  state: InteractiveMapState = {
    location: this.props.location,
    sortBy: this.props.settings.preference,
    duration: 2,
    displayPreference: DisplayPerference.ALL,
  };

  styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
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
    searchOptions: {
      marginTop: 10,
    },
  });

  filterMapLocations = (name: string) => {
    return mapLocations.filter((mapLocation: MapLocation) => {
      return mapLocation.name.toLowerCase().includes(name.toLowerCase());
    });
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

  toggleParkingDuration = () => {
    const newDuration = (this.state.duration + 0.5)%6 + 0.5;
    this.setState({ duration: newDuration });
  };

  toggleParkingPreference = () => {
    switch(this.state.displayPreference){
    case DisplayPerference.ALL:
      this.setState({ displayPreference: DisplayPerference.FREE_ONLY });
      return;
    case DisplayPerference.FREE_ONLY:
      this.setState({ displayPreference: DisplayPerference.PARKING_LOT_ONLY });
      return;
    case DisplayPerference.PARKING_LOT_ONLY:
      this.setState({ displayPreference: DisplayPerference.ALL });
      return;
    }
  };

  toggleOrderBy = () => {
    switch(this.state.sortBy) {
    case ParkingPreference.Cost:
      this.setState({ sortBy: ParkingPreference.Distance });
      return;
    case ParkingPreference.Distance:
      this.setState({ sortBy: ParkingPreference.Security });
      return;
    case ParkingPreference.Security:
      this.setState({ sortBy: ParkingPreference.Cost });
      return;
    }
  };

  findRelevantParking = () => {
    switch(this.state.displayPreference){
    case DisplayPerference.ALL:
      return parkingLocations;
    case DisplayPerference.FREE_ONLY:
      return parkingLocations.filter((parkingSpot: ParkingSpotLocation) => {
        return parkingSpot.type === ParkingSpotType.Free_LotCovered
              || parkingSpot.type === ParkingSpotType.Free_LotUncovered
              || parkingSpot.type === ParkingSpotType.Free_Street;
      });
    case DisplayPerference.PARKING_LOT_ONLY:
      return parkingLocations.filter((parkingSpot: ParkingSpotLocation) => {
        return parkingSpot.type === ParkingSpotType.Free_LotCovered
                || parkingSpot.type === ParkingSpotType.Free_LotUncovered
                || parkingSpot.type === ParkingSpotType.Paid_LotCovered
                || parkingSpot.type === ParkingSpotType.Paid_LotUncovered;
      });
    }
  };

  sortParking = (parkingLocations: Array<ParkingSpotLocation>) => {
    switch(this.state.sortBy){
    case ParkingPreference.Cost:
      return parkingLocations.sort( (a, b) => {
        if (a.price === b.price){
          return 0;
        } else if (a.price < b.price){
          return -1;
        } else {
          return 1;
        }
      });
    default:
      return parkingLocations;
    }
  };

  render() {
    const displayParkingSpots = this.sortParking(this.findRelevantParking());

    return (
      <View>
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
          { displayParkingSpots.map((park: ParkingSpotLocation) => {
            return (
              <MapMarker
                key={park.id}
                parking={park}
                onDetail={this.props.onDetail}
              />
            );
          })}
        </MapView>
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
          <View style={this.styles.searchOptions}>
            <View style={appStyles.row}>
              <Pressable onPress={this.toggleParkingDuration}>
                <Badge value={`${this.state.duration} hrs`}/>
              </Pressable>
              <Pressable onPress={this.toggleParkingPreference}>
                <Badge value={displayPreferenceName[ this.state.displayPreference ]} />
              </Pressable>
              <Pressable onPress={this.toggleOrderBy}>
                <Badge value={orderByname[ this.state.sortBy ]}/>
              </Pressable>
            </View>
          </View>
        </Callout>
        <Callout style={this.styles.topRightCallout}>
          <Button title="📃" onPress={this.props.onChangeToListView} />
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

export default InteractiveMap;
