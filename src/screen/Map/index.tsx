import React, { useState, useEffect, } from 'react';
import { ActivityIndicator, View } from 'react-native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import MainView from './MainView';
import {speak} from 'expo-speech';
import AppState from '../../type/UserSettings';

interface MapProps {
  onOpenSettings: () => void;
  settings: AppState;
}

const Map = ({onOpenSettings, settings}: MapProps) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState('');
  const [loading, setLoading] = useState(true);

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

    setTimeout(() => {
      onMapReady();  
    }, 3000);
  }, []);

  const onMapReady = () => {
    setLoading(false);
    if(settings.speechEnabled){
      speak("Please tell me where you want to go, so I can find you a carpark.");
    }
  };

  return (
    <View>
      {
        loading &&
        <ActivityIndicator size='large'/>
      }
      {
        !loading &&
        <MainView 
          location={location}
          locationError={locationError}
          onOpenSettings={onOpenSettings}
        />
      }
    </View>
  );
};

export default Map;
