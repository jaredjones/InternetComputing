var weather = require('../weather');

exports.testIsNotEmptyPredicate = function(test){
  test.ok(weather.isNotEmptyPredicate("hiya"));
  test.ok(weather.isNotEmptyPredicate("1"));
  test.ok(!weather.isNotEmptyPredicate(""));
  test.ok(!weather.isNotEmptyPredicate(undefined));
  test.done();
}

exports.testSanatizeArray = function(test){
  var a = weather.sanatizeArray(["hiya", "", 125, "", undefined, "262"]);
  test.strictEqual(a[0], "hiya", "First element in array is incorrect!");
  test.strictEqual(a[1], 125, "Second element in array is incorrect!");
  test.strictEqual(a[2], "262", "Third element in array is incorrect!");
  test.strictEqual(3, a.length, "Your array is of invalid length");
  test.done();
}
