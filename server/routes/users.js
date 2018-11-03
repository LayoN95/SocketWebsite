var express = require('express');
var router = express.Router();

function randomInt (low, high) {
return Math.floor(Math.random() * (high - low) + low);
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource!')	
});

module.exports = router;
