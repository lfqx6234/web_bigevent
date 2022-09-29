//过滤器的作用，在发送前会先截取到信息
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径

    options.url = 'http://www.liulongbin.top:3007' + options.url;

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function(res) {
        // console.log(res);
        var res = res.responseJSON;
        if (res.status === 1 || res.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = './login.html';
        }
    }

})