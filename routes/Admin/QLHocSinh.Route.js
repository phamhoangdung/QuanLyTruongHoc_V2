var express = require('express');
var router = express.Router();
var HocSinhController = require('../../controllers/QLHocSinh.Controller');
router.route('/')
.get((req,res,next)=>{
    res.render('Admin/QLHocSinhView',{user: req.user})
})
.post(HocSinhController.SelectAll);

router.put('/:id/update', HocSinhController.Update);

router.delete('/:id/delete', HocSinhController.Delete);

router.post('/insert', HocSinhController.Insert);

module.exports = router;