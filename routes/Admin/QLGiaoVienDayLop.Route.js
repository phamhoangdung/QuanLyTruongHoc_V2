var express = require('express');
var router = express.Router();
var GiaoVienDayLopController = require('../../controllers/QLGiaoVienDayLop.Controller');
router.route('/')
.get((req,res,next)=>{
    res.render('Admin/QLGiaoVienDayLopView',{user: req.user})
})
.post(GiaoVienDayLopController.selectAll);

router.put('/:id/update', GiaoVienDayLopController.update);

router.delete('/:id/remove', GiaoVienDayLopController.remove);

router.post('/create', GiaoVienDayLopController.create);

module.exports = router;