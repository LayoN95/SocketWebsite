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
 var from,to; 
    from = time.from;
    to = time.to;
    console.log(from, to);
});
};