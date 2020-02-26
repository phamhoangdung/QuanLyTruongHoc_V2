var express = require('express');
var router = express.Router();
var DiemController = require('../../controllers/QLDiem.Controller');
var MonHoc = require('../../models/MonHoc');
var Lop = require('../../models/Lop');

router.route('/')
    .get(async (req, res, next) => {
        res.render('Admin/QLDiem_GVView', {
            user: req.user,
            MonHoc: await MonHoc.find().select(["_id","tenMonHoc"]),
            Lop: await Lop.find().select(["_id", "tenLop"])
        })
    })
    .post(DiemController.selectAll);

router.put('/:id/update', DiemController.update);

router.delete('/:id/remove', DiemController.remove);

router.post('/create', DiemController.create);

router.post('/autocreate', DiemController.autoCreate);

module.exports = router;