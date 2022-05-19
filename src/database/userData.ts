export interface UserInformation {
  id: number;
  firstName: string,
  surname: string,
  email: string,
  password: string
}

const userInformation: Array<UserInformation> = [
  {
    id:1,
    firstName: 'Jessica',
    surname: 'Hu',
    password: 'password12',
    email: 'jessica@mail.com',
  },
  {
    id:2,
    firstName: 'Masoud',
    surname: 'Habibi',
    password: 'password12',
    email: 'masoud@mail.com',
  },
  {
    id:3,
    firstName: 'Pradeepkumar',
    surname: 'Krishnamurthy',
    password: 'password12',
    email: 'pradeep@mail.com',
  },
  {
    id:4,
    firstName: 'Priyanka',
    surname: 'Valli',
    password: 'password12',
    email: 'priyanka@mail.com',
  },
];

export default userInformation;
