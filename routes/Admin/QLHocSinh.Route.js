var express = require('express');
var router = express.Router();
var HocSinhController = require('../../controllers/QLHocSinh.Controller');
router.route('/')
.get((req,res,next)=>{
    res.render('Admin/QLHocSinhView',{user: req.user})
})
.post(HocSinhController.SelectAll);

router.put('/:id/update', HocSinhController.Update);

router.delete('/:id/remove', HocSinhCotroller.Remove);

router.post('/create', HocSinhCotroller.Create);

module.exports = router;