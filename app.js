var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var expressLayouts = require('express-ejs-layouts');
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
var cors = require('cors')
//===================admin=================
var indexadmin = require('./routes/Admin/Index.Route');
var QLHocSinh = require('./routes/Admin/QLHocSinh.Route');
var QLLopHoc = require('./routes/Admin/QLLopHoc.Route');
var QLTaiKhoan = require('./routes/Admin/QLTaiKhoan.Route');
var QLMonHoc = require('./routes/Admin/QLMonHoc.Route');
var QLHocKy = require('./routes/Admin/QLHocKy.Route');
var QLGiaoVien = require('./routes/Admin/QLGiaoVien.Route');
var QLGiaoVienDayLop = require('./routes/Admin/QLGiaoVienDayLop.Route');
var QLDiem = require('./routes/Admin/QLDiem.Route');
var acl = require('./config/ACL.Config');

//===================!admin=================

//===================api=================
var indexapi = require('./routes/api/Index.Route');
var QLHocSinhapi = require('./routes/api/QLHocSinh.Route');
var QLLopHocapi = require('./routes/api/QLLopHoc.Route');
var QLTaiKhoanapi = require('./routes/api/QLTaiKhoan.Route');
var QLMonHocapi = require('./routes/api/QLMonHoc.Route');
var QLHocKyapi = require('./routes/api/QLHocKy.Route');
var QLGiaoVienapi = require('./routes/api/QLGiaoVien.Route');
var QLGiaoVienDayLopapi = require('./routes/api/QLGiaoVienDayLop.Route');
var QLDiemapi = require('./routes/api/QLDiem.Route');
var AuthenticationController = require('./controllers/auth.Controller');
//===================!api=================

// view engine setup
// app.use(expressLayouts);
app.use(cors())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
//mongoose.connect('mongodb://localhost/QuanLyTruongHoc', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://ahtuser:Admin1324@quanlytruonghoc-urj1l.mongodb.net/QuanLyTruongHoc?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then((res)=>{
  console.log(">> connect success");
}).catch((err)=>{
  console.log(err);
});

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
app.use('/admin', isLoggedIn, indexadmin);
app.use('/qlhs', isLoggedIn,AuthenticationController.roleAuthorization(['admin','teacher']), QLHocSinh);
app.use('/qllh', isLoggedIn,AuthenticationController.roleAuthorization(['admin']), QLLopHoc);
app.use('/qltk', isLoggedIn,AuthenticationController.roleAuthorization(['admin']), QLTaiKhoan);
app.use('/qlmh', isLoggedIn,AuthenticationController.roleAuthorization(['admin']), QLMonHoc);
app.use('/qlhk', isLoggedIn,AuthenticationController.roleAuthorization(['admin']), QLHocKy);
app.use('/qlgv', isLoggedIn,AuthenticationController.roleAuthorization(['admin']), QLGiaoVien);
app.use('/qlgvdl', isLoggedIn,AuthenticationController.roleAuthorization(['admin']), QLGiaoVienDayLop);
app.use('/qld', isLoggedIn,AuthenticationController.roleAuthorization(['admin','teacher']), QLDiem);
//==================!admin=================
  
//===================api=================
app.use('/api',indexapi);
app.use('/api/qlhs',QLHocSinhapi);
app.use('/api/qllh', QLLopHocapi);
app.use('/api/qltk', QLTaiKhoanapi);
app.use('/api/qlmh', QLMonHocapi);
app.use('/api/qlhk', QLHocKyapi);
app.use('/api/qlgv', QLGiaoVienapi);
app.use('/api/qlgvdl', QLGiaoVienDayLopapi);
app.use('/api/qld',  QLDiemapi);
//==================!admin=================

function isLoggedIn(req, res, next) {
  // console.log(req.isAuthenticated());
  // console.log(req.user);
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}
function getusername(req) {
  console.log(req.user.username);
  return req.user.username; // (yaoming) just for fun
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
