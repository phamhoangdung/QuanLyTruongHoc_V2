var express = require('express');
var router = express.Router();
var HocKyController = require('../../controllers/QLHocKy.Controller');
var LopModel = require('../../models/Lop');
router.route('/')
    .get(async (req, res, next) => {
        var Lop = await LopModel.find();
        res.render('Admin/QLHocSinhView', { user: req.user, Lop: Lop })
    })
    .post(HocKyController.SelectAll);

router.put('/:id/update', HocKyController.Update);

router.delete('/:id/delete', HocKyController.Delete);

router.post('/create', HocKyController.Insert);

module.exports = router;