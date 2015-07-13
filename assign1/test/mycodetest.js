var mycode = require('../src/mycode');

exports.testCanary = function(test) {
  test.ok(true);
  test.done();
}

exports.testGreet = function(test) {
  test.equal('hello world!', mycode.greet());
  test.done();
}