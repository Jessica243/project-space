import React, { useState, useEffect, } from 'react';
import { View } from 'react-native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import MainView from './MainView';
import {speak} from 'expo-speech';
import AppState from '../../UserSettings';

interface MapProps {
  onOpenSettings: () => void;
  settings: AppState;
}

const Map = ({onOpenSettings, settings}: MapProps) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permission to access location was denied.\nPlease grant permission and try again.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    if(settings.speechEnabled){
      speak("Please tell me where you want to go, so I can find you a carpark.");
    }
  }, []);

  return (
    <View>
      <MainView location={location} locationError={locationError} onOpenSettings={onOpenSettings} />
    </View>
  );
};

export default Map;
