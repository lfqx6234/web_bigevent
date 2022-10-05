$(function() {
    xr();
    initEditor();
    // 渲染页面
    function xr() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            success: function(res) {
                var a = template('mb', res);
                $('[name=cate_id]').html(a);
                layui.form.render();
            }
        })
    };
    // 1. 初始化图片裁剪器
    var $image = $('#image');

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };

    // 3. 初始化裁剪区域
    $image.cropper(options);

    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click();
    })

    $('#coverFile').on('change', function(e) {
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域  
    });
    var art_state = '已发布';
    $('#btnSave2').on('click', function() {
        art_state = '草稿';
    })

})