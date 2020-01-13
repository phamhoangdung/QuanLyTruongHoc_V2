var express = require('express');
var router = express.Router();

router.route('/')
.get((req,res,next)=>{
    console.log(req.isAuthenticated());
    console.log(req.user);
    res.render('Admin/index',{user: req.user})
})

module.exports = router;