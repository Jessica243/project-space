import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { speak } from 'expo-speech';
import InteractiveMap from './InteractiveMap';
import appStyles from '../../appStyles';
import { UserInformation } from '../../database/userData';
import DrivePage from './DrivePage';
import parkingLocations, { ParkingSpotLocation } from '../../database/parkingData';
import DetailPage from './DetailPage';
import ListViewPage from './ListViewPage';
import ResultView from '../../type/ResultView';
import { UserSettings } from '../../database/userSettingsData';

interface MapProps {
  onOpenSettings: () => void;
  onOpenTimer: () => void;
  settings: UserSettings;
  user: UserInformation;
}

interface MapState {
  location: LocationObject | null;
  locationError: string;
  loading: boolean;
  page: MapPages;
  destination?: ParkingSpotLocation;
  parkingDurationHrs: number;
  view: ResultView;
}

enum MapPages {
  MAIN,
  DRIVE,
  DETAIL,
}

class Map extends Component<MapProps, MapState> {
  state: MapState = {
    location: null,
    locationError: '',
    loading: true,
    page: MapPages.MAIN,
    parkingDurationHrs: 2,
    view: this.props.settings.preferredView,
  };

  componentDidMount() {
    setTimeout(() => {
      this.onMapReady();
    }, 4000);

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

  playVoiceInteraction = async () => {
    speak('Where would you like to go, and how long would you like to park?');
    speak(`I remember you wanted to find ${this.props.settings.preference} parking. Is this still correct?`);
    const loc = 'Box Hill';
    const parkingHours = 2;
    const preference = 'closest';
    speak(`Sure. Searching locations around ${loc} for ${parkingHours} hours that are ${preference}.`);
    const results = parkingLocations.slice(0, 3);
    speak("I've found the following results.");
    results.forEach(async r => {
      speak(r.name);
    });
    speak('where would you like to park?');
    const parkingLocation = results[ 2 ];
    speak(`Thank you. Showing you details for ${parkingLocation.name}.`);
    setTimeout(() => {
      this.setState({ page: MapPages.DETAIL, destination: parkingLocation });
    }, 23900);
    speak('Would you like to drive here?');
    speak('Showing driving directions to this carpark');
    setTimeout(() => {
      this.setState({ page: MapPages.DRIVE });
    }, 29000);
  };

  onMapReady = () => {
    this.setState({ loading: false });
    if(this.props.settings.speechEnabled){
      speak(`Hi ${this.props.user.firstName}.`);
    }
  };

  getPage = () => {
    if(this.state.loading){
      return (
        <ActivityIndicator size='large'/>
      );
    } else if(this.state.locationError.length === 0 && this.state.location !== null) {
      switch(this.state.page){
      case MapPages.MAIN:
        switch(this.state.view){
        case ResultView.Map:
          return (
            <InteractiveMap
              onDetail={(location: ParkingSpotLocation) => {
                this.setState({ page: MapPages.DETAIL, destination: location });
              }}
              location={this.state.location}
              onOpenSettings={this.props.onOpenSettings}
              onOpenTimer={this.props.onOpenTimer}
              user={this.props.user}
              onPlayVoiceInteraction={this.playVoiceInteraction}
              settings={this.props.settings}
              onChangeToListView={() => this.setState({ view: ResultView.List })}
            />
          );
        case ResultView.List:
          return (
            <ListViewPage
              onDetail={(location: ParkingSpotLocation) => {
                this.setState({ page: MapPages.DETAIL, destination: location });
              }}
              location={this.state.location}
              onOpenSettings={this.props.onOpenSettings}
              onOpenTimer={this.props.onOpenTimer}
              user={this.props.user}
              onPlayVoiceInteraction={this.playVoiceInteraction}
              settings={this.props.settings}
              onChangeToMapView={() => this.setState({ view: ResultView.Map })}
            />
          );
        default:
          return null;
        }
      case MapPages.DRIVE:
        return (
          <DrivePage
            onBack={() => this.setState({ page: MapPages.DETAIL })}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            destination={this.state.destination!}
          />
        );
      case MapPages.DETAIL:
        return (
          <DetailPage
            user={this.props.user}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            destination={this.state.destination!}
            onBack={() => this.setState({ page: MapPages.MAIN })}
            onDrive={() => this.setState({ page: MapPages.DRIVE })}
            parkingDurationHrs={this.state.parkingDurationHrs}
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
