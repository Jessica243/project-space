import React from 'react';
import { Marker } from 'react-native-maps';
import { ParkingSpotLocation } from '../../database/parkingData';

const MapMarker = ({ id, name, address, latitude, longitude}: ParkingSpotLocation) => {
  return (
    <Marker
      key={id}
      coordinate = {{
        latitude: latitude,
        longitude: longitude
      }}
      pinColor = {"purple"}
      title={name}
      description={address}
    />
  );
};

export default MapMarker;
