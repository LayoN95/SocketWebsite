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

    
socket.on("time", function(time){
    var date = dt.format('H:M');
    
    console.log(date);

    from = time.from;
    to = time.to;
    console.log(from, to);
});
};

