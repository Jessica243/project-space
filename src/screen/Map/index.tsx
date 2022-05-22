import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { speak, isSpeakingAsync } from 'expo-speech';
import InteractiveMap from './InteractiveMap';
import appStyles from '../../appStyles';
import { UserInformation } from '../../database/userData';
import DrivePage from './DrivePage';
import parkingLocations, { ParkingSpotLocation } from '../../database/parkingData';
import DetailPage from './DetailPage';
import ListViewPage from './ListViewPage';
import ResultView from '../../type/ResultView';
import { UserSettings } from '../../database/userSettingsData';
import sleep from '../../util/sleep';

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

  finishSpeaking = async (text: string) => {
    await speak(text);
    while (await isSpeakingAsync()) {
      await sleep(1000);
    }
  };

  playVoiceInteraction = async () => {
    const loc = 'Box Hill';
    const parkingHours = 2;
    const preference = 'closest';
    const topResults = parkingLocations.slice(0, 3);
    const selectedLocation = topResults[ 2 ];

    await this.finishSpeaking('Where would you like to go, and how long would you like to park?');
    await sleep(5000);
    await this.finishSpeaking(`Sure. Searching locations around ${loc} for ${parkingHours} hours based on ${preference}.`);
    await this.finishSpeaking('Here are the top results.');
    await topResults.forEach(async r => this.finishSpeaking(r.name));
    await this.finishSpeaking('where would you like to park?');
    await sleep(5000);
    await this.finishSpeaking(`Thank you. Showing you details for ${selectedLocation.name}.`);
    this.setState({ page: MapPages.DETAIL, destination: selectedLocation });
    await sleep(3000);
    await this.finishSpeaking('Would you like to drive here?');
    await sleep(1000);
    await this.finishSpeaking('Showing driving directions to this carpark');
    this.setState({ page: MapPages.DRIVE });
  };

  onMapReady = () => {
    this.setState({ loading: false });
    if(this.props.settings.speechEnabled){
      speak(`Hi ${this.props.user.firstName}.`);
    }
  };

  getMainView = (location: LocationObject) => {
    switch(this.state.view){
    case ResultView.Map:
      return (
        <InteractiveMap
          onDetail={(location: ParkingSpotLocation) => {
            this.setState({ page: MapPages.DETAIL, destination: location });
          }}
          location={location}
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
          location={location}
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
  };

  getPage = () => {
    if(this.state.loading){
      return (
        <ActivityIndicator size='large'/>
      );
    } else if(this.state.locationError.length === 0 && this.state.location !== null) {
      switch(this.state.page){
      case MapPages.MAIN:
        return this.getMainView(this.state.location);
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
