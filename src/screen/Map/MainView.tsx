import React from 'react';
import { Text } from 'react-native';
import { LocationObject } from 'expo-location';
import appStyles from '../../appStyles';
import InteractiveMap from './InteractiveMap';

interface MainViewProps {
  location: LocationObject | null,
  locationError: string,
  onOpenSettings: () => void,
  onOpenTimer: () => void,
}

const MainView = ({ location, locationError, onOpenSettings, onOpenTimer }: MainViewProps) => {
  if (locationError.length === 0 && location !== null) {
    return <InteractiveMap location={location} onOpenSettings={onOpenSettings} onOpenTimer={onOpenTimer}/>;
  }
  return <Text style={appStyles.validationError}>{locationError}</Text>;
};

export default MainView;
