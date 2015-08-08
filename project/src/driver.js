var workserver = require('../src/workserver');
var http = require('http');

var port = 3000;
var server = http.createServer(workserver.handler).listen(port);
console.log("---Work Order Server Started---");
