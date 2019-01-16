/*var interval;
var Gpio = require('onoff').Gpio;
var sensor = new Gpio(12, 'in', 'both');
var value;

sensor.watch(function(err, val) {
    if (err) exit (err);
    value = !!val;
    console.log(value ? 'there is somone!' : 'not anymore!');
});

exports.start function () {
    
}*/

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cinek123",
    database: "SmartHome"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!")
});

var sql = ("SELECT temperature FROM `DHT11`");
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});
