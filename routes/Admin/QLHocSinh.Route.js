var express = require('express');
var router = express.Router();
var HocSinhCotroller = require('../../controllers/QLHocSinh.Controller');
router.route('/')
.get((req,res,next)=>{
    res.render('Admin/QLHocSinhView',{user: req.user})
})
.post(HocSinhCotroller.SelectAll);

router.put('/:id/update', HocSinhCotroller.Update);

router.delete('/:id/delete', HocSinhCotroller.Delete);

router.post('/insert', HocSinhCotroller.Insert);

module.exports = router;