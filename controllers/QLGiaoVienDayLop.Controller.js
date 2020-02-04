var GiaoVienDayLopModel = require('../models/GiaoVienDayLop');

function selectAll(req,res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    try {
        GiaoVienDayLopModel.find({}, (err, result) => {
            if (err)
                throw (err);
            res.json(result);
        }).skip(parseInt(start)).limit(parseInt(length));
    }
    catch (err) {
        throw (err);
    }
}
function getByID(req,res) {
    GiaoVienDayLopModel.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.json(product);
    })
}
function create(req,res) {  
    let GiaoVienDayLop = new GiaoVienDayLopModel({
        Lop_idLop: req.body.Lop_idLop,
        GiaoVien_idGiaoVien: req.body.GiaoVien_idGiaoVien,
        
    });
    GiaoVienDayLop.save((err) => {
        if (err) {
            throw (err);
        }
        res.json('GiaoVien insert successfully');
    })
}
function update(req,res) {  
    console.log(req.params.id);
    GiaoVienDayLopModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) {
            console.log(err);
        }
        res.send('Product udpated.');
    });
}
function remove(req,res) {  
    GiaoVienDayLopModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
}
module.exports = {
    selectAll : selectAll,
    getByID : getByID,
    create : create,
    update : update,
    remove : remove
}