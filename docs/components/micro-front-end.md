---
title: 微前端
date: 2020-05-29
---

This is  微前端.



## 什么是微前端？
微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略

## 为什么要使用微前端？
* 与技术栈无关 
  不论项目用了什么技术vue react jq等 我都可以无缝衔接
* 方便维护，独立开发 ，独立部署
  比如我们之前的项目巨大，维护成本很高，引入微前端拆分成十几个独立子项目，独立开发打包部署维护
* 每个项目独立运行，状态不共享保证了js沙箱 css样式的隔离，但是也可以进行通信
* 面对复杂的场景的时候，我们老项目技术老旧，很难进行全量的重构升级，但是微前端很好的解决了 可以进行局部升级重构（譬如拆分开，部分功能用vue3 重构）

## 为什么不用iframe？
为什么不用 iframe，这几乎是所有微前端方案第一个会被 challenge 的问题。但是大部分微前端方案又不约而同放弃了 iframe 方案，自然是有原因的，并不是为了 "炫技" 或者刻意追求 "特立独行"。

如果不考虑用户体验问题，那么iframe几乎是最完美的方案

iframe最大的特点就是提供了浏览器的硬隔离方案，不论是js还是样式隔离都完美的解决，但是于此勇士他最大的问题就是他的隔离无法被突破，导致了上下文之间无法共享，带来体验问题

1. url不同步每次刷新url 都会丢失，浏览器的前进后退也无法控制
2. ui不同步，样式完全隔离dom之间不共享，想象一下屏幕的右下方1/4的iframe带了一个遮罩的弹出框，这时候我们要求弹出框屏幕居中，还需要浏览器resize的时候自动居中
3. 慢，每次进入子应用上下文都需要重新建立
4. 全局上下文完全隔离，内存不共享，导致 iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果都无法实现

## 乾坤的特性
1. 📦 基于 single-spa 封装，提供了更加开箱即用的 API。
2. 📱 技术栈无关，任意技术栈的应用均可 使用/接入，不论是 React/Vue/Angular/JQuery 还是其他等框架。
3. 💪 HTML Entry 接入方式，让你接入微应用像使用 iframe 一样简单。
4. 🛡​ 样式隔离，确保微应用之间样式互相不干扰。
5. 🧳 JS 沙箱，确保微应用之间 全局变量/事件 不冲突。
6. ⚡️ 资源预加载，在浏览器空闲时间预加载未打开的微应用资源，加速微应用打开速度。
6. 🔌 umi 插件，提供了 @umijs/plugin-qiankun 供 umi 应用一键切换成微前端架构系统
  

## 如何使用乾坤？
### 主应用
### 1.安装乾坤
```js
yarn add qiankun # 或者 npm i qiankun -S
```
 ### 在主应用注册
```js
 import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:7100',
    container: '#yourContainer',
    activeRule: '/yourActiveRule',
  },
  {
    name: 'vue app',
    entry: { scripts: ['//localhost:7100/main.js'] },
    container: '#yourContainer2',
    activeRule: '/yourActiveRule2',
  },
]);

start();
 ```
### 微应用
微应用不需要额外安装任何其他依赖即可接入 qiankun 主应用。
#### 1. 导出相应的生命周期钩子
微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 bootstrap、mount、unmount 三个生命周期钩子，以供主应用在适当的时机调用。
```js
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {

}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
 
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}
```
### 2. 配置微应用的打包工具

```js
const packageName = require('./package.json').name;

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
};
```

[其他知识请查看官方文档](https://www.yuque.com/kuitos/gky7yw/gesexv)
