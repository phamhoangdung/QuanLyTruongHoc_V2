var express = require('express');
var router = express.Router();
var MonHoc = require('../../controllers/QLMonHoc.Controller');
router.route('/').post(MonHoc.selectAll);

router.put('/:id/update', MonHoc.update);

router.delete('/:id/remove', MonHoc.remove);

router.post('/create', MonHoc.create);

module.exports = router;