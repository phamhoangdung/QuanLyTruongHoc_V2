var MonHocModel = require('../models/MonHoc');
var HocKy = require('../models/HocKy');
async function selectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    var total = await MonHocModel.count((err, result) => {
        return result;
    })
    try {
        // MonHocModel.find({}, (err, result) => {
        //     if (err)
        //         res.json({ err: 1, msg: err });
        //     res.json({ "recordsTotal": result.length, "recordsFiltered": total, "data": result, "draw": req.body.draw });
        // }).populate({path : 'HocKy'}).skip(parseInt(start)).limit(parseInt(length));

        // var hk = HocKy.findOne({tenHocKy: "Học Kỳ 1"});
        // console.log((await hk)._id);
        
        // var mhs = new MonHocModel({
        //     tenMonHoc: "Toán 11",
        //     HocKy_idHocKy: (await hk)._id
        // });
        // mhs.save();

        var mh =  MonHocModel.find({})
        .populate('HocKy')
        .exec((err, result)=>{
            console.log(result);
            return result;
        })
        // .populate('HocKy')
        // .exec(function (err, result) {
        //     if (err) return handleError(err);
        //     console.log(result._id);
        //     return result;
        // });
        res.json(await mh);
    }
    catch (err) {

        res.json({ err: 1, msg: err });
    }
}
function create(req, res) {
    console.log(req.body);

    let MonHoc = new MonHocModel({
        tenMonHoc: req.body.tenMonHoc,
        HocKy_idHocKy: req.body.HocKy_idHocKy
    });
    MonHoc.save((err) => {
        if (err)
            res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: 'MonHoc create successfully' });
    })
}

async function update(req, res) {
    console.log(req.body);
    MonHocModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err)
            res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: 'MonHoc update successfully' });
    });
}

function remove(req, res) {
    MonHocModel.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: 'MonHoc remove successfully' });
    })
}

module.exports = {
    selectAll: selectAll,
    create: create,
    update: update,
    remove: remove
}