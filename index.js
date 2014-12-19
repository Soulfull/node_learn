var http = require('http');
var fs = require('fs');
var chokidar = require('chokidar');
var url = require('url');
var mime = require('mime');
var path = require('path');


var server = http.createServer(function(req, res) {

	var filepath = path.join(__dirname, 'site', req.url);

	fs.readFile(filepath, function(err, data) {
		if (err) {
			res.writeHead(404, {'Content-type' : 'text/html'});
			res.write('File is not found, sorry!');
		} else {
			var type = mime.lookup(filepath)
			res.writeHead(200, {'Content-type' : type});
			res.write(data);
		}
		res.end();
	});

});

var io = require('socket.io').listen(server);

var reload = function() {
	io.emit('reload');
}

server.listen(80);

// watcher

var watcher = chokidar.watch('site/', {ignored: /[\/\\]\./, persistent: true});

watcher.on('change', function (path) {
	console.log('File:', path, 'has been changed!');
	reload();
});

console.log('Server is running on localhost:80');

