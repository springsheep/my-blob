(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{591:function(e,a,l){"use strict";l.r(a);var r=l(5),v=Object(r.a)({},(function(){var e=this,a=e.$createElement,l=e._self._c||a;return l("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[l("h2",{attrs:{id:"项目优化"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#项目优化"}},[e._v("#")]),e._v(" 项目优化")]),e._v(" "),l("h3",{attrs:{id:"如何分析"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#如何分析"}},[e._v("#")]),e._v(" 如何分析")]),e._v(" "),l("ol",[l("li",[e._v("使用speed-measure-webpack-plugin 分打包速度")]),e._v(" "),l("li",[e._v("webpack-bundle-analyzer 可视化分析包的小，是否重复和是否有无用的包")])]),e._v(" "),l("h3",{attrs:{id:"优化打包速度"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#优化打包速度"}},[e._v("#")]),e._v(" 优化打包速度")]),e._v(" "),l("ol",[l("li",[e._v("优化loader的范围")]),e._v(" "),l("li",[e._v("cache-loader 缓存loader解析结果 不能乱用 对一些开销大的loader 使用")]),e._v(" "),l("li",[e._v("开启多线程打包"),l("br"),e._v("\n因为node是单线成的 所以webpack 打包也是单线成的 可以将多个loader解析器分给多个线程并行处理\nhappypack 和 thread-loader")]),e._v(" "),l("li",[e._v("webpack-parallel-uglify-plugin\nwebpack3之前是使用uglify来压缩代码的但是是单线成的，我们可以使用这个插件来多线程压缩，在 Webpack4 中，我们就不需要以上这些操作了，只需要将 mode 设置为 production")]),e._v(" "),l("li",[e._v("DllPlugin&DllReferencePlugin\n可以提前讲一下公用的库 单独拎出来打包进动态链接库，后续打包的时候就不会再次打包，只有当我们动态库发生变化的时候才需要重新打包，也做到了将公共代码抽离单独文件的作用")]),e._v(" "),l("li",[e._v("noparse 可以用于配置那些模块文件的内容不需要进行解析（即无依赖）如jq")]),e._v(" "),l("li",[e._v("ignorePluge 用于忽略某些特定的模块，让webpack 不把这些指定的模块打包进去。")]),e._v(" "),l("li",[e._v("别名resolve.alisa 取消后缀resolve.extensions")])]),e._v(" "),l("h3",{attrs:{id:"优化打包体积"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#优化打包体积"}},[e._v("#")]),e._v(" 优化打包体积")]),e._v(" "),l("ol",[l("li",[e._v("图片压缩 imgae-webpack-loader")]),e._v(" "),l("li",[e._v("css无用代码的去除去 purgecss-webpack-plugin")]),e._v(" "),l("li",[e._v("treeShaking 摇树")]),e._v(" "),l("li",[e._v("可以使用cnd加载 不考虑内网的话")]),e._v(" "),l("li",[e._v("按需打包 只加载需要的包 一般按模块分")]),e._v(" "),l("li",[e._v("compresion-webpack-plugin开启gzip 需要服务端配合和浏览器支持")]),e._v(" "),l("li",[e._v("CommonsChunkPlugin 提取公共代码块")]),e._v(" "),l("li",[e._v("关闭sourcemap")])])])}),[],!1,null,null,null);a.default=v.exports}}]);