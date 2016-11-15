/* global setTimeout */

const operations = {
  'plus': '+',
  'und': '+',
  'minus': '-',
  'weniger': '-',
  'abzueglich': '-',
  'mal': '*',
  'multipliziert': '*',
  'multipliziert mit': '*',
  'durch': '/',
  'dividiert': '/',
  'geteilt': '/',
  'dividiert durch': '/',
  'geteilt durch': '/',
  'zum quadrat': '^2',
  'quadrat': '^2',
  'hoch': '^'
};

const radOperations = {
  'tangens': 'tan',
  'sinus': 'sin',
  'cosinus': 'cos',
  'logarithmus': 'log',
};

const doCalc = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '*': function (x, y) { return x * y },
  '/': function (x, y) { return x / y },
  '^': function (x, y) { return Math.pow(x, y) },
  '^2': function (x, y) { return Math.pow(x, 2) },
  'w2': function (x, y) { return Math.sqrt(x) },

}​​​​​​​;



module.exports = {
  operations,
  radOperations
};
