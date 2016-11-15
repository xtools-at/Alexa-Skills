const answer = {
  'create': function (dices, sides) {
    if (!sides || typeof sides === 'undefined') {
      sides = 6;
    }
    var min, max;
    min = 1 * dices;
    max = sides * dices;

    var diceValue = Math.floor(Math.random() * (max - min + 1) + min);
    var outputSpeech = `<speak><audio src="https://s3.eu-central-1.amazonaws.com/assetsalexa/wuerfel/dice.mp3" />${diceValue}</speak>`;

    return outputSpeech;
  }
};

module.exports = {
  answer
};
