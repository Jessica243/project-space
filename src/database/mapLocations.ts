export interface MapLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const mapLocations: Array<MapLocation> = [
  {
    id: 1,
    name: 'Current Location',
    latitude: 0,
    longitude: 0,
  },
  {
    id: 2,
    name: 'Box Hill',
    latitude: -37.81917587784524,
    longitude: 145.12200306843783,
  },
  {
    id: 3,
    name: 'Melbourne CBD',
    latitude: -37.81383775905052,
    longitude: 144.9618633174965,
  },
  {
    id: 4,
    name: 'Carlton',
    latitude: -37.800769367598406,
    longitude: 144.9676940716665,
  },
];

export default mapLocations;
