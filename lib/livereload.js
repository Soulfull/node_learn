var io = require('./socket.io');

(function () {

	var socket = io.connect(document.location.hostname);

	socket.on('reload', function () {
		document.location.reload();
	});


})();

