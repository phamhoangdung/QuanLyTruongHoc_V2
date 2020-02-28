var table = $('#tblresult').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "cache": "false",
        "url": "/qllh",
        "type": "POST",
        "dataType": "json",
        // 'beforeSend': function (request) {
        //     request.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
        // },
        //"cache":false,
        "dataSrc": function (json) {
            json.data.forEach(element => {
                element.Method = `<a class=" my-method-button btnEdit fa-hover"    title="Sửa tài khoản" ><i class="fa fa-edit"></i></a> &nbsp`;
            });
            return json.data;
        },
    },
    "PaginationType": "bootstrap",
    "columnDefs": [
        { "visible": false, "targets": 1},
        {
            "className": "text-center",
            "width": "50px",
            "orderable": false,
            "targets": [0,5]
        },
        {
            "render": (data, type, row) => {
                return data == 1 ? '<i class="fa fa-toggle-on" title="Hoạt động" style="color:green"></i>' : '<i class="fa fa-toggle-off" title="Không hoạt động"></i>'
            },
            "orderable": false,
            "width": "50px",
            "targets": 4
         },
         {
             
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
        { "data": 'tenLop' },
        { "data": 'viTri' },
        { "data": 'trangThai' },
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
    $('#tenLop').val(null);
    $('#viTri').val(null);
    $('#trangThai').val(1);
    $("#editmodal").modal('show');
});


$('#frmPost').submit((e) => {
    e.preventDefault();
    let form = $('#frmPost').serializeArray();
    $.ajax({
        url: "/qllh/create",
        method: "POST",
        data: form,
        dataType: 'json'
    })
        .done((data) => {
            if (data.err === 0) {
                $('#tblresult').DataTable().ajax.reload();
                $("#editmodal").modal('hide');
                toastr["success"]("Thêm m bản ghi thành công! ");
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

$("#tblresult").on("click", ".btnEdit", function () {
    var obj = $('#tblresult').DataTable().row($(this).parents('tr')).data();
    $('#u_id').val(obj._id);
    $('#u_tenLop').val(obj.tenLop);
    $('#u_viTri').val(obj.viTri);
    $('#u_trangThai').val(obj.trangThai);
    $("#updatemodal").modal('show');
});

$('#frmPut').submit((e) => {
    var id = $('#u_id').val();
    e.preventDefault();
    let form = $('#frmPut').serializeArray();
    $.ajax({
        url: "/qllh/"+id+"/update",
        method: "PUT",
        data: form,
        dataType: 'json'
    })
        .done((data) => {
            if (data.err === 0) {
                $('#tblresult').DataTable().ajax.reload();
                $("#updatemodal").modal('hide');
                toastr["success"]("Thêm m bản ghi thành công! ");
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
$("#tblresult").on("click", ".btnDelete", function () {
    var obj = $('#tblresult').DataTable().row($(this).parents('tr')).data();
    $("#r_id").val(obj._id);
    $('#appConfirm h4').html("Xoá lớp học");
    let q = "Bạn có chắc chắn muốn lớp học <b>" + obj.tenLop + "</b>  có vị trí <b>" + obj.viTri + "</b> không?";
    $("#btnSubmitDetail").html("Xóa")
    $('#appConfirm h5').html(q);
    $("#appConfirm").modal('show');
});

$('#frmDelete').submit((e) => {
    e.preventDefault();
    $("#btnSubmitConfirm").attr("disabled", true);
    var id = $('#r_id').val();
    $.ajax({
        url: "/qllh/"+id+"/remove",
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