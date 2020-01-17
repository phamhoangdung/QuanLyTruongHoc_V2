var express = require('express');
var router = express.Router();
var HocKyController = require('../../controllers/QLHocKy.Controller');
router.route('/')
.get((req,res,next)=>{
    res.render('Admin/QLHocSinhView',{user: req.user})
})
.post(HocKyController.SelectAll);

router.put('/:id/update', HocKyController.Update);

router.delete('/:id/delete', HocKyController.Delete);

router.post('/create', HocKyController.Insert);

module.exports = router;