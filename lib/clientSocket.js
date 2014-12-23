var io = require('./socket.io');

var socket = io.connect(document.location.hostname);

socket.on('reload', function () {
	document.location.reload();
});


