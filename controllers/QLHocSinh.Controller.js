var HocSinhModel = require('../models/HocSinh');

function SelectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    try {
        HocSinhModel.find({}, (err, result) => {
            if (err)
                throw (err);
            res.json(result);
        }).skip(parseInt(start)).limit(parseInt(length));
    }
    catch (err) {
        throw (err);
    }
}

function SelectByID(req, res) {
    HocSinhModel.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.json(product);
    })
}

function Insert(req, res) {
    let HocSinh = new HocSinhModel({
        tenHocSinh: req.body.tenHocSinh,
        queQuan: req.body.queQuan,
        gioiTinh: req.body.gioiTinh,
        Lop_idLop: req.body.Lop_idLop,
        TaiKhoan_idTaiKhoan: req.body.TaiKhoan_idTaiKhoan,
    });
    HocSinh.save((err) => {
        if (err) {
            throw (err);
        }
        res.json('HocSinh insert successfully');
    })
}

function Update(req, res) {
    console.log(req.params.id);
    HocSinhModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) {
            console.log(err);
        }
        res.send('Product udpated.');
    });
}

function Delete(req, res) {
    HocSinhModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
}

module.exports = {
    SelectByID: SelectByID,
    SelectAll: SelectAll,
    Insert: Insert,
    Update: Update,
    Delete: Delete,
}