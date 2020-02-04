var express = require('express');
var router = express.Router();
var GiaoVienController = require('../../controllers/QLGiaoVien.Controller');
router.route('/')
.get((req,res,next)=>{
    res.render('Admin/QLGiaoVienView',{user: req.user})
})
.post(GiaoVienController.selectAll);

router.put('/:id/update', GiaoVienController.update);

router.delete('/:id/remove', GiaoVienController.remove);

router.post('/create', GiaoVienController.create);

module.exports = router;