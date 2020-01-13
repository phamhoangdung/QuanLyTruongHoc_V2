var express = require('express');
var router = express.Router();
var HocSinh = require('../controllers/QLHocSinh.Controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(HocSinh.SelectAll());
  console.log('index ======> '+req.isAuthenticated());
  console.log('index ======> '+req.user);
  
  res.render('index', { title: 'Express'});
});

module.exports = router;
