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
        // {
        //     "className": "text-center",
        //     "width": "50px",
        //     "orderable": false,
        //     "targets": [0,6,9]
        // },
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
        { "data": '__v' },

    ],
    bAutoWidth: false,
    fnRowCallback: (nRow, aData, iDisplayIndex) => {
        $("td:first", nRow).html(iDisplayIndex + 1);
        return nRow;
    }
});

$("#btnAdd").click(function () {
    $('#IDp').val(-1);
    $('#username').val(null);
    $('#password').val(null);
    $('#FirstName').val(null);
    $('#LastName').val(null);
    $('#Status').val(0);
    $('#ID_User_type').val(null);
    $("#editmodal").modal('show');
});

$("#tblresult").on("click", ".btnEdit", function () {
    var obj = $('#tblresult').DataTable().row($(this).parents('tr')).data();
    $('#username').val(obj.Username);
    $('#password').val(obj.password);
    $('#FirstName').val(obj.FirstName);
    $('#LastName').val(obj.LastName);
    $('#Status').val(obj.password);
    $('#IDp').val(obj.ID);
    $('#ID_User_type').val(obj.ID_User_type);
    $('#Status').val(obj.Status);
    $("#editmodal").modal('show');
});

$('#frmPost').submit((e) => {
    e.preventDefault();
    let form = $('#frmPost').serializeArray();
    $.ajax({
        url: "/users/edit",
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
            toastr["error"]("Xảy ra lỗi, "+data.msg);
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
    $('#appConfirm h4').html("Xóa tài khoản");
    let q = "Bạn có chắc chắn muốn tài khoản <b>" + obj.username + "</b> không?";
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
        url: "/qltk/"+ id +"/delete",
        method: "DELETE",
        data: form,
        dataType: 'json'
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