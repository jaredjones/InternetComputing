var workserver = require('../src/workserver');

exports.testMimeForAppCache = function(test) {
    var mime = workserver.getMimeFromURLString("path/aardvark.appcache");
    test.strictEqual(mime, "text/cache-manifest");
    test.done();
}

exports.testMimeForICO = function(test) {
    var mime = workserver.getMimeFromURLString("favicon.ico");
    test.strictEqual(mime, "image/x-icon");
    test.done();
}

exports.testMimeForCSS = function(test) {
    var mime = workserver.getMimeFromURLString("aardvark.css");
    test.strictEqual(mime, "text/css");
    test.done();
}

exports.testMimeForJS = function(test) {
    var mime = workserver.getMimeFromURLString("js/aardvark.js");
    test.strictEqual(mime, "application/javascript");
    test.done();
}

exports.testMimeForHTML = function(test) {
    var mime = workserver.getMimeFromURLString("page.html");
    test.strictEqual(mime, "text/html");
    test.done();
}

exports.testMimeForRandom = function(test) {
    var mime = workserver.getMimeFromURLString("page.lolol");
    test.strictEqual(mime, "text/plain");
    test.done();
}

exports.testFileContentsFails = function(test) {
	var fileContent = workserver.getFileContents("nopath");
	test.strictEqual(fileContent, "404 Page Not Found!");
	test.done();
}