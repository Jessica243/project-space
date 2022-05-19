export interface ParkingSpotLocation {
  id: number;
  name: string;
  address: string;
  type: ParkingSpotType;
  price: number;
  latitude: number;
  longitude: number;
  clearanceHeight: number;
  totalSpaces: number;
}

export enum ParkingSpotType {
  Free_Street,
  Free_LotUncovered,
  Free_LotCovered,

  Paid_Street,
  Paid_LotCovered,
  Paid_LotUncovered,
}

export const parkingTypeName: Record<ParkingSpotType, string> = {
  [ ParkingSpotType.Free_LotCovered ]: 'Free covered parking lot',
  [ ParkingSpotType.Free_LotUncovered ]: 'Free uncovered parking lot',
  [ ParkingSpotType.Free_Street ]: 'Free street parking',

  [ ParkingSpotType.Paid_LotCovered ]: 'Paid covered parking lot',
  [ ParkingSpotType.Paid_LotUncovered ]: 'Paid uncovered parking lot',
  [ ParkingSpotType.Paid_Street ]: 'Paid street parking',
};

const parkingLocations: Array<ParkingSpotLocation> = [
  {
    id: 1,
    name: 'Wilson Parking - Box Hill Central Car Park Whitehorse Plaza',
    address: '80 Carrington Rd, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_LotCovered,
    price: 1,
    latitude: -37.819326613715134,
    longitude: 145.11990034286214,
    clearanceHeight: 2.1,
    totalSpaces: 100
  }, {
    id: 2,
    name: 'Boxhill Free parking',
    address: '17 Hopetoun Parade, Box Hill VIC 3128',
    type: ParkingSpotType.Free_Street,
    price:0,
    latitude: -37.81854206547476,
    longitude: 145.11757658141642,
    clearanceHeight: 2.1,
    totalSpaces: 60
  }, {
    id: 3,
    name: 'Wilson Parking',
    address: '32 Prospect St, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_Street,
    price: 1,
    latitude: -37.81776324287638,
    longitude: 145.11703172259323,
    clearanceHeight: 2.1,
    totalSpaces: 40
  }, {
    id: 4,
    name: 'Wilson Parking',
    address: '8 Prospect St, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_LotUncovered,
    price:1,
    latitude: -37.81828514447232,
    longitude: 145.11918097967268,
    clearanceHeight: 2.1,
    totalSpaces: 150
  }, {
    id: 5,
    name: 'Wilson Parking',
    address: 'Main Street, Box Hill Central Shopping Centre, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_LotCovered,
    price:1,
    latitude: -37.81887011044014,
    longitude: 145.12226133457077,
    clearanceHeight: 2.1,
    totalSpaces: 10
  }, {
    id: 6,
    name: 'Ace Parking | 519 Station St, Box Hill',
    address: '519 Station St, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_LotUncovered,
    price:2.8,
    latitude: -37.821130418105476,
    longitude: 145.12303684407678,
    clearanceHeight: 2.5,
    totalSpaces: 100
  }, {
    id: 7,
    name: 'Harrow Street Car Park',
    address: 'Harrow St, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_Street,
    price: 3.2,
    latitude: -37.82127124495155,
    longitude: 145.12399063159552,
    clearanceHeight: 2.5,
    totalSpaces: 50
  }, {
    id: 8,
    name: 'Ellingworth Parade Harrow Street Parking Area',
    address: '20-24 Ellingworth Parade, Box Hill VIC 3128',
    price: 5,
    type: ParkingSpotType.Paid_LotUncovered,
    latitude: -37.82099663235283,
    longitude: 145.1255327366492,
    clearanceHeight: 1.8,
    totalSpaces: 30
  }, {
    id: 9,
    name: 'Wilson Parking',
    address: '300 Lonsdale Street, Melbourne',
    price: 13,
    type: ParkingSpotType.Paid_LotUncovered,
    latitude: -37.81158333783042, 
    longitude: 144.9635136750925,
    clearanceHeight: 2.1,
    totalSpaces: 150
  }, {
    id: 10,
    name: 'Wilson Parking',
    address: '300 Latrobe Street, Melbourne',
    price: 5,
    type: ParkingSpotType.Paid_LotUncovered,
    latitude: -37.810218072937644, 
    longitude: 144.9604981994445,
    clearanceHeight: 2.1,
    totalSpaces: 40
  },

];

export default parkingLocations;
