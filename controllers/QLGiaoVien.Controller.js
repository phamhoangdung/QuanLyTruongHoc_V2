var GiaoVienModel = require('../models/GiaoVien');

async function selectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    var total = await GiaoVienModel.count();
    try {
       var dataResult = await GiaoVienModel.find()
        .skip(parseInt(start))
        .limit(parseInt(length))
        .populate('MonHoc_idMonHoc')
        .populate('Lop_idLop')
        .exec();
        // res.json(dataResult);
        return res.json({ "recordsTotal": dataResult.length, "recordsFiltered": total, "data": dataResult, "draw": req.body.draw });
        
    }
    catch (err) {
        return res.json({ err: 1, msg: err });
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
    
    console.log(GiaoVien);
    GiaoVien.save((err) => {
        if (err) {
            console.log(err);
            
            return res.json({ err: 1, msg: err });
        }
        return res.json({ err: 0, msg: "thêm bản ghi mới thành công!"});
    })
}
function update(req, res) {
    console.log(req.params.id);
    GiaoVienModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) {
            return res.json({err: 1, msg: err});
        }
        return res.json({err: 0, msg: "Cập nhập bản ghi thành công !"})
    });
}
function remove(req, res) {
    GiaoVienModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.json({ err: 1, msg: err});
        return res.json({ err: 0, msg: "Xoá bản ghi thành công !"});
    })
}
module.exports = {
    selectAll: selectAll,
    getByID: getByID,
    create: create,
    update: update,
    remove: remove
}