var Gpio = require('pigpio').Gpio,
    trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
    echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});
var socket = require("socket.io-client")("http://192.168.43.74:3000");

var MICROSECDONDS_PER_CM = 1e6/34321;

trigger.digitalWrite(0);

exports.start = function () {


(function(){
    var startTick;
    
    echo.on('alert', function (level, tick) {
        var endTick,
            diff, dist;
        
        if (level == 1) {
            startTick = tick;
        } else {
            endTick = tick;
            diff = (endTick >> 0) - (startTick >> 0);
            dist = (diff/2/MICROSECDONDS_PER_CM);
            console.log(dist);
            socket.emit("hcsr04distance", {"value": value});

        }
    });
}());

setInterval(function (){
    trigger.trigger(10,1);
}, 1000);
    
};