
var socket = require('socket.io-client')('http://192.168.1.112:3000'),
    ds18b20 = require('ds18b20');
 
var interval = 3000;

exports.start = function () {
 
socket.on("connect", function () {
	
    var sensorId = [];
    //pobranie id sensorów
    ds18b20.sensors(function (err, id) {
        sensorId = id;
        socket.emit("sensors", id); //send sensor ID's to clients
        console.log("Sensors" + id);
    });
 
    setInterval(function () {
        
        sensorId.forEach(function (id) {
 
            ds18b20.temperature(id, function (err, value) {
                
                //przesłanie odczytów temperatury
                socket.emit("temps", {"id": id, "value": value});
                console.log("temperature" + value + " id" + id);
 
            });
        });
 
    }, interval);
});
};
