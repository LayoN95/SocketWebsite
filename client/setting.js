exports.start = function() {

var socket = require('socket.io-client')('http://192.168.43.74:3000');

var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "SmartHome",
	password: "raspberry",
	database: "SmartHome"
});

    var from,to,date; 
    var dateTime = require('node-datetime');

    
socket.on("time", function(time){
    
    from = time.from;
    to = time.to;
    
    console.log(from, to);
    var sql = ("INSERT INTO `CONTROL` VALUES ('KITCHEN_LIGHT',"+from+","+to+")");
	con.query(sql, function(err, result) {
		if(err) throw err;
    });
    turnLightsOnOff(from, to);
   
    
});


function turnLightsOnOff(from, to){
 var interval = setInterval(function () {
    var dt = dateTime.create();
    var date = dt.format('H:M');    
        if (date >= from && date < to)
        {
            socket.emit("stateChanged", 1);
            {}
        } else {
            socket.emit("stateChanged", 0);
        }  
        console.log(date);
    }, 15000);  

}
    
};

