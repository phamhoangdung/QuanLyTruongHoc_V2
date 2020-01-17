var express = require('express');
var router = express.Router();
var LopHoc = require('../../controllers/QLLopHoc.Controller');
router.route('/')
.get((req,res,next)=>{
    res.render('Admin/QLLopHocView',{user: req.user});
})
.post(LopHoc.selectAll);

router.put('/:id/update', LopHoc.update);

router.delete('/:id/remove', LopHoc.remove);

router.post('/create', LopHoc.create);

module.exports = router;