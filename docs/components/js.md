---
title: js 相关
date: 2022-1-5
tags:
  - js
categories:
  - js
---

### file blob arrayBuffer

file 和 blob 都是表示类文件对象 file 继承了 blob 的方法  
blob 和 arraybuffer 都是二进制容器，后者更底层可以更改具体的 blob 可以看成一个集合只能分块，因此他们的应用场景不一样

### XmlRequstHttp

ajax 使用这个实现的，

```js
const getJSON = function (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url, false)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        reject(new Error(xhr.responseText))
      }
    }
    xhr.send()
  })
}
```

### jsbrage 实现原理

JavaScript 是运行在一个单独的 JS Context 中（例如，WebView 的 Webkit 引擎、JSCore）。由于这些 Context 与原生运行环境的天然隔离，我们可以将这种情况与 RPC（Remote Procedure Call，远程过程调用）通信进行类比，将 Native 与 JavaScript 的每次互相调用看做一次 RPC 调用。

在 JSBridge 的设计中，可以把前端看做 RPC 的客户端，把 Native 端看做 RPC 的服务器端，从而 JSBridge 要实现的主要逻辑就出现了：通信调用（Native 与 JS 通信） 和句柄解析调用。

### JSBridge 的通信原理

主要有两种：注入 API 和 拦截 URL SCHEME。
注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。
拦截 URL SCHEME 的主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。

### 同源策略

由于网络安全的原因，因此出现同源策略  
不同域名 端口都会触发 会把 dom 数据 和 网络隔离
类似的解决方案 引入 script 脚本 postmessage 传输数据 cros 访问网络资源

解决跨域 cros ng 代理 jsonp

### 前后端加密的方法有哪些

md5 sha1 sha256 非对称加密（RSA 利用公钥匙）

### unknown 和 any 有什么区别？

any 不需要缩小类型 而 unkonwn 不缩小的无法通过

### 如何实现深考呗

```js
1.函数实现
function deepClone(obj) {
  var cloneObj = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj == "object" && obj != null) {
    for (let i in obj) {
      if (i && typeof obj[i] == "object") {
        cloneObj[i] = deepClone(obj[i])
      } else {
        cloneObj[i] = obj[i]
      }
    }
  }
  return cloneObj
}
2.jsonstringfy 可以实现
3.jq的$.extend 深拷贝
4.loadsh
```

### 深拷贝如何解决循环引用的问题

```js
function find(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i]
    }
  }
  return null
}
function isObject(obj) {
  return typeof obj === "object" && obj != null
}

function deepClone(source, uniqueList) {
  if (!isObject(source)) return source

  if (!uniqueList) uniqueList = [] //   初始化数据

  var target = Array.isArray(source) ? [] : {}

  var uniqueData = find(uniqueList, source)
  if (uniqueData) return uniqueData.target

  uniqueList.push({
    source: source,
    target: target,
  })

  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = deepClone(source[key], uniqueList) //   传入数组
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
```

## 闭包函数相关

### 什么是闭包函数

由于执行 js 代码的时候会在调用栈里面创建执行上下文，执行上下文里有词法环境，变量环境，this，outer（指向外层的执行上下文），根据词法作用于的规则，内部函数总是可以访问外部函数的变量，当我们调用一个外部函数返回一个内部函数，内部函数使用了外部的变量，即使调用的函数销毁了，但是内部函数调用的变量还是存在内存里（堆，栈里用的是地址），把这些变量的集合称为外部函数的闭包

### 闭包函数如何回收

闭包函数使用不当会造成内存泄漏，当我们在全局函数使用闭包时候，只有当页面关闭的时候会销毁，如果这个时候闭包函数没被调用，那么就造成了内存泄漏，如果是在局部环境使用闭包，那么当下次浏览器执行垃圾回收的时候，判断这块内容是否还在使用，如果未使用咋垃圾回收器就会回收这段内存

## 什么是作用域链

当一段代码使用了一个变量时，JavaScript 引擎首先会在“当前的执行上下文”中查找该变量，，如果在当前的变量环境中没有查找到，那么 JavaScript 引擎会继续在 outer 所指向的执行上下文中查找

## this 相关

### js 中的 this 是什么？

this 是和执行上下文绑定的，执行上下文分为全局上下文，函数中上下文和 eval 中的上下文，那么 this 也就只有这三种——全局执行上下文中的 this、函数中的 this 和 eval 中的 this。

