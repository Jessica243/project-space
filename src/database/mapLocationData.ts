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
  {
    id: 5,
    name: 'Docklands',
    latitude: -37.81512005876655,
    longitude: 144.94476152515418,
  },
  {
    id: 6,
    name: 'Abbotsford',
    latitude: -37.80541198196592,
    longitude: 144.99827959487777,
  },
  {
    id: 7,
    name: 'Epping',
    latitude: -37.64810316277113,
    longitude: 145.0219481006772,
  },
  {
    id: 8,
    name: 'Frankston',
    latitude: -38.137507244445544,
    longitude: 145.13403967611492,
  },
  {
    id: 9,
    name: 'Glen Waverley',
    latitude: -37.88136849257058,
    longitude: 145.16441373494618,
  },
  {
    id: 10,
    name: 'Hawthorn',
    latitude: -37.826377942268955,
    longitude: 145.03431784737643,
  },
  {
    id: 11,
    name: 'Kensington',
    latitude: -37.79362686687339,
    longitude: 144.92714633593633,
  },
  {
    id: 12,
    name: 'Parkville',
    latitude: -37.78644168761026,
    longitude: 144.94991462087438,
  },
];

export default mapLocations;
