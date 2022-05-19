export interface ParkingDiscussion {
  id: number;
  parkingId: number;
  userId: number;
  comment: string;
  createdAt: Date;
}

const parkingDiscussions: Array<ParkingDiscussion> = [
  {
    id: 1,
    parkingId: 1,
    userId: 1,
    comment: 'I would never park here again. The entrance is super tight and I scratched car on the pole.',
    createdAt: new Date(),
  },
  {
    id: 2,
    parkingId: 2,
    userId: 2,
    comment: 'This is an awesome free parking. I recommend',
    createdAt: new Date(),
  },
  {
    id: 3,
    parkingId: 3,
    userId: 3,
    comment: 'So many birds here. Do not recommend.',
    createdAt: new Date(),
  },
  {
    id: 4,
    parkingId: 4,
    userId: 4,
    comment: 'Wonderful',
    createdAt: new Date(),
  },
  {
    id: 5,
    parkingId: 5,
    userId: 1,
    comment: 'I have nothing to say about this',
    createdAt: new Date(),
  },
  {
    id: 6,
    parkingId: 6,
    userId: 2,
    comment: 'The price is too expensive',
    createdAt: new Date(),
  },
  {
    id: 7,
    parkingId: 7,
    userId: 3,
    comment: "Don't come here if you have a tall car. The ceiling is low",
    createdAt: new Date(),
  },
  {
    id: 8,
    parkingId: 8,
    userId: 4,
    comment: 'I recommend you park here if you come to Box Hill',
    createdAt: new Date(),
  },
];

export default parkingDiscussions;
