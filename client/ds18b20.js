
var socket = require('socket.io-client')('http://192.168.43.74:3000'),
    ds18b20 = require('ds18b20');

var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "SmartHome",
	password: "raspberry",
	database: "SmartHome"
});

var interval = 60000;

exports.start = function () {
 
socket.on("connect", function () {
	
    var sensorId = [];
    //pobranie id sensorów
    ds18b20.sensors(function (err, id) {
        sensorId = id;
        socket.emit("sensors", id); //send sensor ID's to clients
        //console.log("Sensors" + id);
    });
 
    setInterval(function () {
        
        sensorId.forEach(function (id) {
 
            ds18b20.temperature(id, function (err, value) {
                   var sql = ("INSERT INTO `DS18B20` (id, temperature, date) VALUES ('',"+value+","",NOW())");
	               con.query(sql, function(err, result) {
                   if(err) throw err;
	         	   //console.log("1 record inserted");
                   });
                //przesłanie odczytów temperatury
                socket.emit("temps", {"id": id, "value": value});
                //console.log("temperature" + value + " id" + id);
 
            });
        });
 
    }, interval);
});
};
