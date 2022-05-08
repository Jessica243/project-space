import { Realm } from '@realm/react';

class UserPreference extends Realm.Object {
  userPreferenceId!: Realm.BSON.ObjectId;
  userId!: number;
  parkingPreference!: string;
  priority!: number;

  static schema = {
    name: 'UserPreference',
    primaryKey: 'userId',
    properties: {
      userPreferenceId: 'objectId',
      userId: 'number',
      parkingPreference: 'string',
      priority: 'number',
    },
  };
}

export default UserPreference;
