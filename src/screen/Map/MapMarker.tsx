import React from 'react';
import { Image, StyleSheet, ImageSourcePropType} from 'react-native';
import { Marker } from 'react-native-maps';
import { ParkingSpotLocation, ParkingSpotType } from '../../database/parkingData';
import parkingRed from '../../../assets/parkingRed.png';
import parkingOrange from '../../../assets/parkingOrange.png';
import parkingYellow from '../../../assets/parkingYellow.png';
import parkingGreen from '../../../assets/parkingGreen.png';
import parkingBlue from '../../../assets/parkingBlue.png';
import parkingPurple from '../../../assets/parkingPurple.png';


const parkingIcon: Record<ParkingSpotType, ImageSourcePropType> = {
  [ParkingSpotType.Free_LotCovered]: parkingPurple,
  [ParkingSpotType.Free_LotUncovered]: parkingBlue,
  [ParkingSpotType.Free_Street]: parkingGreen,

  [ParkingSpotType.Paid_LotCovered]: parkingYellow,
  [ParkingSpotType.Paid_LotUncovered]: parkingOrange,
  [ParkingSpotType.Paid_Street]: parkingRed
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

  const showPopup = () => {
    // TODO: show popup
  };

  return (
    <Marker
      key={id}
      coordinate = {{
        latitude: latitude,
        longitude: longitude
      }}
      onPress = {showPopup}
      title={name}
      description={`${address} [${parkingTypeName[type]}]`}
    >
      <Image source={parkingIcon[type]} style={componentStyles.icon} />
    </Marker>
  );
};

const componentStyles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
  }
});

export default MapMarker;
