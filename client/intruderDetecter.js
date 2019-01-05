var Gpio = require('onoff').Gpio,
    pir = new Gpio(27, 'in', 'both');
var socket = require("socket.io-client")("http://192.168.43.74:3000");
var count = 0;

exports.start = function () {


pir.watch(function(err, value) {
    count++;
    console.log('Intruder detected' + count);
    
    socket.emit("intruderValue", {"value": value});
});
    
    };