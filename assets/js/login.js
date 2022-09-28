$(function() {
    //切换登录和注册页面
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_log').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    //验证密码
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var s = $('.reg-box [name=password]').val();
            if (value !== s) {
                return "两次密码不一致";
            }
        }
    });

    //提交注册表单，并且弹出layui的框
    var layer = layui.layer;
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.post("/api/reguser", {
            username: $("#form_reg [name=title]").val(),
            password: $("#form_reg [name=password]").val()
        }, function(res) {
            if (res.status !== 0) {

                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $('#link_log').click();

        })
    });

    //提交登录表单
    $('#form_log').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('#form_log').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res.token);

                    return layer.msg(res.message);
                }
                layer.msg('登录成功');

                //接获取过来的权限接口的密码存到浏览器的本地中
                localStorage.setItem('token', res.token);
                // console.log(res.token);

                // location.href = "./index.html";
            }
        })
    })





})