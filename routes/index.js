var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('layout');
});

router.get('/request', function(req, res) {
  res.render('request', {});
});

module.exports = router;
