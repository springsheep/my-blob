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
 * @LastEditTime: 2022-01-08 16:17:34
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
### webpack glup grunt 的不同
三者都是前端构建工具，grunt 和glup 前期比较主流，现在webpack比较流行，但是一些轻量的工具还是会选择glup比如单独打包css   
grunt和glup是基于任务和流的，类似于jq的链式操作，将构建的过程拆分成一个个task，再控制其关系  
webpack 是基于入口的需要我们找到入口然后递归入口寻找需要的文件，然后调用对应的loader解析文件，plugin是对webpack的拓展

### webpack 构建流程？详细说一下
1. 初始化参数 ，根据配置和shell脚本获取参数
2. 开始编译，根据上面拿到的参数去初始化compiler对象，去加载配置的插件，调用对象中的run方法去执行编译
3. 确定入口：根据entry确定
4. 编译模块：从入口出发，使用模块对应的loader去解析文件，再递归找出模块和模块之间的关系，重复上述操作，最终所有模块解析
5. 编译完成：得到编译后的模块和模块之间的关系
6. 输出资源：根据入口和模块之间的关系，输出包含多个模块的chunk，并且加入输出列表
7. 输出完成：根据配置的输出路径和文件名称，把模块内容写入模块系统

### loader和pludge的区别？
loader是用来对模块的解析，而pludge是对webpack功能的扩展，利用webpack 加载中暴露的各个钩子去做操作改变

### 怎么配置单页应用？怎么配置多页应用？

如果是单页面，则直接在entrys配置入口就行  
如果是多页面，可以使用autowebpludge去自动化构建，前提是目录结构符合规范


