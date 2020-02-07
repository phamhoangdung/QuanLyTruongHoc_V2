var express = require('express');
var router = express.Router();
var DiemController = require('../../controllers/QLDiem.Controller');
router.route('/')
.get((req,res,next)=>{
    res.render('Admin/QLGiaoVienDayLopView',{user: req.user})
})
.post(DiemController.selectAll);

router.put('/:id/update', DiemController.update);

router.delete('/:id/remove', DiemController.remove);

router.post('/create', DiemController.create);

module.exports = router;