var GiaoVienModel = require('../models/GiaoVien');

async function selectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    var total = await GiaoVienModel.count();
    try {
       var dataResult = await GiaoVienModel.find()
        .skip(parseInt(start))
        .limit(parseInt(length))
        .populate({path:'MonHoc_tenMonHoc'})
        .populate({path:'Lop_tenLop'})
        .exec();
        // res.json(dataResult);
        res.json({ "recordsTotal": dataResult.length, "recordsFiltered": total, "data": dataResult, "draw": req.body.draw });
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
        ngaySinh: req.body.ngaySinh,
        diaChi: req.body.diaChi,
        MonHoc_idMonHoc : req.body.MonHoc_idMonHoc,
        Lop_idLop : req.body.Lop_idLop,
    });
    console.log(GiaoVien);
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