exports.start = function () {

    var socket = require('socket.io-client')('http://192.168.43.74:3000');

    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "SmartHome",
        password: "raspberry",
        database: "SmartHome"
    });

    var kitchen_from, kitchen_to, outdoor_from, outdoor_to, floor_from, floor_to, date;
    var dateTime = require('node-datetime');


    socket.on("time", function (time) {

        kitchen_from = time.kitchen_from;
        kitchen_to = time.kitchen_to;
        outdoor_from = time.outdoor_from;
        outdoor_to = time.outdoor_to;
        floor_from = time.floor_from;
        floor_to = time.floor_to;

        var kitchen_light = 0;
        var outdoor_light = 1;
        var floor_light = 2;

        console.log(kitchen_from, kitchen_to);


        //INSERT DO BAZY
        //var sql = 	("INSERT INTO `CONTROL` VALUES ('LIGHT','"+from+"','"+to+"')");

        //UPDATE WARTOŚCI W BAZIE DANYCH
        var Kitchen = ("UPDATE `CONTROL` SET `FROM` = '" + kitchen_from + "', `TO` = '" + kitchen_to + "' WHERE `DEVICE`='KITCHEN_LIGHT'");
        con.query(Kitchen, function (err, result) {
            if (err) throw err;
        });

        var Outdoor = ("UPDATE `CONTROL` SET `FROM` = '" + outdoor_from + "', `TO` = '" + outdoor_to + "' WHERE `DEVICE`='OUTDOOR_LIGHT'");
        con.query(Outdoor, function (err, result) {
            if (err) throw err;
        });

        var Floor = ("UPDATE `CONTROL` SET `FROM` = '" + floor_from + "', `TO` = '" + floor_to + "' WHERE `DEVICE`='FLOOR_LIGHT'");
        con.query(Floor, function (err, result) {
            if (err) throw err;
        });
        turnLightsOnOff(kitchen_from, kitchen_to);
        turnOutdoorLightsOnOff(outdoor_from, outdoor_to);

        //turnLightsOnOff(outdoor_from, outdoor_to);



    });


    function turnLightsOnOff(from, to) {
        var interval = setInterval(function () {
            var dt = dateTime.create();
            var date = dt.format('H:M');

                    if (date >= from && date < to) {
                        socket.emit("stateChanged", 1);

                    } else {
                        socket.emit("stateChanged", 0);
                        if (date >= to) {
                            socket.emit("stateChanged", 0); //Chyba
                            clearInterval(interval);
                            console.log("zakonczenie petli");
                        }
                    }

            console.log(date);
        }, 15000);

    }

        function turnOutdoorLightsOnOff(from, to) {
        var interval = setInterval(function () {
            var dt = dateTime.create();
            var date = dt.format('H:M');

                    if (date >= from && date < to) {
                        socket.emit("outdoorLightChanged", 1);
                        console.log("outdoor ON");

                    } else {
                        socket.emit("outdoorLightChanged", 0);
                        if (date >= to) {
                            socket.emit("outdoorLightChanged", 0); //Chyba
                            clearInterval(interval);
                            console.log("zakonczenie petli");
                        }
                    }

            console.log(date);
        }, 15000);

    }

};
