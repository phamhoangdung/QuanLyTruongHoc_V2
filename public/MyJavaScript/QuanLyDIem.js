$('#fillerL').on('change', function () {
    if ($('#fillerMH').val() != 1 && $('#fillerL').val() != 1) {
        console.log($('#fillerMH').val());
        console.log($('#fillerMH').val());

        table.clear();
        table.ajax.reload();
    }
});
$('#fillerMH').on('change', function () {
    if ($('#fillerMH').val() != 1 && $('#fillerL').val() != 1) {
        table.clear();
        table.ajax.reload();
    }
});

var table = $('#tblresult').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "cache": "false",
        "url": "/qld",
        "type": "POST",
        "dataType": "json",
        "data": {
            Lop_idLop: function () { return $('#fillerL').find(":selected").val() },
            MonHoc_idMonHoc: function () { return $('#fillerMH').find(":selected").val() }
        },
        // 'beforeSend': function (request) {
        //     request.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
        // },
        //"cache":false,
        "dataSrc": function (json) {
            json.data.forEach(element => {
                element.Method = `<a class=" my-method-button btnEdit fa-hover"    title="Sửa tài khoản" ><i class="fa fa-edit"></i></a>`;
            });
            return json.data;
        },
    },
    "PaginationType": "bootstrap",
    "columnDefs": [
        { "visible": false, "targets": [1, 2, 5] },
        {
            "className": "text-center",
            "width": "50px",
            "orderable": false,
            "targets": 0
        },
        {
            "render": (data, type, row) => {
                return data == -1 ? '<p></p>' : data
            },
            "className": "text-center",
            "orderable": false,
            "targets": [6, 7, 8, 9, 10, 11, 12]
        },
        {
            "className": "text-center",
            "width": "50px",
            "targets": 13
        }
    ],
    "language": {
        "sLengthMenu": "Số bản ghi hiển thị trên 1 trang _MENU_ ",
        "sInfo": "Hiển thị từ _START_ đến _END_ của _TOTAL_ bản ghi",
        "search": "Tìm kiếm:",
        "oPaginate": {
            "sFirst": "Đầu",
            "sPrevious": "Trước",
            "sNext": "Tiếp",
            "sLast": "Cuối"
        }
    },
    columns: [
        { "data": null },
        { "data": '_id' },
        { "data": 'HocSinh_idHocSinh._id' },
        { "data": 'HocSinh_idHocSinh.hoHS' },
        { "data": 'HocSinh_idHocSinh.tenHS' },
        { "data": 'MonHoc_idMonHoc._id' },
        { "data": 'diem15_lan1' },
        { "data": 'diem15_lan2' },
        { "data": 'diem15_lan3' },
        { "data": 'diem1tiet_lan1' },
        { "data": 'diem1tiet_lan2' },
        { "data": 'diem1tiet_lan3' },
        { "data": 'diemThiHK' },
        { "data": 'Method' }
    ],
    bAutoWidth: false,
    fnRowCallback: (nRow, aData, iDisplayIndex) => {
        $("td:first", nRow).html(iDisplayIndex + 1);
        return nRow;
    },
});

// insert

$("#btnAdd").click(function () {
    $('#IDp').val(-1);
    $('#tenGiaoVien').val(null);
    $('#Birthday').val(null);
    $('#Address').val(null);
    $('#Status').val(0);
    $("#createmodal").modal('show');
});

$("#tblresult").on("click", ".btnEdit", function () {
    var obj = $('#tblresult').DataTable().row($(this).parents('tr')).data();
    console.log(obj);

    $('#IDu').val(obj._id);
    $('#hoHS').html(obj.HocSinh_idHocSinh.hoHS);
    $('#tenHS').html(obj.HocSinh_idHocSinh.tenHS);
    $('#diem15_lan1').val(obj.diem15_lan1 == -1 ? 0 : obj.diem15_lan1);
    $('#diem15_lan2').val(obj.diem15_lan2 == -1 ? 0 : obj.diem15_lan2);
    $('#diem15_lan3').val(obj.diem15_lan3 == -1 ? 0 : obj.diem15_lan3);
    $('#diem1tiet_lan1').val(obj.diem1tiet_lan1 == -1 ? 0 : obj.diem1tiet_lan1);
    $('#diem1tiet_lan2').val(obj.diem1tiet_lan2 == -1 ? 0 : obj.diem1tiet_lan2);
    $('#diem1tiet_lan3').val(obj.diem1tiet_lan3 == -1 ? 0 : obj.diem1tiet_lan3);
    $('#diemThiHK').val(obj.diemThiHK == -1 ? 0 : obj.diemThiHK);
    $("#updatemodal").modal('show');
});

