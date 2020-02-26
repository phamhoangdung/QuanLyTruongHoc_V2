var express = require('express');
var router = express.Router();
var DiemController = require('../../controllers/QLDiem.Controller');
var MonHoc = require('../../models/MonHoc');
var Lop = require('../../models/Lop');

router.route('/').post(DiemController.selectAll);

router.put('/:id/update', DiemController.update);

router.delete('/:id/remove', DiemController.remove);

router.post('/create', DiemController.create);

router.post('/autocreate', DiemController.autoCreate);

module.exports = router;