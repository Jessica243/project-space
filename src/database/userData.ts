export interface UserInformation {
  firstName: string,
  surname: string,
  email: string,
  password: string
}

const userInformation: Array<UserInformation> = [
  {
    firstName: 'Jessica',
    surname: 'Hu',
    password: 'password12',
    email: 'jessica@mail.com',
  },
];

export default userInformation;
