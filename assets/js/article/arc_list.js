$(function() {
    var d = {
        pagenum: 1,
        pagesize: 是,
        cate_id: '',
        state: ''
    }
    xr();
    xlk();

    // 时间过滤器美化
    template.defaults.imports.dataFormat = function(data) {
        const dt = new Date(data);
        const y = dt.getFullYear();
        const m = zero(dt.getMonth() + 1);
        const d = zero(dt.getDate());
        const hh = zero(dt.getHours());
        const mm = zero(dt.getMinutes());
        const ss = zero(dt.getTime());
        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss;
    }

    //补0
    function zero(d) {
        return d > 9 ? d : '0' + d;
    }

    var layer = layui.layer;
    //渲染数据到页面
    function xr() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: d,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('error');
                }
                template('mb', res);
                fenye(res.total);
            }
        })
    }

    //渲染数据到下拉框
    function xlk() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return;
                }
                var htmlStr = template('mbxlk', res);
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();
            }
        })
    }

    //筛选事件
    $('#btn_choose').on('submit', function(e) {
        e.preventDefault();
        var id = $('[name=cate_id]').val();
        var state = $('[name=cate_id]').val();
        d.cate_id = id;
        d.state = state;
        xr();

    })


    // 分页函数  res.total是res中存放的总数居条数
    function fenye(total) {
        layui.laypage.render({
            elem: 'pageBOX',
            count: 'total',
            limit: d.pagesize,
            curr: d.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skit'],
            limit: [2, 3, 5, 10],
            jump: function(obj, first) {
                d.pagenum = obj.curr;
                d.pagesize = obj.limit;
                if (!first) {
                    xr();
                }
            }
        })
    }

    //删除功能
    $('tbody').on('click', '.btn_del', function() {
        layer.confirm('is not?', { icon: 3, title: '提示' }, function(index) {
            //do something
            var id = $(this).attr('data-id');
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if ($('.btn_del').length === 1) {
                        d.pagenum = d.pagenum === 1 ? 1 : d.pagenum - 1;
                    }
                    xr();
                }
            })
            layer.close(index);
        });
    })
})