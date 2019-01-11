exports.start = function() {

var socket = require('socket.io-client')('http://192.168.43.74:3000');

var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "SmartHome",
	password: "raspberry",
	database: "SmartHome"
});
    
    
socket.on("time", function(time){
    
    console.log(time.from);
})