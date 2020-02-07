var express = require('express');
var router = express.Router();
var HocSinhController = require('../../controllers/QLHocSinh.Controller');
var Lopmodel = require('../../models/Lop');
router.route('/')
.get(async(req,res,next)=>{
    var lop = await Lopmodel.find();
    res.render('Admin/QLHocSinhView',{user: req.user,Lop:lop})
})
.post(HocSinhController.SelectByID);

router.put('/:id/update', HocSinhController.Update);

router.delete('/:id/remove', HocSinhController.Remove);

router.post('/create', HocSinhController.Create);

module.exports = router;