$('#frmPost').submit((e) => {
    e.preventDefault();
    let form = $('#frmPost').serializeArray();
    $.ajax({
        url: "/qld/create",
        method: "POST",
        data: form,
        dataType: 'json'
    })
        .done((data) => {
            if (data.err === 0) {
                $('#tblresult').DataTable().ajax.reload();
                $("#editmodal").modal('hide');
                toastr["success"]("Thêm bản ghi thành công! ");
            }
            else {
                toastr["error"]("Xảy ra lỗi, " + data.msg);
            }
        })
        .fail(() => {
            $("#editmodal").modal('hide');
            toastr["error"]("Xảy ra lỗi, vui lòng tải lại trang!");
        });
    $("#btnSubmitConfirm").removeAttr("disabled");
});



// update
$('#frmPut').submit((e) => {
    var id = $('#IDu').val();
    e.preventDefault();
    let form = $('#frmPut').serializeArray();
    $.ajax({
        url: "/qld/" + id + "/update",
        method: "PUT",
        data: form,
        dataType: 'json'
    })
        .done((data) => {
            if (data.err === 0) {
                $('#tblresult').DataTable().ajax.reload();
                $("#updatemodal").modal('hide');
                toastr["success"]("Thêm bản ghi thành công! ");
            }
            else {
                toastr["error"]("Xảy ra lỗi, " + data.msg);
            }
        })
        .fail(() => {
            $("#updatemodal").modal('hide');
            toastr["error"]("Xảy ra lỗi, vui lòng tải lại trang!");
        });
    $("#btnSubmitConfirm").removeAttr("disabled");
});

//---- remove 
$("#btnAdd").on("click", function () {
    var obj = $('#tblresult').DataTable().row($(this).parents('tr')).data();
    $("#ID").val(obj._id);
    $('#appConfirm h4').html("Xoá Giáo Viên");
    let q = "Bạn có chắc chắn muốn xóa giáo viên <b>" + obj._id + " " + "</b> không?";
    $("#btnSubmitDetail").html("Xóa")
    $('#appConfirm h5').html(q);
    $("#appConfirm").modal('show');
});

$('#frmDelete').submit((e) => {
    e.preventDefault();
    $("#btnSubmitConfirm").attr("disabled", true);
    var id = $('#ID').val();
    $.ajax({
        url: "/qld/" + id + "/remove",
        method: "delete",
    })
        .done((data) => {
            if (data.err === 0) {
                $('#tblresult').DataTable().ajax.reload();
                $("#appConfirm").modal('hide');
                toastr["success"]("Xóa bản ghi thành công! ");
            }
            else {
                toastr["error"]("Xảy ra lỗi, " + data.msg);
            }
        })
        .fail(() => {
            $("#appConfirm").modal('hide');
            toastr["error"]("Xảy ra lỗi, vui lòng tải lại trang!");
        });
    $("#btnSubmitConfirm").removeAttr("disabled");
});
$('#btnAutoCreat').click(() => {
    var lop = $('#fillerL').val();
    var MonHoc = $('#fillerMH').val();

    if (lop != 1 && MonHoc != 1)
    {
        $.ajax({
            url: "/qld/autoCreate",
            method: "post",
            data: {
                Lop_idLop: $('#fillerL').val(),
                MonHoc_idMonHoc: $('#fillerMH').val()
            }
        })
        .done((data) => {
            if (data.err === 0) {
                $('#tblresult').DataTable().ajax.reload();
                $("#appConfirm").modal('hide');
                toastr["success"]("Xóa bản ghi thành công! ");
            }
            else {
                toastr["error"]("Xảy ra lỗi, " + data.msg);
            }
        })
        .fail(() => {
            $("#appConfirm").modal('hide');
            toastr["error"]("Xảy ra lỗi, vui lòng tải lại trang!");
        });
    }
    else
    {
        toastr["warning"]("Vui lòng chọn môn học và lớp học");
    }
        
})
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}