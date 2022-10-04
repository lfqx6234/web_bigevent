$(function() {
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function(value) {
            if (value === $('[name="pwd"]').val()) {
                return '新旧密码不能相同';
            }
        },

        renewpwd: function(value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '新密码不一样'
            }
        }
    });

    gxmima();

    // 提交数据
    function gxmima() {
        $('#bd').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/updatepwd',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('失败');
                    }
                    // console.log(res);
                    layer.msg(res.message);

                    // 调用原生对象才有的reset（）方法
                    $('#bd')[0].reset();

                }
            })
        })
    };

})