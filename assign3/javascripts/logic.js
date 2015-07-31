//Presently the entire game is inside of game.js, and is not unit tested
//Once we have the game working we will move the logic into this file and begin tests.
var getRandomNumberWithBounds = function(min, max) {
  return Math.random() * (max - min) + min;
}
