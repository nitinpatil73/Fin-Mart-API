var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/authenticate', function(req, res, next) {
  console.log(req);
  res.end('Creating');
});
module.exports = router;
