$('#tblresult').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "cache": "false",
        "url": "/qltk",
        "type": "POST",
        'beforeSend': function (request) {
            request.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
        },
        //"cache":false,
        "dataSrc": function (json) {
            json.data.forEach(element => {
                element.Method = `<a class=" my-method-button btnEdit fa-hover"    title="Sửa tài khoản" ><i class="fa fa-edit"></i></a> &nbsp
                                <a class=" my-method-button btnDelete fa-hover"    title="Xóa tài khoản" ><i class="fa fa-trash"></i></a>`;
            });
            return json.data;
        },
    },
    "PaginationType": "bootstrap",
    "columnDefs": [
        {
            "className": "text-center",
            "width": "50px",
            "visible": true,
            "orderable": false,
            "targets": [0,7]
        },
        { "visible": false, "targets": [1,3]},

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
        { "data": 'username' },
        { "data": 'password' },
        { "data": 'role' },
        { "data": 'created_at' },
        { "data": 'updated_at' },
        { "data": 'Method' },
    ],
    bAutoWidth: false,
    fnRowCallback: (nRow, aData, iDisplayIndex) => {
        $("td:first", nRow).html(iDisplayIndex + 1);
        return nRow;
    }
});

$("#btnAdd").click(function () {
    $('#c_username').val(null);
    $('#c_role').val(null);
    $('#c_password').val(null);
    $("#creatmodal").modal('show');
});

$("#tblresult").on("click", ".btnEdit", function () {
    var obj = $('#tblresult').DataTable().row($(this).parents('tr')).data();
    $('#IDu').val(obj._id);
    $('#u_username').val(obj.username);
    $('#u_password').val(obj.password);
    $('#u_role').val(obj.role);
    $("#updatemodal").modal('show');
});
//form create new item
$('#frmPost').submit((e) => {
    e.preventDefault();
    let form = $('#frmPost').serializeArray();
    console.log(form);
    
    $.ajax({
        url: "/qltk/create",
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
            toastr["error"]("Xảy ra lỗi, "+data.msg);
        }
    })
    .fail(() => {
        $("#editmodal").modal('hide');
        toastr["error"]("Xảy ra lỗi, vui lòng tải lại trang!");
    });
    $("#btnSubmitConfirm").removeAttr("disabled");
});

//form update an item
$('#frmPut').submit((e) => {
    e.preventDefault();
    let form = $('#frmPut').serializeArray();
    var id = $('#IDu').val();
    $.ajax({
        url: "/qltk/"+id+"/update",
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
            toastr["error"]("Xảy ra lỗi, "+data.msg);
        }
    })
    .fail(() => {
        $("#editmodal").modal('hide');
        toastr["error"]("Xảy ra lỗi, vui lòng tải lại trang!");
    });
    $("#btnSubmitConfirm").removeAttr("disabled");
});

//from delete an item
$("#tblresult").on("click", ".btnDelete", function () {
    var obj = $('#tblresult').DataTable().row($(this).parents('tr')).data();
    $("input[name='ID']").val(obj._id);
    $('#appConfirm h4').html("Xóa tài khoản");
    let q = "Bạn có chắc chắn muốn tài khoản <b>" + obj.username + "</b> không?";
    $("#btnSubmitDetail").html("Xóa")
    $('#appConfirm h5').html(q);
    $("#appConfirm").modal('show');
});

$('#frmDelete').submit((e) => {
    e.preventDefault();
    $("#btnSubmitConfirm").attr("disabled", true);
    var id = $('#ID').val();
    $.ajax({
        url: "/qltk/"+ id +"/delete",
        method: "DELETE",
    })
        .done((data) => {
            if (data.err === 0) {
                $('#tblresult').DataTable().ajax.reload();
                $("#appConfirm").modal('hide');
                toastr["success"]("Xóa bản ghi thành công! ");
            }
            else {
                toastr["error"]("Xảy ra lỗi, "+data.msg);
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