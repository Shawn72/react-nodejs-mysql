
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/html-routes');
// var usersRouter = require('./routes/message-api-routes');

var app = express();
const server = require('http').createServer(app);
// const io = require('socket.io')(server);
const mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//connect to MySQL
const connection = mysql.createConnection({
host: 'localhost',
user:'root',
password:'root',//password of your mysql db
database:'waytecinventory'
});

connection.connect(function(err){
(err)? console.log(err+'+++++++++++++++///// Error connecting /////+++++++++++++++'): console.log('********connection established to MySQL********');
});


// require('./sockets/message-sockets')(io, connection);
require('./routes/html-routes')(app, connection);
require('./routes/message-api-routes')(app, connection);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

