---
title: webpack
date: 2022-1-1
---
<!--
 * @Descripttion: ----描述----
 * @version: 1.0
 * @Author: 张鹏
 * @Date: 2022-01-01 23:14:49
 * @LastEditors: 张鹏
 * @LastEditTime: 2022-01-01 23:36:18
-->

## 项目优化

### 如何分析
1. 使用speed-measure-webpack-plugin 分打包速度
2. webpack-bundle-analyzer 可视化分析包的小，是否重复和是否有无用的包

### 优化打包速度
1. 优化loader的范围 
2. cache-loader 缓存loader解析结果 不能乱用 对一些开销大的loader 使用
3. 开启多线程打包  
因为node是单线成的 所以webpack 打包也是单线成的 可以将多个loader解析器分给多个线程并行处理
happypack 和 thread-loader
4. webpack-parallel-uglify-plugin 
webpack3之前是使用uglify来压缩代码的但是是单线成的，我们可以使用这个插件来多线程压缩，在 Webpack4 中，我们就不需要以上这些操作了，只需要将 mode 设置为 production
5. DllPlugin&DllReferencePlugin
可以提前讲一下公用的库 单独拎出来打包进动态链接库，后续打包的时候就不会再次打包，只有当我们动态库发生变化的时候才需要重新打包，也做到了将公共代码抽离单独文件的作用
6. noparse 可以用于配置那些模块文件的内容不需要进行解析（即无依赖）如jq
7. ignorePluge 用于忽略某些特定的模块，让webpack 不把这些指定的模块打包进去。
8. 别名resolve.alisa 取消后缀resolve.extensions
### 优化打包体积
1. 图片压缩 imgae-webpack-loader
2. css无用代码的去除去 purgecss-webpack-plugin
3. treeShaking 摇树
4. 可以使用cnd加载 不考虑内网的话
5. 按需打包 只加载需要的包 一般按模块分
6. compresion-webpack-plugin开启gzip 需要服务端配合和浏览器支持
7. CommonsChunkPlugin 提取公共代码块
8. 关闭sourcemap