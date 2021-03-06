var MonHocModel = require('../models/MonHoc');

async function selectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    var total = await MonHocModel.count((err, result) => {
        return result;
    });

    try {
       
        if (req.body.HocKy_idHocKy != 1) {
            var data = await MonHocModel.find({})
                .skip(parseInt(start))
                .limit(parseInt(length))
                .populate('HocKy_idHocKy', 'tenHocKy')
                .where({ HocKy_idHocKy: req.body.HocKy_idHocKy })
                .exec();
        }
        else {
            var data = await MonHocModel.find({})
                .skip(parseInt(start))
                .limit(parseInt(length))
                .populate('HocKy_idHocKy', 'tenHocKy')
                .exec();
        }

        //res json for datatable
        res.json({ "recordsTotal": data.length, "recordsFiltered": total, "data": data, "draw": req.body.draw });
    }
    catch (err) {
        res.json({ err: 1, msg: err });
    }
}
function create(req, res) {
    // console.log(req.body.tenMonHoc);
    let MonHoc = new MonHocModel({
        tenMonHoc: req.body.tenMonHoc,
        soTiet: req.body.soTiet == null ? 0 : req.body.soTiet,
        HocKy_idHocKy: req.body.HocKy_idHocKy
    });
    console.log(MonHoc);

    MonHoc.save((err,data) => {
        if (err)
             return res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: 'MonHoc create successfully' });
    })
}

async function update(req, res) {
    console.log(req.body);
    MonHocModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err)
            return res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: 'MonHoc update successfully' });
    });
}

function remove(req, res) {
    MonHocModel.findByIdAndRemove(req.params.id, function (err) {
        if (err)
             return res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: 'MonHoc remove successfully' });
    })
}

module.exports = {
    selectAll: selectAll,
    create: create,
    update: update,
    remove: remove
}