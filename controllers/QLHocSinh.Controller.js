var HocSinhModel = require('../models/HocSinh');

async function SelectAll(req, res, filler) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    try {
        var dataresult = await HocSinhModel.find()
            .where('Lop_idLop','5e1307e9ca202f641e064b72')
            .skip(parseInt(start))
            .limit(parseInt(length))
            .sort({ 'created_at': -1 })
            .populate('Lop_idLop', ['_id', 'tenLop', 'viTri'])
            .exec();
        res.json({ "recordsTotal": dataresult.length, "recordsFiltered": await HocSinhModel.count(), "data": dataresult, "draw": req.body.draw });
    }
    catch (err) {
        throw (err);
    }
}

async function SelectByID(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    var Lop_idLop = req.body.classFiller == null ? 1 : req.body.classFiller;
    console.log(Lop_idLop);
    
    try {
        if(Lop_idLop != 1)
        {
            var dataresult = await HocSinhModel.find()
            .where('Lop_idLop', Lop_idLop)
            .skip(parseInt(start))
            .limit(parseInt(length))
            .sort({ 'created_at': -1 })
            .populate('Lop_idLop', ['_id', 'tenLop', 'viTri'])
            .exec();
        }
        else
        {
            var dataresult = await HocSinhModel.find()
            .skip(parseInt(start))
            .limit(parseInt(length))
            .sort({ 'created_at': -1 })
            .populate('Lop_idLop', ['_id', 'tenLop', 'viTri'])
            .exec();
        }
        
        res.json({ "recordsTotal": dataresult.length, "recordsFiltered": await HocSinhModel.count(), "data": dataresult, "draw": req.body.draw });
    }
    catch (err) {
        throw (err);
    }
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
    console.log(HocSinh);

    HocSinh.save((err) => {
        
        if (err) {
            console.log(err);
            
            res.json({ err: 1, msg: err });
            return;
        }
        res.json({ err: 0, msg: 'HocSinh insert successfully' });
        return;
    })
}

function Update(req, res) {
    console.log(req.params.id);
    HocSinhModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) {
            res.json({ err: 1, msg: err })
        }
        res.json({ err: 0, msg: 'HocSinh update successfully' })
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