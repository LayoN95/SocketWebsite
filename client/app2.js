var socket = require("socket.io-client")("192.168.1.112:3000");
var Gpio = require("onoff").Gpio;
var LED = new Gpio(22, 'out');

socket.on("connect", function () {
    console.log("Connected to server");
    socket.on("updateState", function (state) {
        console.log("The new state is: " + state);
    });
})
