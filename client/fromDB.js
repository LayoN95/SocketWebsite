exports.start = function () {

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


    socket.on("dbRead", function () {
        var DHT11 = ("SELECT temperature, humidity, date FROM `DHT11` ORDER BY id DESC LIMIT 10");
        con.query(DHT11, function (err, result) {
            if (err) throw err;
            socket.emit("dbResult", result);
        });
        var LIGHT = ("SELECT * FROM `LIGHTING`");
        con.query(LIGHT, function (err, result) {
            if (err) throw err;
            socket.emit("lightResult", result);



        });
        //socket.emit("dbResult", {"light": light_result, "dht11": dht11_result});

    });

    //POBRANIE DANYCH Z TABELI CONTROL NA POTRZEBY STEROWANIA URZĄDZENIAMI
    socket.on("getTime", function () {
        var CONTROL = ("SELECT `DEVICE`, `FROM`, `TO`, `ACTIVE` FROM `CONTROL`");
        con.query(CONTROL, function (err, result) {
            if (err) throw err;
            socket.emit("dbResult", result);
            console.log(result[0].DEVICE);
            console.log(result[0].FROM);
            console.log(result[0].TO);
            console.log(result[0].ACTIVE);
        });
    });
};
