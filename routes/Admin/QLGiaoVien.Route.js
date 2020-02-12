var express = require('express');
var router = express.Router();
var GiaoVienController = require('../../controllers/QLGiaoVien.Controller');
var Lop = require('../../models/Lop');
var MonHoc = require('../../models/MonHoc');

router.route('/')
.get(async (req, res, next) => {
    var lop = await Lop.find({}, (err, resutl) => {
        return resutl;
    })
    var monHoc = await MonHoc.find({},(err,result) =>{
        return result;
    })
    res.render('Admin/QLGiaoVienView', { user: req.user, lop : lop , monHoc : monHoc});
})
.post(GiaoVienController.selectAll);

router.put('/:id/update', GiaoVienController.update);

router.delete('/:id/remove', GiaoVienController.remove);

router.post('/create', GiaoVienController.create);

module.exports = router;