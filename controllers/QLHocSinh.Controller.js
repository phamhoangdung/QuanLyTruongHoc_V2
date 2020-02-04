var HocSinhModel = require('../models/HocSinh');

async function SelectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    try {
        var dataresult = await HocSinhModel.find()
            .skip(parseInt(start))
            .limit(parseInt(length))
            .populate('Lop_idLop', ['_id', 'tenLop', 'viTri'])
            .exec();
        res.json(dataresult);
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

function Create(req, res) {
    let HocSinh = new HocSinhModel({
        tenHS: req.body.tenHS == null ? 'Không xác định' : req.body.tenHS,
        hoHS: req.body.hoHS == null ? 'không xác định' : req.body.hoHS,
        ngaySinhHS: req.body.ngaySinhHS == null ? Date.now : req.body.ngaySinhHS,
        diaChiHS: req.body.diaChiHS == null ? 'không xác định' : req.body.diaChiHS,
        gioiTinhHS: parseInt(req.body.gioiTinhHS == null ? 0 : req.body.gioiTinhHS),
        Lop_idLop: req.body.Lop_idLop,
        // TaiKhoan_idTaiKhoan: req.body.TaiKhoan_idTaiKhoan,
    });
    HocSinh.save((err) => {
        if (err) {
            res.json({ err: 0, msg: err });
        }
        res.json({ err: 0, msg: 'HocSinh insert successfully' });
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

function Remove(req, res) {
    HocSinhModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
}

module.exports = {
    SelectByID: SelectByID,
    SelectAll: SelectAll,
    Create: Create,
    Update: Update,
    Remove: Remove,
}