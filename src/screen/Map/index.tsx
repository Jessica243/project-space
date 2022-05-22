import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Dimensions, Pressable, Button } from 'react-native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { speak, isSpeakingAsync } from 'expo-speech';
import InteractiveMap from './InteractiveMap';
import appStyles from '../../appStyles';
import { UserInformation } from '../../database/userData';
import DrivePage from './DrivePage';
import parkingLocations, { ParkingSpotLocation, ParkingSpotType } from '../../database/parkingData';
import DetailPage from './DetailPage';
import ListViewPage from './ListViewPage';
import ResultView from '../../type/ResultView';
import { UserSettings } from '../../database/userSettingsData';
import sleep from '../../util/sleep';
import mapLocations, { MapLocation } from '../../database/mapLocationData';
import ParkingPreference from '../../type/ParkingPreference';
import { Callout } from 'react-native-maps';
import Autocomplete from '../../components/Autocomplete';
import { Badge } from 'react-native-elements';
import { Avatar } from '@rneui/themed';
import { calcDistanceInMeters } from '../../util/distanceCalculator';

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
  sortBy: ParkingPreference,
  duration: number,
  displayPreference: DisplayPerference,
}

export interface ParkingDestination {
  distanceInMeters: number
  location: ParkingSpotLocation
}

enum MapPages {
  MAIN,
  DRIVE,
  DETAIL,
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

class Map extends Component<MapProps, MapState> {
  state: MapState = {
    location: null,
    locationError: '',
    loading: true,
    page: MapPages.MAIN,
    parkingDurationHrs: 2,
    view: this.props.settings.preferredView,
    sortBy: this.props.settings.preference,
    duration: 2,
    displayPreference: DisplayPerference.ALL,
  };

  styles = StyleSheet.create({
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
    tag: {
      marginTop: 10,
      marginRight: 4,
    },
  });

  async componentDidMount() {
    setTimeout(() => this.onMapReady(), 6000);

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
    await this.finishSpeaking('Where would you like to go, and how long would you like to park?');
    await sleep(5000);
    await this.finishSpeaking(`Sure. Searching locations around ${loc} for ${parkingHours} hours based on ${preference}.`);
    this.searchLocation(
      {
        id: 2,
        name: 'Box Hill',
        latitude: -37.81917587784524,
        longitude: 145.12200306843783,
      },
    );
    await this.finishSpeaking('Here are the top results.');
    const displayParkingSpots = this.getDestinations().slice(0, 3);
    await displayParkingSpots.forEach(async r => this.finishSpeaking(r.location.name));
    await this.finishSpeaking('where would you like to park?');
    await sleep(5000);
    const selectedLocation = displayParkingSpots[ 0 ];
    await this.finishSpeaking(`Thank you. Showing you details for ${selectedLocation.location.name}.`);
    this.setState({ page: MapPages.DETAIL, destination: selectedLocation.location });
    await sleep(3000);
    await this.finishSpeaking('Would you like to drive here?');
    await sleep(1000);
    await this.finishSpeaking('Showing driving directions to this carpark');
    this.setState({ page: MapPages.DRIVE });
  };

  filterMapLocations = (name: string) => {
    return mapLocations.filter((mapLocation: MapLocation) => {
      return mapLocation.name.toLowerCase().includes(name.toLowerCase());
    });
  };

