//封装一个读写cookie的类
// document.cookie 返回值: name1=value1;name2=value2;name3=value3
class CookieUtil {
    // 获取给定名称的cookie值
    static get(name){
      //先给name编码
      let cookieName = `${encodeURIComponent(name)}=`;
      // 查找到返回第一次出现的位置
      let cookieStart = document.cookie.indexOf(cookieName);
      // 定义一个变量接收cookie值
      let cookieValue = null;
      // 判断，找到了第一个继续查找剩下的字符串。
      if(cookieStart > -1){
        // 从第一个值的位置之后找
        let cookieEnd = document.cookie.indexOf(';',cookieStart);
        // 没找到
        if(cookieEnd == -1){
          cookieEnd = document.cookie.length;
        }
        // 截取拼接解码
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd))
      }
      return cookieValue;
    }
    // 设置
    static set(name,value,expires,path,domain,secure,httpOnly){
      let cookieText = `${encodeURIComponent(name)} = ${encodeURIComponent(value)}` ;
      if(expires instanceof Date){
        cookieText += `; expires=${expires.toUTCString()}`;
      }
      if(path){
        cookieText += `; path=${path}`;
      }
      if(domain){
        cookieText += `; domain=${domain}`;
      }
      if(secure){
        cookieText += "; secure";
      }
      if(httpOnly){
        cookieText += `; ${httpOnly}`;
      }
      document.cookie = cookieText;
    }
    // 删除
    static unset(name,value,expires,path,domain,secure,httpOnly){
      CookieUtil.set(name,"",new Date(0),path,domain,secure,httpOnly)
    }

}
