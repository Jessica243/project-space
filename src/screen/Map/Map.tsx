import React, { useState } from 'react';
import { View } from 'react-native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import MainView from './MainView';

interface MapProps {
  onOpenSettings: () => void;
}

const Map = ({onOpenSettings}: MapProps) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState('');

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permission to access location was denied.\nPlease grant permission and try again.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View>
      <MainView location={location} locationError={locationError} onOpenSettings={onOpenSettings} />
    </View>
  );
};

export default Map;
