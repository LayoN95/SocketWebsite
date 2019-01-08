exports.start = function() {

var socket = require('socket.io-client')('http://192.168.43.74:3000');
var dbResult;
var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "SmartHome",
	password: "raspberry",
	database: "SmartHome"
});

socket.on("dbRead", function(){
     var sql = ("SELECT temperature, humidity FROM `DHT11` ORDER BY id DESC LIMIT 1");
	con.query(sql, function(err, result) {
		if(err) throw err;
        socket.emit("dbResult", result);
        console.log("Object: " + result[temperature];
        //console.log(result);
}); 
});
};