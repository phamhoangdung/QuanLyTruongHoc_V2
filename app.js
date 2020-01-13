var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
var app = express();
//===================admin=================
var indexadmin = require('./routes/Admin/index');
var QLHocSinh = require('./routes/Admin/QLHocSinh.Route');
var QLLopHoc = require('./routes/Admin/QLLopHoc.Route');
var QLTaiKhoan = require('./routes/Admin/QLTaiKhoan.Route');

//===================admin=================


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
mongoose.connect('mongodb://localhost/QuanLyTruongHoc', { useNewUrlParser: true, useUnifiedTopology: true });
var MongoStore = require('connect-mongo')(session);
var db = mongoose.connection;

//===================auth==================

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  maxAge: new Date(Date.now() + 3600000), //1 Hour
  expires: new Date(Date.now() + 3600000), //1 Hour
  store: new MongoStore({ mongooseConnection: db })
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./auth/passport.Config')(passport);
require('./routes/Admin/Auth.Route')(app, passport);

// app.route('/login')
//   .get(function (req, res) {
//     console.log('auth ======> ' + req.isAuthenticated());
//     console.log('auth ======> ' + req.user);

//     res.render('Admin/LoginView', { title: 'login', message: req.flash('loginMessage') });
//   })
//   .post(passport.authenticate('local-login', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   }));

// app.get('/logout', function (req, res) {
//   req.logout();
//   res.redirect('/login');
// });


//==================!auth==================



//===================admin=================
app.use('/admin',isLoggedIn, indexadmin);
app.use('/qlhs', isLoggedIn ,QLHocSinh);
app.use('/qllh', QLLopHoc);
app.use('/qltk', QLTaiKhoan);
//==================!admin=================
function isLoggedIn(req, res, next) {
  // console.log(req.isAuthenticated());
  // console.log(req.user);
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
