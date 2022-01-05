---
title: js 相关
date: 2021-12-30
---
### 前后端加密的方法有哪些
md5 sha1 sha256 非对称加密（RSA利用公钥匙）
### unknown 和any 有什么区别？
any 不需要缩小类型 而unkonwn 不缩小的无法通过
### 如何实现深考呗
```js
//1.函数实现
 function deepClone(obj) {
   var cloneObj = Array.isArray(obj) ? [] : {}
   if (obj && typeof obj == 'object' && obj != null) {
      for (let i in obj) {
         if (i && typeof obj[i] == 'object') {
            cloneObj[i] = deepClone(obj[i])
         } else {
            cloneObj[i] = obj[i]
         }
      }
   }
   return cloneObj
}
//2.jsonstringfy 可以实现
//3.jq的$.extend 深拷贝
//4.loadsh
```
### 深拷贝如何解决循环引用的问题
```js
function find(arr,item){
        for(var i=0; i<arr.length; i++){
            if(arr[i].source === item){
                return arr[i]
            }
        }
        return null;
    }
    function isObject(obj) {
        return typeof obj === 'object' && obj != null;
    }
 
    function deepClone(source,uniqueList){
        if(!isObject(source)) return source;
 
        if(!uniqueList) uniqueList = [];    //   初始化数据
 
        var target = Array.isArray(source) ? [] : {};
 
        var uniqueData = find(uniqueList,source);
        if(uniqueData) return uniqueData.target;
 
 
        uniqueList.push({
            source:source,
            target:target
        });
 
        for(var key in source){
            if(Object.prototype.hasOwnProperty.call(source,key)){
                if(isObject(source[key])){
                    target[key] = deepClone(source[key], uniqueList)      //   传入数组
                }else{
                    target[key] = source[key];
                }
            }
        }
        return target;
    }
```
## 闭包函数相关
 
 ### 什么是闭包函数

 由于执行js代码的时候会在调用栈里面创建执行上下文，执行上下文里有词法环境，变量环境，this，outer（指向外层的执行上下文），根据词法作用于的规则，内部函数总是可以访问外部函数的变量，当我们调用一个外部函数返回一个内部函数，内部函数使用了外部的变量，即使调用的函数销毁了，但是内部函数调用的变量还是存在内存里（堆，栈里用的是地址），把这些变量的集合称为外部函数的闭包

 ### 闭包函数如何回收

 闭包函数使用不当会造成内存泄漏，当我们在全局函数使用闭包时候，只有当页面关闭的时候会销毁，如果这个时候闭包函数没被调用，那么就造成了内存泄漏，如果是在局部环境使用闭包，那么当下次浏览器执行垃圾回收的时候，判断这块内容是否还在使用，如果未使用咋垃圾回收器就会回收这段内存

 ## 什么是作用域链

 当一段代码使用了一个变量时，JavaScript 引擎首先会在“当前的执行上下文”中查找该变量，，如果在当前的变量环境中没有查找到，那么 JavaScript 引擎会继续在 outer 所指向的执行上下文中查找

## this相关

### js中的this是什么？

this是和执行上下文绑定的，执行上下文分为全局上下文，函数中上下文和eval中的上下文，那么this也就只有这三种——全局执行上下文中的 this、函数中的 this 和 eval 中的 this。

### this的指向？

1. 严格模式下 默认调用一个函数，this的指向underfind
2. 普通模式下 this指向window
3. 函数指向调用者
4. 箭头函数因为不存在执行上下文因此他没有this ，所以他的this继承了父级的this
5. 构造函数中的this指向new的对象，constrater中指向当前类

## new的过程发生了什么

1. new先创建了一个新的对象
let obj = new Object();
2. 我们将这个空对象的__proto__成员指向了原函数对象prototype成员对象;
obj.proto = person.prototype
3. 修改this到obj上。
person.call(obj)
4. 如果构造器没有手动返回对象，则返回第一步创建的新对象，如果有，则舍弃掉第一步创建的新对象，返回手动return的对象。




## 设计模式有哪些

工厂模式 传入参数就可以创建实力  
单列模式 vue 和vuex 有且只有一个实例  
发布订阅 事件机制  
观察者模式 响应式实现  
装饰者 @  
策略模式 策略模式指对象有某个行为,但是在不同的场景中,该行为有不同的实现方案-比如选项的合并策略  

## 登录方式有哪些
1. session机制 简单的后端应用 后端处理安全
存在服务端 利用cookie 容易crsf 维护成本高 
2. token 模式  适合大部分分布式后端架构
存在客户端 可以不用cookie
3. 单点登录 适合大型企业 统一内部登录 我们公司就是 当然还兼通了token模式
各个子系统不需要参与登录，会存在一个sso认证中心，登录时候会重定向到sso并且附上回调地址，输入账号和密码登录之后向sso的cookie写入登录状态 sso会给各个子系统发送一个passport，重定向回来之后会带上一个标识字段，前端再用这个授权码去向认证中心验证，成功之后将登陆信息写入cookie，这时候客户端是有两个cooki的一个是子系统的一个是sso的，这时候如果再前往b系统，因为之前登录有，认证中心判断cookie存在，就不需要输入账号和密码了直接就回调返回携带授权码，继续发起请求即可。
4. 授权登录 简单易用
就是去向第三方发起请求 对接api即可

## commonJS AMD CMD UMD es6模块化的区别

1. commonJS 是同步加载模块，主要应用在node服务端，通过module.export 导出 require引入，通常一个文件就是一个模块，拥有自己的独立作用域名，内部的变量和和函数不能被外界访问，
node模块会缓存，第二次访问会从缓存中取，
2. AMD 异步加载模块规范，他是在浏览器端开发的模块规范，使用AMD规范开发的时候需要引入require.js函数库，并且AMD是前置依赖，在define定义的时候第一个参数就要吧依赖全部声明，
然后依赖加载完之后才会执行回掉函数 define定义 require引入   
```js
define('moduleName',['a','b'],function(ma, mb) {
    return someExportValue;
})
 
require(['a', 'b'], function(ma, mb) {
    //    do something

```
3. CMD 是另外一种模块化规范，和AMD类似，不同的是AMD是前置依赖，CMD是就近依赖 ，延迟执行，这个规范其实就是sea.js推广过程产生的
4. UMD 整合了commonJS和AMD规范，希望能解决跨平台的方案  
原理：首先回去判断是否是exports，存在则使用commonjs规范加载，然后去判断是否有define如果存在就是用amd加载，否则就挂在window上吧
```js

(function(window, factory){
    if (typeof exports === 'object') {
        module.exports = factory()
    } else if (typeof define === 'function' && define.amd) {
        define(factory)
    } else {
        window.eventUtil = factory()
    }
})(this,function () {
    //    do something
})
```
5. es6模块化 通过exports default导出。用import来导入，可以通过对导出内容进行解构。ES6模块运行机制与commonjs运行机制不一样。js引擎对脚本静态分析的时候，遇到模块加载指令后会生成一个只读引用。等到脚本真正执行的时候。才会通过引用模块中获取值，在引用到执行的过程中，模块中的值发生变化，导入的这里也会跟着发生变化。ES6模块是动态引入的。并不会缓存值。模块里总是绑定其所在的模块。



