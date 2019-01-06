var config = require("./config.js");
var socket = require("socket.io-client")("http://192.168.43.74:3000");
var Gpio = require('onoff').Gpio;
var LED = new Gpio(22, 'out');
var Kitchen_LED = new Gpio(22, 'out');
var Bathroom_LED = new Gpio(22, 'out');

exports.start = function() {
process.on("SIGINT", function(){
 
  
      process.exit();
  

});
    
socket.on("connect", function(){
  console.log("Connected to server");
    
  socket.on("updateState", function(state){
    //console.log("The new state is: " + state);
   if(state == true){
   Kitchen_LED.writeSync(1);
   } else {
	Kitchen_LED.writeSync(0);
	}
  });
    
        
  socket.on("bathroomState", function(state){
    //console.log("The new state is: " + state);
   if(state == true){
   Bathroom_LED.writeSync(1);
   } else {
	Bathroom_LED.writeSync(0);
	}
  });

})
};
