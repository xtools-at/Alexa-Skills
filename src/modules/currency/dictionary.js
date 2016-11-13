/* global setTimeout */
const currencies = {
  'dollar': 'USD',
  'amerikanische dollar': 'USD',
  'amerikanischer dollar': 'USD',
  'U.S. dollar': 'USD',
  'us dollar': 'USD',
  'u s dollar': 'USD',
  'euro': 'EUR',
  'australische dollar': 'AUD',
  'australischer dollar': 'AUD',
  'lew': 'BGN',
  'bulgarische lew': 'BGN',
  'bulgarischer lew': 'BGN',
  'real': 'BRL',
  'brasilianische real': 'BRL',
  'kanadische dollar': 'CAD',
  'franken': 'CHF',
  'schweizer franken': 'CHF',
  'yuan': 'CNY',
  'chinesiche yuan': 'CNY',
  'chinesicher yuan': 'CNY',
  'tschechische krone': 'CZK',
  'tschechische kronen': 'CZK',
  'krone': 'CZK',
  'kronen': 'CZK',
  'daenische krone': 'DKK',
  'daenische kronen': 'DKK',
  'pfund': 'GBP',
  'pfund sterling': 'GBP',
  'britische pfund': 'GBP',
  'britischer pfund': 'GBP',
  'hongkong dollar': 'HKD',
  'kuna': 'HRK',
  'kroatische kuna': 'HRK',
  'kroatischer kuna': 'HRK',
  'forint': 'HUF',
  'ungarische Forint': 'HUF',
  'ungarischer Forint': 'HUF',
  'rupiah': 'IDR',
  'indonesische rupiah': 'IDR',
  'schekel': 'ILS',
  'rupie': 'INR',
  'indische rupie': 'INR',
  'yen': 'JPY',
  'japanische yen': 'JPY',
  'won': 'KRW',
  'suedkoreanischer won': 'KRW',
  'peso': 'MXN',
  'mexikanische peso': 'MXN',
  'mexikanischer peso': 'MXN',
  'mexikanische pesos': 'MXN',
  'mexikanischer pesos': 'MXN',
  'ringgit': 'MYR',
  'malaysische ringgit': 'MYR',
  'norwegische krone': 'NOK',
  'norwegische kronen': 'NOK',
  'neuseeland dollar': 'NZD',
  'philippinische peso': 'PHP',
  'philippinischer peso': 'PHP',
  'philippinische pesos': 'PHP',
  'zloty': 'PLN',
  'polnische zloty': 'PLN',
  'polnischer zloty': 'PLN',
  'leu': 'RON',
  'rumaenische leu': 'RON',
  'rumaenischer leu': 'RON',
  'rubel': 'RUB',
  'russische rubel': 'RUB',
  'russischer rubel': 'RUB',
  'schwedische krone': 'SEK',
  'schwedische kronen': 'SEK',
  'singapur dollar': 'SGD',
  'baht': 'THB',
  'thailaendische baht': 'THB',
  'thailaendischer baht': 'THB',
  'lira': 'TRY',
  'zypern lira': 'TRY',
  'zypriotische lira': 'TRY',
  'rand': 'ZAR',
  'suedafrikanische rand': 'ZAR',
  'suedafrikanischer rand': 'ZAR'
};

const currencyNamesPlural = {
  'USD': 'U.S. Dollar',
  'EUR': 'Euro',
  'AUD': 'Australische Dollar',
  'BGN': 'Bulgarísche Lew',
  'BRL': 'Brasilianische Real',
  'CAD': 'Kanadische Dollar',
  'CHF': 'Schweizer Franken',
  'CNY': 'Chinesische Yuan',
  'CZK': 'Tschechische Kronen',
  'DKK': 'Daenische Kronen',
  'GBP': 'Britische Pfund',
  'HKD': 'Hongkong Dollar',
  'HRK': 'Kroatische Kuna',
  'HUF': 'Ungarische Forint',
  'IDR': 'Indonesische Rupiah',
  'ILS': 'Israelische Schekel',
  'INR': 'Indische Rupien',
  'JPY': 'Japanische Yen',
  'KRW': 'Suedkoreanische Won',
  'MXN': 'Mexikanische Pesos',
  'MYR': 'Malysische Ringgit',
  'NOK': 'Norwegische Kronen',
  'NZD': 'Neuseeland Dollar',
  'PHP': 'Philippinische Pesos',
  'PLN': 'Polnische Zloty',
  'RON': 'Rumaenische Leu',
  'RUB': 'Russische Rubel',
  'SEK': 'Schwedische Kronen',
  'SGD': 'Singapur Dollar',
  'THB': 'Thailaendische Baht',
  'TRY': 'Zypriotische Lira',
  'ZAR': 'Suedafrikanische Rand'
};

const currencyNamesSingular = {
  'USD': 'U.S. Dollar',
  'EUR': 'Euro',
  'AUD': 'Australischer Dollar',
  'BGN': 'Bulgarischer Lew',
  'BRL': 'Brasilianischer Real',
  'CAD': 'Kanadischer Dollar',
  'CHF': 'Schweizer Franken',
  'CNY': 'Chinesischer Yuan',
  'CZK': 'Tschechische Krone',
  'DKK': 'Daenische Krone',
  'GBP': 'Britisches Pfund',
  'HKD': 'Hongkong Dollar',
  'HRK': 'Kroatischer Kuna',
  'HUF': 'Ungarischer Forint',
  'IDR': 'Indonesische Rupiah',
  'ILS': 'Israelischer Schekel',
  'INR': 'Indische Rupie',
  'JPY': 'Japanischer Yen',
  'KRW': 'Suedkoreanischer Won',
  'MXN': 'Mexikanischer Peso',
  'MYR': 'Malysischer Ringgit',
  'NOK': 'Norwegische Krone',
  'NZD': 'Neuseeland Dollar',
  'PHP': 'Philippinischer Pesos',
  'PLN': 'Polnischer Zloty',
  'RON': 'Rumaenischer Leu',
  'RUB': 'Russischer Rubel',
  'SEK': 'Schwedische Kronen',
  'SGD': 'Singapur Dollar',
  'THB': 'Thailaendischer Baht',
  'TRY': 'Zypriotische Lira',
  'ZAR': 'Suedafrikanischer Rand'
};

module.exports = {
  currencies,
  currencyNamesPlural,
  currencyNamesSingular,
  search: currency => new Promise(resolve => {
    setTimeout(() => {
      resolve(currencies[currency]);
    }, 5);
  })
};
