var express = require('express');
var router = express.Router();
var HocSinhCotroller = require('../../controllers/QLHocSinh.Controller');
router.route('/')
.get((req,res,next)=>{
    res.render('Admin/QLHocSinhView',{user: req.user})
})
.post(HocSinhCotroller.SelectAll);

router.put('/:id/update', HocSinhCotroller.Update);

router.delete('/:id/remove', HocSinhCotroller.Remove);

router.post('/create', HocSinhCotroller.Create);

module.exports = router;