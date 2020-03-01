var table = $('#tblresult').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
        "cache": "false",
        "url": "/qlgv",
        "type": "POST",
        "dataType": "json",
        // 'beforeSend': function (request) {
        //     request.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
        // },
        //"cache":false,
        "dataSrc": function (json) {
            console.log(json);
            
            json.data.forEach(element => {
                element.Method = `<a class=" my-method-button btnEdit fa-hover"    title="Sửa Giáo Viên" ><i class="fa fa-edit"></i></a> &nbsp
                                <a class=" my-method-button btnDelete fa-hover"    title="Xóa Giáo Viên" ><i class="fa fa-trash"></i></a>`;
            });
            return json.data;
        },
    },
    "PaginationType": "bootstrap",
    "columnDefs": [
        { "visible": false, "targets": 1 },
        {
            "className": "text-center",
            "width": "50px",
            "orderable": false,
            "targets": 0
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
        { "data": 'tenGiaoVien' },
        { "data": 'ngaySinh' },
        { "data": 'diaChi' },
        { "data": 'MonHoc_idMonHoc._id' },
        { "data": 'MonHoc_idMonHoc.tenMonHoc' },
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

// insert

$("#btnAdd").click(function () {
    $('#IDp').val(-1);
    $('#tenGiaoVien').val(null);
    $('#ngaySinh').val(null);
    $('#diaChi').val(null);
    $('#Lop_idLop').val(null);
    $('#MonHoc_idMonHoc').val(null);
    $("#editmodal").modal('show');
});

$('#frmPost').submit((e) => {
    e.preventDefault();
    let form = $('#frmPost').serializeArray();
    console.log(form);
    
    $.ajax({
        url: "/qlgv/create",
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
                $("#editmodal").modal('hide');
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
    $('#u_IDp').val(obj._id);
    $('#u_tenGiaoVien').val(obj.tenGiaoVien);
    $('#u_ngaySinh').val(obj.ngaySinh);
    $('#u_diaChi').val(obj.diaChi);
    $('#u_Lop_idLop').val(obj.tenLop);
    $('#u_MonHoc_idMonHoc').val(obj.tenMonHoc);
    $("#updatemodal").modal('show');
});

// update
$('#frmPut').submit((e) => {
    var id = $('#u_IDp').val();
    e.preventDefault();
    let form = $('#frmPut').serializeArray();
    $.ajax({
        url: "/qlgv/" + id + "/update",
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
                $("#updatemodal").modal('hide');
                toastr["error"]("Xảy ra lỗi, " + data.msg);
            }
        })
        .fail(() => {
            $("#updatemodal").modal('hide');
            toastr["error"]("Xảy ra lỗi, vui lòng tải lại trang!");
        });
    $("#btnSubmitDetail").removeAttr("disabled");
});

//---- remove 
$("#tblresult").on("click", ".btnDelete", function () {
    var obj = $('#tblresult').DataTable().row($(this).parents('tr')).data();
    $("#ID").val(obj._id);
    $('#appConfirm h4').html("Xoá Giáo Viên");
    let q = "Bạn có chắc chắn muốn xóa giáo viên <b>" + obj.tenGiaoVien + " " + "</b> không?";
    $("#btnSubmit").html("Xóa")
    $('#appConfirm h5').html(q);
    $("#appConfirm").modal('show');
});

$('#frmDelete').submit((e) => {
    e.preventDefault();
    $("#btnSubmit").attr("disabled", true);
    var id = $('#ID').val();
    $.ajax({
        url: "/qlgv/" + id + "/remove",
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
    $("#btnSubmit").removeAttr("disabled");
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