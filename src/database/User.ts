import { Realm } from '@realm/react';

class User extends Realm.Object {
  userId!: Realm.BSON.ObjectId;
  name!: string;
  email!: string;

  static schema = {
    name: 'User',
    primaryKey: 'userId',
    properties: {
      userId: 'objectId',
      name: 'string',
      email: 'string',
    },
  };
}

export default User;
