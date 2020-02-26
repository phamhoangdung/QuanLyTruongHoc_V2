var GiaoVienModel = require('../models/GiaoVien');

async function selectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    try {
       var dataResult = await GiaoVienModel.find()
        .skip(parseInt(start))
        .limit(parseInt(length))
        .populate(Lop.tenLop, MonHoc.tenMonHoc);
        res.json(dataResult);
    }
    catch (err) {
        throw (err);
    }
}
function getByID(req, res) {
    GiaoVienModel.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.json(product);
    })
}
function create(req, res) {
    let GiaoVien = new GiaoVienModel({
        tenGiaoVien: req.body.tenGiaoVien,
        NgaySinh: req.body.NgaySinh,
        DiaChi: req.body.DiaChi,
    });
    GiaoVien.save((err) => {
        if (err) {
            throw (err);
        }
        res.json('GiaoVien insert successfully');
    })
}
function update(req, res) {
    console.log(req.params.id);
    GiaoVienModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) {
            console.log(err);
        }
        res.send('Product udpated.');
    });
}
function remove(req, res) {
    GiaoVienModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
}
module.exports = {
    selectAll: selectAll,
    getByID: getByID,
    create: create,
    update: update,
    remove: remove
}