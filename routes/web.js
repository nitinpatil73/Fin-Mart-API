var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/logs', function(req, res, next) {
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
//export the module
module.exports = router;
