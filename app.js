var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fileUpload = require('express-fileupload');


var index = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var signin = require('./routes/signin');
var stores = require('./routes/stores');
var product = require('./routes/product');
var products = require('./routes/products');
var checkout = require('./routes/checkout');
var signout = require('./routes/signout');
var unknownp = require('./routes/unknownp');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'chibujax' }));
app.use(fileUpload());

app.use('/', index);
app.use('/users', users);
app.use('/signup', signup);
app.use('/signin', signin);
app.use('/stores', stores);
app.use('/product', product);
app.use('/products', products);
app.use('/checkout', checkout);
app.use('/signout', signout);
app.use('*', unknownp);

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
