/* global setTimeout */
const items = {
  'auto': 'ein vehikel mit fünf rädern',
  'fahrrad': 'ein drahtesel eben',
  'haus': 'ein gebäude in dem menschen wohnen',
  'pool': 'da kann man drinnen schwimmen'
};

module.exports = {
  items,
  search: item => new Promise(resolve => {
    setTimeout(() => {
      resolve(items[item]);
    }, 500);
  })
};
