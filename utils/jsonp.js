// 封装jsonp
function jsonp(options){
    //动态创建script标签
    var script = document.createElement(script)
    // 获取参数并拼接,它是在函数名之后拼接的 &username=value
    var params = ''
    //遍历data
    for(var attr in  options.data){
        params += '&' + attr + '=' +  options.data[attr]
    }
    //函数名应该随机 jsonp01232235663
    var fnName ='jsonp' + Math.random().toString().replace('.','')
    //把回调执行函数也封装在一起
    window[fnName] = options.success
    //参数传入src
    script.src = options.url + '?callback=' + fnName + params
    //添加到body中
    document.body.appendChild(script)
    //加载完成移除script
    script.onload = function(){
        document.body.removeChild(script)
    }
}