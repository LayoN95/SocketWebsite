var express = require('express');
var router = express.Router();

router.get('/dht11', function(req, res, next) {
	res.render('dht-11', {title: 'Express' });
});
module.export = router;
