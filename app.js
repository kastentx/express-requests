var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);
app.use('/users', users);

app.get('/search', function(req, res) {
  console.log(req.query)
  res.end(JSON.stringify(req.query)+'\n')
})
app.get('/params/:role/:name/:status', function(req, res) {
  console.log(req.params)
  console.log(req.route)
  res.end()
})

app.post('/body', function(req, res) {
  console.log(req.body)
  res.end(JSON.stringify(req.body)+'\n')
})
app.post('/upload', upload.single('archive'), function(req, res) {
  console.log(req.file)
  // read path
  // process data
  // save processed data
  res.end()
})

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
// PORT
app.listen(3000)
module.exports = app;
