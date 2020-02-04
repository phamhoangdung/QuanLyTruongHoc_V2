var express = require('express');
var router = express.Router();
var HocSinhController = require('../../controllers/QLHocSinh.Controller');
router.route('/')
.get((req,res,next)=>{
    res.render('Admin/QLHocSinhView',{user: req.user})
})
.post(HocSinhController.SelectAll);

router.put('/:id/update', HocSinhController.Update);

router.delete('/:id/remove', HocSinhController.Remove);

router.post('/create', HocSinhController.Create);

module.exports = router;