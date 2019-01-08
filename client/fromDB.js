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
    
var dht11_result, light_result;

socket.on("dbRead", function(){
     var DHT11 = ("SELECT temperature, humidity FROM `DHT11` ORDER BY id DESC LIMIT 1");
	 con.query(DHT11, function(err, result) {
		if(err) throw err;
        dht11_result = result;
}); 
    var LIGHT = ("SELECT * FROM `LIGHTING`");
	con.query(LIGHT, function(err, result) {
		if(err) throw err;
        //socket.emit("dbResult", result);

}); 
    //socket.emit("dbResult", {"light": light_result, "dht11": dht11_result});
            socket.emit("dbResult", {"dht11": dht11_result});

});
};