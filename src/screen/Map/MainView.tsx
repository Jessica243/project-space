import React from 'react';
import { Text } from 'react-native';
import { LocationObject } from 'expo-location';
import appStyles from '../../appStyles';
import InteractiveMap from './InteractiveMap';

interface MainViewProps {
  location: LocationObject | null,
  locationError: string,
  onOpenSettings: () => void,
}

const MainView = ({ location, locationError, onOpenSettings }: MainViewProps) => {
  if (locationError.length === 0 && location !== null) {
    return <InteractiveMap location={location} onOpenSettings={onOpenSettings}/>;
  }
  return <Text style={appStyles.validationError}>{locationError}</Text>;
};

export default MainView;
