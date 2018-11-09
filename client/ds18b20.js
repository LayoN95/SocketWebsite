
var socket = require('socket.io-client')('http://192.168.1.112:3000'),
    ds18b20 = require('ds18b20');
 
var interval = 3000; //enter the time between sensor queries here (in milliseconds)

exports.start = function () {
 
//when a client connects
socket.on("connect", function () {
	socket.on("stateChanged", function(data){
console.log("update");
});

    var sensorId = [];
    //fetch array containing each ds18b20 sensor's ID
    ds18b20.sensors(function (err, id) {
        sensorId = id;
        socket.emit("sensors", id); //send sensor ID's to clients
        console.log("Sensors" + id);
    });
 
    //initiate interval timer
    setInterval(function () {
        //loop through each sensor id
        sensorId.forEach(function (id) {
 
            ds18b20.temperature(id, function (err, value) {
                
                //send temperature reading out to connected clients
                socket.emit("temps", {"id": id, "value": value});
                console.log("temperature" + value + " id" + id);
 
            });
        });
 
    }, interval);
});
};
