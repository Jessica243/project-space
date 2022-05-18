export interface ParkingSpotLocation {
  id: number;
  name: string;
  address: string;
  type: ParkingSpotType;
  latitude: number;
  longitude: number;
}

export enum ParkingSpotType {
  Free_Street,
  Free_LotUncovered,
  Free_LotCovered,

  Paid_Street,
  Paid_LotCovered,
  Paid_LotUncovered,
}

const parkingLocations: Array<ParkingSpotLocation> = [
  {
    id: 1,
    name: 'Wilson Parking - Box Hill Central Car Park Whitehorse Plaza',
    address: '80 Carrington Rd, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_LotCovered,
    latitude: -37.819326613715134,
    longitude: 145.11990034286214,
  }, {
    id: 2,
    name: 'Boxhill Free parking',
    address: '17 Hopetoun Parade, Box Hill VIC 3128',
    type: ParkingSpotType.Free_Street,
    latitude: -37.81854206547476,
    longitude: 145.11757658141642,
  }, {
    id: 3,
    name: 'Wilson Parking',
    address: '32 Prospect St, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_Street,
    latitude: -37.81776324287638,
    longitude: 145.11703172259323,
  }, {
    id: 4,
    name: 'Wilson Parking',
    address: '8 Prospect St, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_LotUncovered,
    latitude: -37.81828514447232,
    longitude: 145.11918097967268,
  }, {
    id: 5,
    name: 'Wilson Parking',
    address: 'Main Street, Box Hill Central Shopping Centre, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_LotCovered,
    latitude: -37.81887011044014,
    longitude: 145.12226133457077,
  }, {
    id: 6,
    name: 'Ace Parking | 519 Station St, Box Hill',
    address: '519 Station St, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_LotUncovered,
    latitude: -37.821130418105476,
    longitude: 145.12303684407678,
  }, {
    id: 7,
    name: 'Harrow Street Car Park',
    address: 'Harrow St, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_Street,
    latitude: -37.82127124495155,
    longitude: 145.12399063159552,
  }, {
    id: 8,
    name: 'Ellingworth Parade Harrow Street Parking Area',
    address: '20-24 Ellingworth Parade, Box Hill VIC 3128',
    type: ParkingSpotType.Paid_LotUncovered,
    latitude: -37.82099663235283,
    longitude: 145.1255327366492,
  },
];

export default parkingLocations;
