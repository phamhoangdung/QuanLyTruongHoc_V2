var GiaoVienModel = require('../models/GiaoVien');
var MonHoc = require('../models/MonHoc');
var Lop = require('../models/Lop');
var HoocSinh = require('../models/HocSinh');

async function selectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    var MonHoc = req.body.MonHoc_idMonHoc;
    var Lop = req.body.Lop_idLop;
    var total = await GiaoVienModel.count((err, result)=> {
        return result;
    });
    try {
        if (MonHoc != 1 && Lop != 1) {
            GiaoVienModel.find()
                .skip(parseInt(start))
                .limit(parseInt(length))
                .populate({ path: 'Lop_idLop'})
                .populate({ path: 'MonHoc_idMonHoc', match: { _id: MonHoc } })
                // .where({Lop_idLop: req.body.Lop_idLop, MonHoc_idMonHoc: req.body.MonHoc_idMonHoc})
                .exec((err, result) => {
                    if (err)
                        res.json({ err: 1, msg: err });
                    var data = [];
                    // console.log(result);

                    result.map((e, i) => {
                        if (e.Lop_idLop != null && e.MonHoc_idMonHoc != null)
                            data.push(e);
                    })
                    // console.log(data);

                    res.json({ "recordsTotal": data.length, "recordsFiltered": total, "data": data, "draw": req.body.draw });
                })
        }
        else {
            res.json({ data: [] })
        }
        
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
    console.log(req.body);
    let GiaoVien = new GiaoVienModel({
        ho: req.body.ho,
        ten: req.body.ten,
        ngaySinh: req.body.ngaySinh,
        diaChi: req.body.diaChi,
        MonHoc_idMonHoc : req.body.MonHoc_idMonHoc,
        Lop_idLop : req.body.Lop_idLop,
    });
    console.log(GiaoVien);
    GiaoVien.save((err) => {
        if (err) {
            res.json({err:1,msg:'them ban ghi loi '+ err})
        }
        res.json({err:0,msg:'da them thanh cong'});
    })
}
function update(req, res) {
    console.log(req.body);
    GiaoVienModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {

        if (err) {
            return res.json({err:1,msg:'update ban ghi loi'+ err})
        }
        res.json({err:0,msg:'update ban ghi thanh cong'});
    });
}
function remove(req, res) {
    GiaoVienModel.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            return res.json({err:1, msg:'xay ra loi'+err})
        res.json({err:0,msg:'xoa thanh cong'});
    })
}
module.exports = {
    selectAll: selectAll,
    getByID: getByID,
    create: create,
    update: update,
    remove: remove
}