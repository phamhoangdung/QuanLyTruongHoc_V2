var express = require('express');
var router = express.Router();

router.route('/')
.get((req,res,next)=>{
    res.render('./api/index')
})

module.exports = router;