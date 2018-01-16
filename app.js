var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var web = require('./routes/web');
var users = require('./routes/users');
var api = require('./routes/api');
var app = express();
// view engine setup
// var phpExpress = require('php-express')({
//   binPath: 'php'
// });
 
// set view engine to php-express
app.set('views', './views');
// app.engine('php', phpExpress.engine);
app.set('view engine', 'jade');
 
// routing all .php file to php-express
//app.all(/.+\.php$/, phpExpress.router);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/icon', '1.png')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', web);
app.use('/users', users);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
