var express = require('express');
var router = express.Router();
var LopHoc = require('../../controllers/QLLopHoc.Controller');
var acl = require('../../config/ACL.Config');

router.route('/').post(LopHoc.selectAll);

router.put('/:id/update', LopHoc.update);

// router.delete('/:id/remove', LopHoc.remove);

router.post('/create', LopHoc.create);

router.get('/user', (req, res) => {
    acl.userRoles(getusername(req), (err, roles) => {
        res.json(roles);
    })
});

function getusername(req) {
    console.log(req.user.username);
    return req.user.username; // (yaoming) just for fun
}

module.exports = router;