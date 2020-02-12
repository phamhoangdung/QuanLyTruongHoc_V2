var DiemModel = require('../models/Diem');
var HocSinhModel = require('../models/HocSinh');
var MonHocModel = require('../models/MonHoc');
var LopModel = require('../models/Lop');
var async = require('async');

async function selectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    var MonHoc = req.body.MonHoc;
    var Lop = req.body.Lop;

    try {
        var dataResult = await DiemModel.find()
            .skip(parseInt(start))
            .limit(parseInt(length))
            .populate({ path: 'HocSinh_idHocSinh', match: { Lop_idLop: "5e1307e9ca202f641e064b71" } })
            .populate({ path: 'MonHoc_idMonHoc', match: { _id: "5e33ede8907e404300b0afad" } })

        // .where({ "HocSinh_idHocSinh": null })
        // .where({MonHoc_idMonHoc:!null});
        .exec((err,result)=>{
            console.log({ err,result});
            if(err)
            res.json({ err: 1, msg: err });
            // if(result[0].HocSinh_idHocSinh == null)
            // res.json(null);
            // console.log(DiemModel[0].HocSinh_idHocSinh);

            result.map((e,i)=>{
                if(e.HocSinh_idHocSinh == null)
                console.log(e);

            })
            // res.json(result);
        })
        res.json(dataResult);

        // res.json({ "recordsTotal": dataResult.length, "recordsFiltered": await DiemModel.count(), "data": dataResult, "draw": req.body.draw });
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

async function autoCreateDiemForHocSinh(req, res) {
    DiemModel.init()
    var Lop = await HocSinhModel
        .find((err, result) => { return result._id })
        .where('Lop_idLop', req.body.Lop_idLop);
    // res.json(Lop);
    var Diems = [];
    Lop.map((e, i) => {
        Diems.push(new DiemModel({
            HocSinh_idHocSinh: e._id,
            MonHoc_idMonHoc: req.body.MonHoc_idMonHoc,
            diem15_lan1: -1,
            diem15_lan2: -1,
            diem15_lan3: -1,
            diem1tiet_lan1: -1,
            diem1tiet_lan2: -1,
            diem1tiet_lan3: -1,
            diemThiHK: -1,
        }))
    })
    async.eachSeries(Diems, function (diem, asyncdone) {
        console.log(diem);
        diem.save(asyncdone);
    }, function (err) {
        if (err) return console.log(err);
        res.json({ err: 0, msg: "Diem create successfully" });
        // done(); // or `done(err)` if you want the pass the error up
    });
    //  Diem.forEach(async (e,i)=>{
    //     console.log(i);
    //     await Diem[i].save( (err, result)=>{
    //         console.log(result);

    //         // res.setHeader('Content-Type', 'text/plain');
    //         res.statusCode = 200;
    //     })
    // })
}

function create(req, res) {
    let Diem = new DiemModel({
        HocSinh_idHocSinh: req.body.HocSinh_idHocSinh,
        MonHoc_idMonHoc: req.body.MonHoc_idMonHoc,
        diem15_lan1: req.body.diem15_lan1,
        diem15_lan2: req.body.diem15_lan2,
        diem15_lan3: req.body.diem15_lan3,
        diem1tiet_lan1: req.body.diem1tiet_lan1,
        diem1tiet_lan2: req.body.diem1tiet_lan2,
        diem1tiet_lan3: req.body.diem1tiet_lan3,
        diemThiHK: req.body.diemThiHK,
    });

    Diem.save((err => {
        if (err) res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: "Diem create successfully" });
    }))
}

function update(req, res) {
    DiemModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) res.json({ err: 1, msg: err });
        res.send({ err: 0, msg: "successfully" });
    });
}
function remove(req, res) {
    try {
        if (req.params.id != null) {
            DiemModel.findByIdAndRemove(req.params.id, function (err) {
                if (err) res.json({ err: 1, msg: err });
                res.send({ err: 0, msg: "successfully" });
            })
        }
        else res.json({ err: 1, msg: "params is undefined" });
    } catch (error) {
        res.json({ err: 1, msg: err })
    }
}
module.exports = {
    selectAll: selectAll,
    getByID: getByID,
    create: create,
    update: update,
    remove: remove,
    ListDiemvsHocSinh: autoCreateDiemForHocSinh
}