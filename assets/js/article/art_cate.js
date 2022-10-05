$(function() {
    dy();

    function dy() {
        // 获取数据渲染到模板
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                var a = template('mb', res);
                $('tbody').html(a);
            }
        })
    }



    // 点击按钮
    var layer = layui.layer;
    var indexAdd = null;
    $('#btn_tj').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            content: $('#mb2').html(), //这里content是一个普通的String
            area: ['500px', '300px'],
            title: '添加文章类别'
        });
    })

    // 点击弹出层的确定， 上传数据到服务器， 用到代理
    $('body').on('submit', '#nei2', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                    // 根据索引，关闭对应的弹出层
                layer.close(indexAdd);
            }
        })
    })
    var form = layui.form;
    var indexedit = null;

    //点击编辑，上传数据
    $('tbody').on('click', '#btn_edit', function(e) {
        e.preventDefault();

        indexedit = layer.open({
            type: 1,
            content: $('#mb3').html(), //这里content是一个普通的String
            area: ['500px', '300px'],
            title: '修改文章类别'
        });
        var id = $(this).attr('btn_edit');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('nei3', res.data);
            }
        })
    })

    //点击编辑的确定按钮后表单上传事件
    $('tbody').on('submit', '#nei3', function(e) {
        e.preventDefault();
        // var t3 = null;
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('cuow');
                }
                layer.msg('更新成功');
                layer.close(indexedit);
                dy();

            }
        })
    });

    //删除事件
    $('tbody').on('click', '#btn_del', function() {
        var id = $(this).attr(data - id);
        layer.confirm('is not?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        retun;
                    }
                    layer.close(index);
                    dy();
                }
            })
        });
    })
})