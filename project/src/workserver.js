var fs = require('fs');
var http = require('http');
var url = require('url');

var port = 3000;
var publicLocation = "public";

var getMimeFromURLString = function(str) {
    var start = str.indexOf(".") + 1;
    var fileExtension = str.slice(start);
    console.log(fileExtension);

    var mime;
    switch(fileExtension) {
        case "appcache":
            mime = "text/cache-manifest";
            break;
        case "ico":
            mime = "image/x-icon";
            break;
        case "css":
            mime = "text/css";
            break;
        case "js":
            mime = "application/javascript";
            break;
        case "html":
            mime = "text/html";
            break;
        default:
            mime = "text/plain";
    }

    return mime;
}

var getFileContents = function(path) {
    var fileContents;
    try {
        fileContents = fs.readFileSync(publicLocation + path);
    }catch (e) {
        console.log(e);
    }
    return fileContents;
}

var handler = function(request, response) {
    var grabDocument = function(response, path) {
        var fileContents = getFileContents(path);
        var mime = getMimeFromURLString(path);
        response.writeHead(200, {'Content-Type' : mime});
        response.end(fileContents);
    }

    if (request.url === '/'){
        grabDocument(response, '/index.html');
    }else{
        grabDocument(response, request.url);    
    }
}

var server = http.createServer(handler).listen(port);

exports.getMimeFromURLString = getMimeFromURLString;
