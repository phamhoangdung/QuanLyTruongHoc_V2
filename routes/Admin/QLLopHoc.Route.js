var express = require('express');
var router = express.Router();
var LopHoc = require('../../models/Lop');
router.route('/')
.get((req,res,next)=>{
    res.render('Admin/QLLopHocView',{user: req.user});
})
.post((req,res,next)=>{
    try{
        LopHoc.find({},(err,result)=>{
            if(err)
            res.json(err);
            res.json(result);
        })
    }catch(err){
        res.json(err);
    }
})
module.exports = router;