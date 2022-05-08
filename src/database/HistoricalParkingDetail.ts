import { Realm } from '@realm/react';

class HistoricalParkingDetails extends Realm.Object {
  historicalParkingDetailId!: Realm.BSON.ObjectId;
  parkingLocationId!: number;
  createdAt!: Date;
  totalSpaces!: number;
  price!: number;
  timeLimit!: number;
  hoursInEffect!: number;
  clearanceHeight!: number;

  static schema = {
    name: 'HistoricalParkingDetails',
    primaryKey: 'historicalParkingDetailId',
    properties: {
      historicalParkingDetailId: 'objectId',
      parkingLocationId: 'number',
      createdAt: 'date',
      totalSpaces: 'number',
      price: 'number',
      timeLimit: 'number',
      hoursInEffect: 'number',
      clearanceHeight: 'number',
    },
  };
}

export default HistoricalParkingDetails;
