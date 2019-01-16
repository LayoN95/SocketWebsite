exports.start = function () {
    var socket = require('socket.io-client')('http://192.168.43.74:3000'),
        dht11 = require('node-dht-sensor');
    var temp, humid;
    var dbResult;


    //Polaczenie z baza danych
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "SmartHome",
        password: "raspberry",
        database: "SmartHome"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!")
    });


    //inicjalizacja czujnika DHT11
    dht11.initialize(11, 12);

    var interval = setInterval(function () {
        read();
    }, 60000);


    //Odczyt danych z DHT11
    function read() {
        var readout = dht11.read();
        //console.log("Temperatura: " + readout.temperature.toFixed(2) + "C " + "Wilgotnosc: " + readout.humidity.toFixed(2) + "%");
        temp = readout.temperature.toFixed(2);
        humid = readout.humidity.toFixed(2);
        socket.emit("dht11", {
            "temperature": readout.temperature.toFixed(2),
            "humidity": readout.humidity.toFixed(2)
        });
        sendDB();

    };

    socket.on("readDB", function () {
        var sql = ("SELECT temperature FROM `DHT11` ORDER BY id DESC LIMIT 10");
        con.query(sql, function (err, result) {
            if (err) throw err;
            socket.emit("dbResult", result);
            //console.log(dbResult);
        });
    });

    //Przeslanie danych do bazy
    function sendDB() {
        var dateTime = require('node-datetime');
        var dt = dateTime.create();
        var date = dt.format('Y-m-d H:M:S');
        //console.log(date.toString());
        var sql = ("INSERT INTO `DHT11` (id, temperature, humidity, date) VALUES (''," + temp + "," + humid + ",NOW())");
        con.query(sql, function (err, result) {
            if (err) throw err;
            //console.log("1 record inserted");
        });
    };



};
