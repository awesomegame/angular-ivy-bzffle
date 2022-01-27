export interface Jobs {
  yacht: string;
  date: Date;
  crew: [string];
  service: string;
  estTime: number;
  realTime: number;
  price: [Object];
  totalWorkTime: number;
  pricePerHour: number;
}

export var jobs = [
  {
    yacht: 'שיבה',
    date: '2022-01-02',
    crew: ['אנה', 'ויקה'],
    service: 'פנים וחוץ',
    estTime: 2,
    realTime: 2.5,
    price: [
      {
        name: 'אנה',
        price: 400,
      },
    ],
    totalWorkTime: 5,
    pricePerHour: 80,
  },
  {
    yacht: 'דליה',
    date: '2022-01-03',
    crew: ['אנה'],
    service: 'פנים',
    estTime: 3,
    realTime: 4.5,
    price: [
      {
        name: 'אנה',
        price: 320,
      },
    ],
    totalWorkTime: 4.5,
    pricePerHour: 71.1,
  },
  {
    yacht: 'נגה',
    date: '2022-01-04',
    crew: ['אנה'],
    service: 'פנים',
    estTime: 3,
    realTime: 3,
    price: [
      {
        name: 'אנה',
        price: 230,
      },
    ],
    totalWorkTime: 3,
    pricePerHour: 71.1,
  },
  {
    yacht: 'אזימוט',
    date: '2022-01-04',
    crew: ['אנה', 'איתי'],
    service: 'חוץ',
    estTime: 3,
    realTime: 7.5,
    price: [
      {
        name: 'אנה',
        price: 320,
      },
      {
        name: 'איתי',
        price: 200,
        paid: '2022-01-04',
        paymentType: 'cash',
      },
    ],
    totalWorkTime: 7,
    pricePerHour: 74.2,
  },
  {
    yacht: 'כרמן',
    date: '2022-01-06',
    crew: ['אנה', 'איתי'],
    service: 'פנים וחוץ',
    estTime: 1.5,
    realTime: 2.5,
    price: [
      {
        name: 'אנה',
        price: 125,
      },
      {
        name: 'איתי',
        price: 125,
      },
    ],
    totalWorkTime: 5,
    pricePerHour: 50,
  },
  {
    yacht: 'סיאסטה',
    date: '2022-01-06',
    crew: ['אנה', 'איתי'],
    service: 'פנים וחוץ',
    estTime: 2,
    realTime: 2,
    price: [
      {
        name: 'אנה',
        price: 125,
      },
      {
        name: 'איתי',
        price: 125,
      },
    ],
    totalWorkTime: 4,
    pricePerHour: 62.5,
  },
  {
    yacht: 'אראלה',
    date: '2022-01-06',
    crew: ['אנה', 'דודי'],
    service: 'פנים וחוץ',
    estTime: 2,
    realTime: 2,
    price: [
      {
        name: 'אנה',
        price: 200,
      },
      {
        name: 'דודי',
        price: 200,
      },
    ],
    totalWorkTime: 4,
    pricePerHour: 100,
  },
  {
    yacht: 'פיפטי',
    date: '2022-01-06',
    crew: ['אנה', 'אנה ל'],
    service: 'חוץ',
    estTime: 1,
    realTime: 1,
    price: [
      {
        name: 'אנה',
        price: 100,
      },
      {
        name: 'אנה ל',
        price: 100,
        paid: '2022-01-06',
        paymentType: 'cash',
      },
    ],
    totalWorkTime: 2,
    pricePerHour: 100,
  },
];
