//封装一个发送ajax请求的函数，
/*
* ajax函数封装
*  ajax(options)
* options = {type:'get',url:'地址',success:callback}
* 
*/
// function ajax(options){
//     //创建ajax对象
//      const xhr = new XMLHttpRequest()
//     //配置对象
//     xhr.open(options.type,options.url)
//     // 发送请求
//     xhr.send()
//     //监听onload事件,它在ajax接收完服务器端响应数据后触发。
//     xhr.onload = function(){
//         options.success(xhr.responseText)
//     }
// }
// 进一步封装
/*
* ajax(options)
* options = {type:'get',url:'地址',data:{name:'zhangsan'},header:{'Content-Type':'application/x-www-form-urlencoded'},success:callback,error:callback}
* 参数含义:
*   type ajax请求的方式
*   url 请求的地址
*   data 传递的参数
*   header post 请求时传递参数的类型
*   success 请求成功后的回调
*   error 请求成功后的回调
*/

function ajax(options){
    // 不传入参数时使用默认值
    let defaults = {
        type:'get',
        url:'',
        data:{},
        header:{'Content-Type':'application/json'},
        success:function(){},
        onerror:function(){}
    };
    // 传入参数时合并两个对象,不管传没传进来都合并.
    Object.assign(defaults,options) 
    //1.创建ajax对象
    let xhr = new XMLHttpRequest()
    //get传参
    // 定义params接收
    let params = ''
    // 遍历data里的属性并拼接
    for (let attr in defaults.data) {
        params += `${attr}=${defaults.data[attr]}&`
    }
    // 去掉最后的一个&
    params = params.substr(0,params.length-1)
    // 判断请求方式如果是get拼接到url后面
    if(defaults.type == 'get'){
        defaults.url = `${defaults.url}?${params}`
    }
    //2.配置对象
    xhr.open(defaults.type,defaults.url)

    // 判断请求方式如果是post放到send方法中
    if(defaults.type == 'post'){
        //接收传进来的请求类型
        let contentType = defaults.header['Content-Type']
        // 设置请求类型
        xhr.setRequestHeader('Content-Type',contentType)
        // 如果是json直接传原始值
        if(contentType == 'application/json'){
            xhr.send(JSON.stringify(defaults.data))
        }else{
            xhr.send(params)
        }   
    }else{
        // 发送请求
        xhr.send()
    } 
    //3.监听onload事件，它在ajax接收完服务器端响应数据后触发。
    xhr.onload = function(){
        // 获取响应头中的数据
        let contentType = xhr.getResponseHeader('Content-Type')
        //服务器端返回的数据
        let responseText = xhr.responseText
        //如果是json格式先转换
        if(contentType.includes('application/json')){
            responseText = JSON.parse(responseText)
        }
        //响应成功成功
        if(xhr.status == 200){
            defaults.success(responseText,xhr)
        }else{
            defaults.onerror(responseText,xhr)
        }
       
    }
}