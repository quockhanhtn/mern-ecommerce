import faker from 'faker';

// ----------------------------------------------------------------------

export const countries = [
  {
    timezones: ['America/Aruba'],
    latlng: [12.5, -69.96666666],
    name: 'Aruba',
    country_code: 'AW',
    capital: 'Oranjestad',
    photo: faker.image.image()
  },
  {
    timezones: ['Asia/Kabul'],
    latlng: [33, 65],
    name: 'Afghanistan',
    country_code: 'AF',
    capital: 'Kabul',
    photo: faker.image.image()
  },
  {
    timezones: ['Africa/Luanda'],
    latlng: [-12.5, 18.5],
    name: 'Angola',
    country_code: 'AO',
    capital: 'Luanda',
    photo: faker.image.image()
  },
  {
    timezones: ['Pacific/Efate'],
    latlng: [-16, 167],
    name: 'Vanuatu',
    country_code: 'VU',
    capital: 'Port Vila',
    photo: faker.image.image()
  },
  {
    timezones: ['Pacific/Wallis'],
    latlng: [-13.3, -176.2],
    name: 'Wallis and Futuna',
    country_code: 'WF',
    capital: 'Mata-Utu',
    photo: faker.image.image()
  },
  {
    timezones: ['Pacific/Apia'],
    latlng: [-13.58333333, -172.33333333],
    name: 'Samoa',
    country_code: 'WS',
    capital: 'Apia',
    photo: faker.image.image()
  },
  {
    timezones: ['Asia/Aden'],
    latlng: [15, 48],
    name: 'Yemen',
    country_code: 'YE',
    capital: "Sana'a",
    photo: faker.image.image()
  },
  {
    timezones: ['Africa/Johannesburg'],
    latlng: [-29, 24],
    name: 'South Africa',
    country_code: 'ZA',
    capital: 'Pretoria',
    photo: faker.image.image()
  },
  {
    timezones: ['Africa/Lusaka'],
    latlng: [-15, 30],
    name: 'Zambia',
    country_code: 'ZM',
    capital: 'Lusaka',
    photo: faker.image.image()
  },
  {
    timezones: ['Africa/Harare'],
    latlng: [-20, 30],
    name: 'Zimbabwe',
    country_code: 'ZW',
    capital: 'Harare',
    photo: faker.image.image()
  }
];
