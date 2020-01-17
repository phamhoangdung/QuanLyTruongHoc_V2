var express = require('express');
var router = express.Router();
var MonHoc = require('../../controllers/QLMonHoc.Controller');
var HocKy = require('../../models/HocKy');
router.route('/')
    .get(async (req, res, next) => {
        var hocky = await HocKy.find({}, (err, resutl) => {
            return resutl;
        })
        console.log("-----"+hocky);
        
        res.render('Admin/QLMonHocView', { user: req.user, hocky: hocky });
    })
    .post(MonHoc.selectAll);

router.put('/:id/update', MonHoc.update);

router.delete('/:id/remove', MonHoc.remove);

router.post('/create', MonHoc.create);

module.exports = router;