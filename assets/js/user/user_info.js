$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6之间';
            }
        }
    });
    yonghu();

    // 初始化用户信息,发送
    function yonghu() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息');
                }
                console.log(res);
                //luyui的form对象的val（）方法传给layui的容器
                form.val("fuzhi", res.data)
            }
        })
    }

    //重置按钮
    $('#btn_cz').on('click', function(e) {
        e.preventDefault();
        yonghu();
    });

    //提交表单
    $('#bd').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('失败');
                }
                layer.msg(res.message);
                window.parent.Getdata(res);
            }
        })
    })
})