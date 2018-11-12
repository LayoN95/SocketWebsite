var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "SmartHome",
	password: "raspberry",
	database: "SmartHome"
});

exports.start = function() {con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!")
});
}