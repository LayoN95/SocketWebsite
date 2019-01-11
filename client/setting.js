exports.start = function() {

var socket = require('socket.io-client')('http://192.168.43.74:3000');

var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "SmartHome",
	password: "raspberry",
	database: "SmartHome"
});

    var from,to; 
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var date = dt.format('H:M');
    
socket.on("time", function(time){
    

    
    console.log(date);

    from = time.from;
    to = time.to;
    console.log(from, to);
});
};

