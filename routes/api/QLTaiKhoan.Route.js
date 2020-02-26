var express = require('express');
var router = express.Router();
var taikhoan = require('../../controllers/QLTaiKhoan.Controller');
router.route('/').post(taikhoan.selectAll);

router.put('/:id/update', taikhoan.update);

router.delete('/:id/delete', taikhoan.remove);

router.post('/create', taikhoan.create);

module.exports = router;