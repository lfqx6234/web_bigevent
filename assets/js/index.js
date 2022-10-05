$(function() {
    // xravatar();
    Getdata();

    $('.layui-icon').on('click', function() {

        layui.layer.confirm('是否要退出', { icon: 3, title: '提示' },
            function(index) {
                // location.removeItem = '';
                localStorage.removeItem('token');
                location.href = "login.html";
                // console.log(index);
                layer.close(index);
            });
    })
})

//封装 获取数据
function Getdata() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('上传失败');
            }
            // console.log(res);
            xravatar(res);
        }

    })
};

//渲染头像
function xravatar(res) {
    var name = res.data.nickname || res.data.username;
    $('.welcome').html(name);
    // console.log(name);
    var first = name[0].toUpperCase();
    // console.log(res);

    if (res.data.user_pic !== null) {
        $('.layui-nav-img').attr("src", res.data.user_pic).show();
        $('.text-avatar').hide();

    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first).show();
    }




};