  searchLocation = (location?: MapLocation) => {
    if (location) {
      if(location.id === 1){
        this.setState({
          location: this.state.location,
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

  findRelevantParking = (locations: Array<ParkingDestination>) => {
    switch(this.state.displayPreference){
    case DisplayPerference.ALL:
      return locations;
    case DisplayPerference.FREE_ONLY:
      return locations.filter((parkingSpot: ParkingDestination) => {
        return parkingSpot.location.type === ParkingSpotType.Free_LotCovered
              || parkingSpot.location.type === ParkingSpotType.Free_LotUncovered
              || parkingSpot.location.type === ParkingSpotType.Free_Street;
      });
    case DisplayPerference.PARKING_LOT_ONLY:
      return locations.filter((parkingSpot: ParkingDestination) => {
        return parkingSpot.location.type === ParkingSpotType.Free_LotCovered
                || parkingSpot.location.type === ParkingSpotType.Free_LotUncovered
                || parkingSpot.location.type === ParkingSpotType.Paid_LotCovered
                || parkingSpot.location.type === ParkingSpotType.Paid_LotUncovered;
      });
    }
  };

  mostSecureOrder = [
    ParkingSpotType.Paid_LotCovered,
    ParkingSpotType.Paid_LotUncovered,
    ParkingSpotType.Free_LotCovered,
    ParkingSpotType.Free_LotUncovered,
    ParkingSpotType.Paid_Street,
    ParkingSpotType.Free_Street,
  ];

  sortParking = (locations: Array<ParkingDestination>) => {
    switch(this.state.sortBy){
    case ParkingPreference.Cost:
      return locations.sort( (a, b) => {
        return a.location.price - b.location.price;
      });
    case ParkingPreference.Distance:
      return locations.sort( (a, b) => {
        return a.distanceInMeters - b.distanceInMeters;
      });
    case ParkingPreference.Security:
      return locations.sort((a, b) => {
        const order = this.mostSecureOrder;
        return order.indexOf(a.location.type) - order.indexOf(b.location.type);
      });
    default:
      return locations;
    }
  };

  filterByDistance = (locations: Array<ParkingDestination>) => {
    return locations.filter(loc => loc.distanceInMeters < 1000);
  };

  onMapReady = () => {
    this.setState({ loading: false });
    if(this.props.settings.speechEnabled){
      speak(`Hi ${this.props.user.firstName}.`);
    }
  };

  getDestinations = () => {
    const destinations: Array<ParkingDestination> = parkingLocations.map(loc => {
      return {
        distanceInMeters:  this.state.location ? calcDistanceInMeters(
          loc.latitude,
          loc.longitude,
          this.state.location.coords.latitude,
          this.state.location.coords.longitude,
        ) : 0,
        location: loc,
      };
    });
    let displayParkingSpots = this.filterByDistance(destinations);
    displayParkingSpots = this.findRelevantParking(displayParkingSpots);
    displayParkingSpots = this.sortParking(displayParkingSpots);
    return displayParkingSpots;
  };

  getMainView = (location: LocationObject) => {
    const displayParkingSpots = this.getDestinations();
    return (
      <View style={ this.state.view === ResultView.List && appStyles.page}>
        {
          this.state.view === ResultView.List &&
          <ListViewPage
            onDetail={(location: ParkingSpotLocation) => {
              this.setState({ page: MapPages.DETAIL, destination: location });
            }}
            displayParkingSpots={displayParkingSpots}
          />
        }
        {
          this.state.view === ResultView.Map &&
          <InteractiveMap
            onDetail={(location: ParkingSpotLocation) => {
              this.setState({ page: MapPages.DETAIL, destination: location });
            }}
            location={location}
            displayParkingSpots={displayParkingSpots}
          />
        }
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
          <View>
            <View style={appStyles.row}>
              <Pressable style={this.styles.tag} onPress={this.toggleParkingDuration}>
                <Badge value={`${this.state.duration} hrs`}/>
              </Pressable>
              <Pressable style={this.styles.tag} onPress={this.toggleParkingPreference}>
                <Badge value={displayPreferenceName[ this.state.displayPreference ]} />
              </Pressable>
              <Pressable style={this.styles.tag} onPress={this.toggleOrderBy}>
                <Badge value={orderByname[ this.state.sortBy ]}/>
              </Pressable>
            </View>
          </View>
        </Callout>
        <Callout style={this.styles.topRightCallout}>
          {
            this.state.view === ResultView.List &&
            <Button title="🗺" onPress={() => this.setState({ view: ResultView.Map })} />
          }
          {
            this.state.view === ResultView.Map &&
            <Button title="📃" onPress={() => this.setState({ view: ResultView.List })} />
          }
          <Button title="⏰" onPress={this.props.onOpenTimer} />
        </Callout>
        <Callout style={this.styles.bottomRightCallout}>
          <View style={this.styles.avatar}>
            {
              this.props.settings.speechEnabled &&
              <Button title="🎙" onPress={() => this.playVoiceInteraction()} />
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
