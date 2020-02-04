
$('#datetimepicker1').datetimepicker();

$(function () {
    $('#datetimepicker1').datetimepicker({
        viewMode: 'years',
        format: 'MM/YYYY'
    });
});

var customdata = {
    "idclass": 1,
    "idsubject": 1
};

$('#classname').change(() => {
    customdata.idclass = Number($('#classname').val());
    customdata.idsubject = Number($('#subjectname').val());
    console.log(customdata);
    // table.clear();
    // table.ajax.data(customdata);
    table.ajax.reload();
});
$('#subjectname').change(() => {
    customdata.idclass = Number($('#classname').val());
    customdata.idsubject = Number($('#subjectname').val());
    console.log(customdata);
    // table.clear();
    // table.ajax.data(customdata);
    table.ajax.reload();
});

var table = $('#tblresult').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "cache": "false",
        "url": "/qlhs",
        "type": "POST",
        "data": function (d) {
            return $.extend(d, customdata);
        },
        "dataType": "json",
        // 'beforeSend': function (request) {
        //     request.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
        // },
        //"cache":false,
        "dataSrc": function (json) {
            console.log(json);
            dtUser = json;
            var index = 0;
            json.forEach(element => {
                element.Method = `<a class=" my-method-button btnEdit fa-hover"    title="Sửa tài khoản" ><i class="fa fa-edit"></i></a> &nbsp
                                <a class=" my-method-button btnDelete fa-hover"    title="Xóa tài khoản" ><i class="fa fa-trash"></i></a>`;
                index++;
            });
            return json;
        },
    },
    "PaginationType": "bootstrap",
    "columnDefs": [
        {
            "className": "text-center",
            "width": "50px",
            "orderable": false,
            "targets": [0, 14,15]
        },
        {
            "render": (data, type, row) => {
                return data == 1 ? '<i class="fa fa-toggle-on" title="Hoạt động" style="color:green"></i>' : '<i class="fa fa-toggle-off" title="Không hoạt động"></i>'
            },
            "orderable": false,
            "targets": 14
        },
        {
            type:   'datetime',
            def:    function () { return new Date(); },
            format: 'dd/MM/YYYY',
            fieldInfo: 'Verbose date format',
            keyInput: false,
            "targets": 4

        },

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
        { "data": 'idHocSinh' },
        { "data": 'tenHocSinh' },
        { "data": 'queQuan' },
        { "data": 'gioiTinh' },
        { "data": 'Lop_idLop' },
        { "data": 'TaiKhoan_idTaiKhoan' },
        { "data": 'creat_at' },
        { "data": 'update_at' },
        { "data": 'Method' }
    ],
    bAutoWidth: false,
    fnRowCallback: (nRow, aData, iDisplayIndex) => {
        $("td:first", nRow).html(iDisplayIndex + 1);
        return nRow;
    },
});



$("#btnAdd").click(function () {
    $('#IDp').val(-1);
    $('#FirstName').val(null);
    $('#LastName').val(null);
    $('#Birthday').val(null);
    $('#Address').val(null);
    $('#ID_Class').val(1);
    $('#ID_subject').val(1);
    $('#HS1').val(null);
    $('#HS2').val(null);
    $('#HS3').val(null);
    $('#Status').val(0);
    $("#editmodal").modal('show');
});

$("#tblresult").on("click", ".btnEdit", function () {
    var obj = $('#tblresult').DataTable().row($(this).parents('tr')).data();
    $('#IDp').val(obj.ID);
    $('#FirstName').val(obj.FirstName);
    $('#LastName').val(obj.LastName);
    $('#Birthday').val(obj.Birthday);
    $('#Address').val(obj.Address);
    $('#ID_Class').val(obj.ID_Class);
    $('#ID_subject').val(obj.ID_subject);
    $('#HS1').val(obj.HS1);
    $('#HS2').val(obj.HS2);
    $('#HS3').val(obj.HS3);
    $('#Status').val(obj.Status);
    $("#editmodal").modal('show');
});

$('#frmPost').submit((e) => {
    e.preventDefault();
    let form = $('#frmPost').serializeArray();
    $.ajax({
        url: "/student/edit",
        method: "POST",
        data: form,
        dataType: 'json'
    })
        .done((data) => {
            if (data.err === 0) {
                $('#tblresult').DataTable().ajax.reload();
                $("#editmodal").modal('hide');
                toastr["success"]("Cập nhật bản ghi thành công! ");
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

$("#tblresult").on("click", ".btnDelete", function () {
    var obj = $('#tblresult').DataTable().row($(this).parents('tr')).data();
    $("input[name='ID']").val(obj._id);
    $('#appConfirm h4').html("Xóa bài viết");
    let q = "Bạn có chắc chắn muốn bài viết <b>" + obj.tenHocSinh + "</b> không?";
    $("#btnSubmitDetail").html("Xóa")
    $('#appConfirm h5').html(q);
    $("#appConfirm").modal('show');
});

$('#frmDelete').submit((e) => {
    e.preventDefault();
    $("#btnSubmitConfirm").attr("disabled", true);
    let form = $('#frmDelete').serializeArray();
    var id = $('#ID').val();
    $.ajax({
        url: "/qlhs/"+id+"/remove",
        method: "DELETE",
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