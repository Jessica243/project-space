import { Realm } from '@realm/react';

class ParkingLocation extends Realm.Object {
  parkingLocationId!: Realm.BSON.ObjectId;
  name!: string;
  latitude!: number;
  longitude!: number;
  type!: string;

  static schema = {
    name: 'ParkingLocation',
    primaryKey: 'parkingLocationId',
    properties: {
      parkingLocationId: 'objectId',
      name: 'string',
      latitude: 'number',
      longitude: 'number',
      type: 'string',
    },
  };
}

export default ParkingLocation;
