import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { speak } from 'expo-speech';
import AppState from '../../type/UserSettings';
import InteractiveMap from './InteractiveMap';
import appStyles from '../../appStyles';
import { UserInformation } from '../../database/userData';
import DrivePage from './DrivePage';
import { ParkingSpotLocation } from '../../database/parkingData';

interface MapProps {
  onOpenSettings: () => void;
  onOpenTimer: () => void;
  settings: AppState;
  user: UserInformation;
}

interface MapState {
  location: LocationObject | null;
  locationError: string;
  loading: boolean;
  page: MapPages;
  destination?: ParkingSpotLocation;
}

enum MapPages {
  MAP,
  DRIVE
}

class Map extends Component<MapProps, MapState> {
  state: MapState = {
    location: null,
    locationError: '',
    loading: true,
    page: MapPages.MAP,
  };

  componentDidMount() {
    setTimeout(() => {
      this.onMapReady();
    }, 3000);

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        this.setState({ locationError: 'Permission to access location was denied.\nPlease grant permission and try again.' });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    })();
  }

  onMapReady = () => {
    this.setState({ loading: false });
    if(this.props.settings.speechEnabled){
      speak('Please tell me where you want to go, so I can find you a carpark.');
    }
  };

  getPage = () => {
    if(this.state.loading){
      return (
        <ActivityIndicator size='large'/>
      );
    } else if(this.state.locationError.length === 0 && this.state.location !== null) {
      switch(this.state.page){
      case MapPages.MAP:
        return (
          <InteractiveMap
            onDrive={(location: ParkingSpotLocation) => {
              this.setState({ page: MapPages.DRIVE, destination: location });
            }}
            location={this.state.location}
            onOpenSettings={this.props.onOpenSettings}
            onOpenTimer={this.props.onOpenTimer}
            user={this.props.user}
          />
        );
      case MapPages.DRIVE:
        return (
          <DrivePage
            onBack={() => this.setState({ page: MapPages.MAP })}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            destination={this.state.destination!}
          />
        );
      default: return null;
      }

    } else {
      return (
        <Text style={appStyles.validationError}>
          {this.state.locationError}
        </Text>
      );
    }
  };

  render() {
    return (
      <View>{this.getPage()}</View>
    );
  }
}

export default Map;
