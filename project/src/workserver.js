var fs = require('fs');
var http = require('http');
var url = require('url');
var qs = require('querystring');

var port = 3000;
var publicLocation = "public";

var getMimeFromURLString = function(str) {
    var start = str.indexOf(".") + 1;
    var fileExtension = str.slice(start);

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
    if (request.method === 'POST') {
        var body = '';
        request.on('data', function(data) {
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();
        });
        request.on('end', function() {
            var post = qs.parse(body);
            console.log(body);
        });
        return;
    }
    
    
    var grabDocument = function(response, path) {
        var fileContents = getFileContents(path);
        var mime = getMimeFromURLString(path);
        response.writeHead(200, {'Content-Type' : mime});
        response.end(fileContents);
    }

    var isGetChanger = (request.url.indexOf("/?q=") > -1);

    if (request.url === '/' || isGetChanger){
        grabDocument(response, '/index.html');
    }else{
        grabDocument(response, request.url);    
    }
}

var server = http.createServer(handler).listen(port);

exports.getMimeFromURLString = getMimeFromURLString;
