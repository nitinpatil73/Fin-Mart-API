var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/nihon', function(req, res, next) {
	res.render('medsave');
  
});
router.get('/tatacapital-pl', function(req, res, next) {
	res.render('tatacapital-pl');
  
});
router.get('/kotak-personal-loan-dc', function(req, res, next) {
	res.render('kotak-personal-loan-dc');
  
});
router.get('/rbl-personal-loan', function(req, res, next) {
	res.render('rbl-personal-loan-dc');
  
});

router.get('/apply-iifl-loan', function(req, res, next) {
	res.render('apply-iifl-loan-dc');
  
});


router.get('/log-1', function(req, res, next) {
const fs = require('fs');

fs.readFile('./log/exceptions.log', (err, data) => {  
    if (err) throw err;
    let badJSON=data.toString();
    var fixedJSON = badJSON

	// Replace ":" with "@colon@" if it's between double-quotes
	.replace(/:\s*"([^"]*)"/g, function(match, p1) {
		return ': "' + p1.replace(/:/g, '@colon@') + '"';
	})

	// Replace ":" with "@colon@" if it's between single-quotes
	.replace(/:\s*'([^']*)'/g, function(match, p1) {
		return ': "' + p1.replace(/:/g, '@colon@') + '"';
	})

	// Add double-quotes around any tokens before the remaining ":"
	.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

	// Turn "@colon@" back into ":"
	.replace(/@colon@/g, ':')
;
    console.log(fixedJSON);
    res.render('show-logs', { data: fixedJSON });
});
});
router.get('/log-2', function(req, res, next) {
const fs = require('fs');

fs.readFile('./log/error.log', (err, data) => {  
    if (err) throw err;
    let badJSON=data.toString();
    var fixedJSON = badJSON

	// Replace ":" with "@colon@" if it's between double-quotes
	.replace(/:\s*"([^"]*)"/g, function(match, p1) {
		return ': "' + p1.replace(/:/g, '@colon@') + '"';
	})

	// Replace ":" with "@colon@" if it's between single-quotes
	.replace(/:\s*'([^']*)'/g, function(match, p1) {
		return ': "' + p1.replace(/:/g, '@colon@') + '"';
	})

	// Add double-quotes around any tokens before the remaining ":"
	.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

	// Turn "@colon@" back into ":"
	.replace(/@colon@/g, ':')
;
    //console.log(fixedJSON);
    res.render('show-logs', { data: fixedJSON });
});
});
//export the module
module.exports = router;
