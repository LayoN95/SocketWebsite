var socket = require('socket.io-client')('http://192.168.43.74:3000');
var dbResult;
var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "SmartHome",
	password: "raspberry",
	database: "SmartHome"
});

socket.on("readDB", function(){
     var sql = ("SELECT temperature FROM `DHT11` ORDER BY id DESC LIMIT 10");
	con.query(sql, function(err, result) {
		if(err) throw err;
        socket.emit("dbResult", result);
        console.log(dbResult);
}); 
});