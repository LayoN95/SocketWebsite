var socket = require('socket.io-client')('http://192.168.1.112:3000'),
	dht11 = require('node-dht-sensor');

dht11.initialize(11,12);

var interval = setInterval(function () {
read();
}, 3000);

function read() {
	var readout = dht11.read();
	console.log("Temperatura: " + readout.temperature.toFixed(2) + "C " + "Wilgotnosc: " + readout.humidity.toFixed(2) + "%");

	socket.emit("dht11", {"temperature": readout.temperature.toFixed(2), "humidity": readout.humidity.toFixed(2)});
};