### this 的指向？

1. 严格模式下 默认调用一个函数，this 的指向 underfind
2. 普通模式下 this 指向 window
3. 函数指向调用者
4. 箭头函数因为不存在执行上下文因此他没有 this ，所以他的 this 继承了父级的 this
5. 构造函数中的 this 指向 new 的对象，constrater 中指向当前类

## new 的过程发生了什么

1. new 先创建了一个新的对象
   let obj = new Object();
2. 我们将这个空对象的**proto**成员指向了原函数对象 prototype 成员对象;
   obj.proto = person.prototype
3. 修改 this 到 obj 上。
   person.call(obj)
4. 如果构造器没有手动返回对象，则返回第一步创建的新对象，如果有，则舍弃掉第一步创建的新对象，返回手动 return 的对象。

## 设计模式有哪些

工厂模式 传入参数就可以创建实力  
单列模式 vue 和 vuex 有且只有一个实例  
发布订阅 事件机制  
观察者模式 响应式实现  
装饰者 @  
策略模式 策略模式指对象有某个行为,但是在不同的场景中,该行为有不同的实现方案-比如选项的合并策略

## 登录方式有哪些

1. session 机制 简单的后端应用 后端处理安全
   存在服务端 利用 cookie 容易 crsf 维护成本高
2. token 模式 适合大部分分布式后端架构
   存在客户端 可以不用 cookie
3. 单点登录 适合大型企业 统一内部登录 我们公司就是 当然还兼通了 token 模式
   各个子系统不需要参与登录，会存在一个 sso 认证中心，登录时候会重定向到 sso 并且附上回调地址，输入账号和密码登录之后向 sso 的 cookie 写入登录状态 sso 会给各个子系统发送一个 passport，重定向回来之后会带上一个标识字段，前端再用这个授权码去向认证中心验证，成功之后将登陆信息写入 cookie，这时候客户端是有两个 cooki 的一个是子系统的一个是 sso 的，这时候如果再前往 b 系统，因为之前登录有，认证中心判断 cookie 存在，就不需要输入账号和密码了直接就回调返回携带授权码，继续发起请求即可。
4. 授权登录 简单易用
   就是去向第三方发起请求 对接 api 即可

## commonJS AMD CMD UMD es6 模块化的区别

1. commonJS 是同步加载模块，主要应用在 node 服务端，通过 module.export 导出 require 引入，通常一个文件就是一个模块，拥有自己的独立作用域名，内部的变量和和函数不能被外界访问，
   node 模块会缓存，第二次访问会从缓存中取，
2. AMD 异步加载模块规范，他是在浏览器端开发的模块规范，使用 AMD 规范开发的时候需要引入 require.js 函数库，并且 AMD 是前置依赖，在 define 定义的时候第一个参数就要吧依赖全部声明，
   然后依赖加载完之后才会执行回掉函数 define 定义 require 引入

```js
define('moduleName',['a','b'],function(ma, mb) {
    return someExportValue;
})

require(['a', 'b'], function(ma, mb) {
    //    do something

```

3. CMD 是另外一种模块化规范，和 AMD 类似，不同的是 AMD 是前置依赖，CMD 是就近依赖 ，延迟执行，这个规范其实就是 sea.js 推广过程产生的
4. UMD 整合了 commonJS 和 AMD 规范，希望能解决跨平台的方案  
   原理：首先回去判断是否是 exports，存在则使用 commonjs 规范加载，然后去判断是否有 define 如果存在就是用 amd 加载，否则就挂在 window 上吧

```js
;(function (window, factory) {
  if (typeof exports === "object") {
    module.exports = factory()
  } else if (typeof define === "function" && define.amd) {
    define(factory)
  } else {
    window.eventUtil = factory()
  }
})(this, function () {
  //    do something
})
```

5. es6 模块化 通过 exports default 导出。用 import 来导入，可以通过对导出内容进行解构。ES6 模块运行机制与 commonjs 运行机制不一样。js 引擎对脚本静态分析的时候，遇到模块加载指令后会生成一个只读引用。等到脚本真正执行的时候。才会通过引用模块中获取值，在引用到执行的过程中，模块中的值发生变化，导入的这里也会跟着发生变化。ES6 模块是动态引入的。并不会缓存值。模块里总是绑定其所在的模块。
