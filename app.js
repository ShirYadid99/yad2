var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
 var apiRouter = require('./routes/api');
 var addRouter = require('./routes/add');
 var adminRouter = require('./routes/admin');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//enable sessions
app.use(session({
    // isAdmin: false,
    secret:"somesecretkey",
    resave: false, // Force save of session for each request
    saveUninitialized: false, // Save a session that is new, but has not been modified
    cookie: {maxAge: 10*60*1000 }// milliseconds!
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/api', apiRouter);
app.use('/add', addRouter);
app.use('/admin', adminRouter);

//  here
const db = require('./models/index');
// db.sequelize.sync().then(() => {
//   console.log('Database Synced');
// }).catch((err) => {
//   console.log('Error syncing database');
//   console.log(err);
// });




// const db = require('./models/index');
// create the tables if don't exist

db.sequelize.sync()
    .then(() => {
      console.log('Database Synced');
      // First create admin user
      return db.User.findOrCreate({
        where: {login: 'admin'},
        defaults: {login: 'admin', password: 'admin'}
      });
    })
    .then(() => {
      // Then create admin2 user
      return db.User.findOrCreate({
        where: {login: 'admin2'},
        defaults: {login: 'admin2', password: 'admin2'}
      });
    })
    .then(() => {
      console.log('Admin users created');
    })
    .catch((err) => {
      console.log('Error syncing database or creating admin users');
      console.log(err);
    });


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
