var config = require("./config.js");
var socket = require("socket.io-client")("http://192.168.1.112:3000");
var Gpio = require('onoff').Gpio;
var LED = new Gpio(22, 'out');


exports.start = function() {
process.on("SIGINT", function(){
 
  
      process.exit();
  

});

socket.on("connect", function(){
  console.log("Connected to server");
  socket.on("updateState", function(state){
    console.log("The new state is: " + state);
   if(state == true){
   LED.writeSync(1);
   } else {
	LED.writeSync(0);
	}
  });
})
};
