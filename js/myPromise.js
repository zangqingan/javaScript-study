// 自定义实现promise类
export class myPromise{
  constructor(fn){
    // 成功的事件函数存放在一个数组里
    this.successList = []
    // 失败的事件函数存放在一个数组里
    this.failList = []
    // 设置promise对象的初始状态
    this.state = 'pending'
    // 传入实际的成功和失败函数对象
    fn(this.resolveFn.bind(this),this.rejectFn.bind(this))

  }
  // 定义then方法，当有执行then方法时把里面的回调对象存放到数组中
  then(successFn,failFn){
    // 如果是回调就先存放到数组中
    if(successFn === 'function'){
      this.successList.push(successFn)
    }
    if(failFn === 'function'){
      this.successList.push(failFn)
    }
  }
  //catch方法
  catch(failFn){
    if(failFn === 'function'){
      this.successList.push(failFn)
    }
  }
  // 真正的成功执行函数
  resolveFn(res){
    // 修改promise对象的状态
    this.state = 'fullfilled'
    // 轮询执行成功事件队列里所有的回调
    this.successList.forEach((fn,i) => {
      fn(res)
    })
  }
  // 真正的失败执行函数
  rejectFn(res){
    // 修改promise对象的状态
    this.state = 'rejected'
    // 轮询执行成功事件队列里所有的回调
    this.failList.forEach((fn,i) => {
      fn(res)
    })
    // 异常
    throw Error(res)
  }
}



