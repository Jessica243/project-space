import React from 'react';
import { Marker } from 'react-native-maps';
import { ParkingSpotLocation, ParkingSpotType } from '../../database/parkingData';

const parkingColour: Record<ParkingSpotType, string> = {
  [ParkingSpotType.Free_LotCovered]: 'purple',
  [ParkingSpotType.Free_LotUncovered]: 'blue',
  [ParkingSpotType.Free_Street]: 'green',

  [ParkingSpotType.Paid_LotCovered]: 'yellow',
  [ParkingSpotType.Paid_LotUncovered]: 'orange',
  [ParkingSpotType.Paid_Street]: 'red'
};

const parkingTypeName: Record<ParkingSpotType, string> = {
  [ParkingSpotType.Free_LotCovered]: 'Free covered parking lot',
  [ParkingSpotType.Free_LotUncovered]: 'Free uncovered parking lot',
  [ParkingSpotType.Free_Street]: 'Free street parking',

  [ParkingSpotType.Paid_LotCovered]: 'Paid covered parking lot',
  [ParkingSpotType.Paid_LotUncovered]: 'Paid uncovered parking lot',
  [ParkingSpotType.Paid_Street]: 'Paid street parking'
};

const MapMarker = ({ id, name, address, type, latitude, longitude}: ParkingSpotLocation) => {
  return (
    <Marker
      key={id}
      coordinate = {{
        latitude: latitude,
        longitude: longitude
      }}
      pinColor = {parkingColour[type]}
      title={name}
      description={`${address} [${parkingTypeName[type]}]`}
    />
  );
};

export default MapMarker;
