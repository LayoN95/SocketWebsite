exports.start = function() {

var socket = require('socket.io-client')('http://192.168.43.74:3000');

var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "SmartHome",
	password: "raspberry",
	database: "SmartHome"
});

    var kitchen_from,kitchen_to,outdoor_from,outdoor_to,floor_from,floor_to,date;
    var dateTime = require('node-datetime');


socket.on("time", function(time){

    kitchen_from = time.kitchen_from;
    kitchen_to = time.kitchen_to;
	
	console.log(kitchen_from, kitchen_to);
	
	//INSERT DO BAZY
    //var sql = 	("INSERT INTO `CONTROL` VALUES ('LIGHT','"+from+"','"+to+"')");
	
    //UPDATE WARTOŚCI W BAZIE DANYCH 
	var sql = ("UPDATE `CONTROL` SET `FROM` = '"+kitchen_from+"', `TO` = '"+kitchen_to+"' WHERE `DEVICE`='KITCHEN_LIGHT'");
    con.query(sql, function(err, result) {
		if(err) throw err;
    });
    turnLightsOnOff(kitchen_from, kitchen_to);


});


function turnLightsOnOff(from, to){
 var interval = setInterval(function () {
    var dt = dateTime.create();
    var date = dt.format('H:M');
        if (date >= from && date < to)
        {
            socket.emit("stateChanged", 1);
            
        } else {
            socket.emit("stateChanged", 0);
            if (date >= to) {
                clearInterval(interval);   
                console.log("zakonczenie petli");
            }
            
        }
        console.log(date);
    }, 15000);

}

};
