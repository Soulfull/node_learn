var http = require('http');
var fs = require('fs');
var chokidar = require('chokidar');
var url = require('url');
var mime = require('mime');
var path = require('path');
var less = require('less');

var server = http.createServer(function(req, res) {
	
	var url = req.url;
	if (url !== '/lib/liveReload.js') {
		if (url === '/') {
			url = '/site/index.html';
		} else {
			url = '/site' + url;
		}
	}

	var filepath = path.join(__dirname, '/', url);


	fs.readFile(filepath, function(err, data) {

		if (err) {
			console.log(err);
			res.writeHead(404, {'Content-type' : 'text/html'});
			res.write('File is not found, sorry!');
		} else {
			var type = mime.lookup(filepath);
			res.writeHead(200, {'Content-type' : type});
			res.write(data);
		}
		res.end();
	});

});

var io = require('socket.io').listen(server);

var reload = function () {
	io.emit('reload');
}

server.listen(3000);

// watcher

var watcher = chokidar.watch('site/', {ignored: /[\/\\]\./, persistent: true});

watcher.on('change', function (path) {
	console.log('File:', path, 'has been changed!');
	reload();
});

console.log('Server is running on localhost:3000');

