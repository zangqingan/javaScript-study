/**
 * //可以封装到一个js文件中
 * 
 *  
 */
//获取任意样式的函数
function getStyle(obj,name){
    if(window.getComputedStyle){
        return getComputedStyle(obj,null)[name];
    }else{
        return obj.currentStyle[name];
    }
}

//定义一个变量接收定时器的唯一标识。
var timer
//尝试封装成一个函数
//obj要执行动画的对象
//attr要执行动画的样式,比如left，top，width，height等
//target执行动画的目标位置
//speed移动的速度（有正负，正向右移动，负向左移动。）
//callback回调函数在动画执行结束后执行
function move(obj,attr,target,speed,callback){
    //每次开启前都先关闭上一个定时器
    clearInterval(obj.timer);
    //获取元素当前的位置
    var current = parseInt(getStyle(obj,attr));
    //判断速度的正负值
    //如果从0到800移动则speed为正
    //如果从800到0移动则speed为负
    if(current > target){
        //取反,这样调用时就不用考虑正负了
        speed  = -speed;
    }
    //开启一个定时器来执行动画的效果
    //向执行动画的对象添加一个timer属性，作为自己定时器的唯一标识
    obj.timer = setInterval(function(){
        //获取box1原来的left值
        var oldx = parseInt(getStyle(obj,attr));
        // alert(oldx);
        //在旧值的基础上增加
        var newValue = oldx + speed;
        //判断边界
        //向左移动时判断newValue是否小于target
        //向右移动时判断newValue是否大于target
        if(speed < 0 && newValue < target || speed > 0 && newValue > target){
            newValue = target;
        }
        //将新的值设置给box1
        // obj.style.left = newValue + "px";
        //attr是一个变量，用[]这种方式
        obj.style[attr]= newValue + "px";
        //div移动到800px时，停止
        if(newValue == target){
            clearInterval(obj.timer);
            //动画执行结束调用回调函数（只会执行一次次）
            //我传了回调函数你才执行，我没传就不要执行。
            callback && callback();
        }
    },20);
}


//定义一个函数用来向一个元素中添加指定的class属性
//obj要添加class属性的 对象
//cn添加的类名
function addClass(obj,cn){
    //先检查obj中是否含有cn这个class。
    if(!hasClass(obj,cn)){
        obj.className += " " + cn;
    }


}

//判断一个元素中是否含有指定的class属性值
//有返回true，没有返回false
function hasClass(obj,cn){
    //创建一个正则表达式
    // var reg = /\b\b/;
    var  reg = new RegExp("\\b"+cn+"\\b");
    return reg.test(obj.className);

}

//删除一个元素中的指定class属性
function removeClass(obj,cn){
    //创建一个正则表达式
    var  reg = new RegExp("\\b"+cn+"\\b");
    //删除class
    obj.className = obj.className.replace(reg,"");
}

//定义一个可以来回切换的函数
//有就删除，没有就添加
function toggleClass(obj,cn){
    if(hasClass(obj,cn)){
        //有删除
        removeClass(obj,cn);

    }else{
        //没有就添加
        addClass(obj,cn);
    }
}