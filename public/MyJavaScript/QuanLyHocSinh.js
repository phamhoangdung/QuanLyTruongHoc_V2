
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
$('#classFiller').on('change', function () {
    // console.log( $(this).find(":selected").val() );
    table.clear();
    // table.ajax.url =  "/qlhs/"+$(this).find(":selected").val();
    table.ajax.reload();
});

// $('#subjectname').change(() => {
//     customdata.idclass = Number($('#classname').val());
//     customdata.idsubject = Number($('#subjectname').val());
//     console.log(customdata);
//     // table.clear();
//     // table.ajax.data(customdata);
//     table.ajax.reload();
// });

var table = $('#tblresult').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "cache": "false",
        "url": "/qlhs/",
        "type": "POST",
        "data": {
            classFiller: function () { return $('#classFiller').find(":selected").val() }
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
            json.data.forEach(element => {
                element.Method = `<a class=" my-method-button btnEdit fa-hover"    title="Sửa tài khoản" ><i class="fa fa-edit"></i></a> &nbsp
                                <a class=" my-method-button btnDelete fa-hover"    title="Xóa tài khoản" ><i class="fa fa-trash"></i></a>`;
                element.ngaySinhHS =  moment(element.ngaySinhHS).format('YYYY-MM-DD');
                index++;
            });
            return json.data;
        },
    },
    "PaginationType": "bootstrap",
    "columnDefs": [
        {
            "className": "text-center",
            "width": "50px",
            "orderable": false,
            "targets": [0, 9]
        },
        // {
        //     "render": (data, type, row) => {
        //         return data == 1 ? '<i class="fa fa-toggle-on" title="Hoạt động" style="color:green"></i>' : '<i class="fa fa-toggle-off" title="Không hoạt động"></i>'
        //     },
        //     "orderable": false,
        //     "targets": 14
        // },
        {
            "render": (data, type, row) => {
                return data == 1 ? 'Nam' : 'Nữ'
            },
            "orderable": false,
            "targets": 6
        },
        {
            "visible": false,
            "targets": [1, 7]
        },
        // {
        //     "name":"ngaySinhHSs",
        //     "orderable": false,
        //     "type":   'datetime',
        //     "def":    function (data) { console.log(data);
        //      return new Date(); },
        //     "format": 'dd/MM/YYYY',
        //     "fieldInfo": 'Verbose date format',
        //     "keyInput": false,
        //     "targets": 4
        // },
        {
            "orderable": false,
            "className": "text-center",
            targets: 4,
            render: function (data) {
                return moment(data).format('DD-MM-YYYY');
            }
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
        { "data": 'hoHS' },
        { "data": 'tenHS' },
        { "data": 'ngaySinhHS' },
        { "data": 'diaChiHS' },
        { "data": 'gioiTinhHS' },
        { "data": 'Lop_idLop._id' },
        { "data": 'Lop_idLop.tenLop' },
        { "data": 'Method' }
    ],
    bAutoWidth: false,
    fnRowCallback: (nRow, aData, iDisplayIndex) => {
        $("td:first", nRow).html(iDisplayIndex + 1);
        return nRow;
    },
});



$("#btnAdd").click(function () {
    $('#c_hoHS').val(null);
    $('#c_tenHS').val(null);
    $('#c_ngaySinhHS').val(null);
    $('#c_diaChiHS').val(null);
    $('#c_gioiTinhHS').val(1);
    $('#c_Lop_idLop').val(1);
    $("#createmodal").modal('show');
});

$("#tblresult").on("click", ".btnEdit", function () {
    var obj = $('#tblresult').DataTable().row($(this).parents('tr')).data();
    $('#IDu').val(obj._id);
    $('#u_hoHS').val(obj.hoHS);
    $('#u_tenHS').val(obj.tenHS);
    // var date = new Date(obj.ngaySinhHS);
    // var fdate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    console.log(typeof obj.ngaySinhHS);

    $('#u_ngaySinhHS').val(obj.ngaySinhHS);
    $('#u_diaChiHS').val(obj.diaChiHS);
    $('#u_gioiTinhHS').val(obj.gioiTinhHS);
    $('#u_Lop_idLop').val(obj.Lop_idLop._id);
    $("#updatemodal").modal('show');
});

$('#frmPost').submit((e) => {
    e.preventDefault();
    let form = $('#frmPost').serializeArray();
    $.ajax({
        url: "/qlhs/create",
        method: "POST",
        data: form,
        dataType: 'json'
    })
        .done((data) => {
            if (data.err === 0) {
                $('#tblresult').DataTable().ajax.reload();
                $("#createmodal").modal('hide');
                toastr["success"]("Cập nhật bản ghi thành công! ");
            }
            else {
                toastr["error"]("Xảy ra lỗi, " + data.msg);
            }
        })
        .fail(() => {
            $("#createmodal").modal('hide');
            toastr["error"]("Xảy ra lỗi, vui lòng tải lại trang!");
        });
    $("#btnSubmitConfirm").removeAttr("disabled");
});

$('#frmPut').submit((e) => {
    e.preventDefault();
    let form = $('#frmPut').serializeArray();
    var id = $('#IDu').val();
    $.ajax({
        url: "/qlhs/" + id + "/update",
        method: "PUT",
        data: form,
        dataType: 'json'
    })
        .done((data) => {
            if (data.err === 0) {
                $('#tblresult').DataTable().ajax.reload();
                $("#updatemodal").modal('hide');
                toastr["success"]("Cập nhật bản ghi thành công! ");
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
        url: "/qlhs/" + id + "/remove",
        method: "DELETE",
    })
        .done((data) => {
            if (data.err === 0) {
                $('#tblresult').DataTable().ajax.reload();
                $("#appConfirm").modal('hide');
                toastr["success"]("Xóa bản ghi thành công! ");
            }
            else {
                $("#appConfirm").modal('hide');
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