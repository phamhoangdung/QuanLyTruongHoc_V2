var DiemModel = require('../models/Diem');
var HocSinhModel = require('../models/HocSinh');
var MonHocModel = require('../models/MonHoc');
var LopModel = require('../models/Lop');
var async = require('async');

async function selectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    var MonHoc = req.body.MonHoc_idMonHoc;
    var Lop = req.body.Lop_idLop;
    var total = await DiemModel.count();
    try {
        if (MonHoc != 1 && Lop != 1) {
            DiemModel.find()
                .skip(parseInt(start))
                .limit(parseInt(length))
                .populate({ path: 'HocSinh_idHocSinh', match: { Lop_idLop: Lop } })
                .populate({ path: 'MonHoc_idMonHoc', match: { _id: MonHoc } })
                .exec((err, result) => {
                    if (err)
                        res.json({ err: 1, msg: err });
                    var datareturn = [];
                    result.map((e, i) => {
                        if (e.HocSinh_idHocSinh != null && e.MonHoc_idMonHoc != null)
                            datareturn.push(e);
                    })
                    res.json({ "recordsTotal": datareturn.length, "recordsFiltered": total, "data": datareturn, "draw": req.body.draw });
                })
        }
        else {
            DiemModel.find()
                .skip(parseInt(start))
                .limit(parseInt(length))
                .populate({ path: 'HocSinh_idHocSinh' })
                .populate({ path: 'MonHoc_idMonHoc'})
                .exec((err, result) => {
                    if (err)
                        res.json({ err: 1, msg: err });
                    // var datareturn = [];
                    // result.map((e, i) => {
                    //     if (e.HocSinh_idHocSinh != null && e.MonHoc_idMonHoc != null)
                    //         datareturn.push(e);
                    // })
                    res.json({ "recordsTotal": result.length, "recordsFiltered": total, "data": result, "draw": req.body.draw });
                })
        }

        // res.json(dataResult);

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
var checkExist = function (idhs, idmh) {
    return new Promise(function (resolve, reject) {
        if (idhs != null && idmh != null) {
            DiemModel.count({ HocSinh_idHocSinh: idhs, MonHoc_idMonHoc: idmh }, function (err, count) {
                if (err)
                    reject(-1);
                resolve(count);

            })
        }
        else {
            reject(-1);
        }
    })
}

async function autoCreate(req, res) {
    console.log(req.body.Lop_idLop);
    DiemModel.init()
    var HocSinh = await HocSinhModel
        .find((err, result) => { return result._id })
        .where('Lop_idLop', req.body.Lop_idLop);
    // res.json(Lop);
    let Diems = [];
    await HocSinh.map(async (e, i) => {
        let check = await checkExist(e._id, req.body.MonHoc_idMonHoc);
        console.log(check);
        
        if (check === 0) {
            await new DiemModel({
                HocSinh_idHocSinh: e._id,
                MonHoc_idMonHoc: req.body.MonHoc_idMonHoc,
                diem15_lan1: -1,
                diem15_lan2: -1,
                diem15_lan3: -1,
                diem1tiet_lan1: -1,
                diem1tiet_lan2: -1,
                diem1tiet_lan3: -1,
                diemThiHK: -1,
            }).save((err, result) => {
                console.log("++");
                if(err)
                return res.json({ err: 1, msg: err });
            })
        }
    })
    return res.json({ err: 0, msg: "Tạo mới bảng điểm thành công !"})
    // res.json(Diems);
    // return;

    //  console.log(Diems);

    // if(await Diems.count > 0)
    // {
    //     async.mapSeries(Diems, function (diem, asyncdone) {
    //         console.log("=>" + asyncdone);
    //         diem.save(asyncdone);
    //     }, function (err) {
    //         if (err) return console.log(err);
    //         res.json({ err: 0, msg: "Diem create successfully" });
    //         return;
    //         // done(); // or `done(err)` if you want the pass the error up
    //     });
    // }

    //  Diem.forEach(async (e,i)=>{
    //     console.log(i);
    //     await Diem[i].save( (err, result)=>{
    //         console.log(result);
    //         // res.setHeader('Content-Type', 'text/plain');
    //         res.json({ err: 0, msg: "Diem create successfully" });
    //         return; 
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
    autoCreate: autoCreate
}