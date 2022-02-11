module.exports = {
   base: '/interview/',
   "title": "春天的小绵羊",
   "description": "享受时光吧，工程狮🦁️",
   "dest": "public",
   "head": [
      [
         "link",
         {
            "rel": "icon",
            "href": "/favicon.ico"
         }
      ],
      [
         "meta",
         {
            "name": "viewport",
            "content": "width=device-width,initial-scale=1,user-scalable=no"
         }
      ]
   ],
   "theme": "reco",
   "themeConfig": {
      subSidebar: 'auto',
      "nav": [
         {
            "text": "主页",
            "link": "/",
            "icon": "reco-home"
         },
         {
            "text": "更新记录",
            "link": "/docs/version",
            "icon": "reco-date"
         },
         {
            "text": "留言板",
            "link": "/messageboard/index.md",
            "icon": "reco-home"
         },
         {
            "text": "文档",
            "icon": "reco-message",
            "items": [
               {
                  "text": "知识点",
                  "link": "/docs/components/"
               },
            ]
         },
         {
            "text": "Contact",
            "icon": "reco-github",
            "items": [
               {
                  "text": "GitHub",
                  "link": "https://github.com/springsheep/interviewSummary",
               },
               {
                  "text": "CSDN",
                  "link": "https://blog.csdn.net/weixin_44823323?type=blog",
               },
               {
                  "text": "语  雀",
                  "link": "https://www.yuque.com/mouse-znyb8/hril9g/scrkm0",
               },
               {
                  "text": "个人简历",
                  "link": "https://vue3.vip/zhangpeng.pdf",
               }
            ]
         }
      ],
      "sidebar": {
         "/docs/other/": [
            "",
            "theme",
            "plugin",
            "api"
         ],
         "/docs/components/": [
            "",
            'js',
            'vue',
            'webpack',
            'browser',
            'micro-front-end',
            'git',
            'nginx'
         ],

      },
      "type": "blog",
      "blogConfig": {
         "category": {
            "location": 2,
            "text": "博客"
         },
         "tag": {
            "location": 3,
            "text": "分类"
         }
      },
      "friendLink": [
         {
            "title": "午后南杂",
            "desc": "Enjoy when you can, and endure when you must.",
            "email": "1156743527@qq.com",
            "link": "https://www.recoluan.com"
         },
         {
            "title": "vuepress-theme-reco1",
            "desc": "A simple and beautiful vuepress Blog & Doc theme.",
            "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
            "link": "https://vuepress-theme-reco.recoluan.com"
         }
      ],
      "logo": "/logo.png",
      "search": true,
      "searchMaxSuggestions": 10,
      lastUpdated: 'Last Updated', // string | boolean
      "author": "张鹏",
      "authorAvatar": "/photo.png",
      "record": "菲菲专享版 ©2018-2022",
      "startYear": "2017",
      valineConfig: {
         appId: 'BOF2aVTCEQJn0Py31n6XgnkX-gzGzoHsz',// your appId
         appKey: 't57InQaQSoUVPdYJd5tIJPsV', // your appKey
      }
   },
   plugins: [
      // ["@vuepress-reco/vuepress-plugin-bgm-player", {
      //    audios: [
      //       // 网络文件示例
      //       // {
      //       //    name: '강남역 4번 출구',
      //       //    artist: 'Plastic / Fallin` Dild',
      //       //    url: 'https://assets.smallsunnyfox.com/music/2.mp3',
      //       //    cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
      //       // },
      //       {
      //          name: '用胳膊当枕头',
      //          artist: '최낙타',
      //          url: 'https://assets.smallsunnyfox.com/music/3.mp3',
      //          cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
      //       }
      //    ],
      //    autoShrink: true
      // }],
      // [
      //    "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      //    {
      //       // 'izumi', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'shizuku', 'wanko', 'miku', 'z16
      //       theme: ['haruto'],
      //       clean: false,
      //       messages: {
      //          welcome: '我是lookroot欢迎你的关注 ',
      //          home: '心里的花，我想要带你回家。',
      //          theme: '好吧，希望你能喜欢我的其他小伙伴。',
      //          close: '再见哦'
      //       }
      //    }
      // ],
      // ["sakura", {
      //    num: 20,  // 默认数量
      //    show: true, //  是否显示
      //    zIndex: -1,   // 层级
      //    img: {
      //       replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
      //       // httpUrl: './logo.png'     // 绝对路径
      //    }
      // }]
      // ,

      [
         'vuepress-plugin-comment',
         {
            choosen: 'valine',
            visitor: true, // 阅读量统计
            // options选项中的所有参数，会传给Valine的配置
            options: {
               el: '#valine-vuepress-comment',
               appId: 'AfFAE0L44yanB796wFczMbzG-gzGzoHsz',
               appKey: 'dp9nuN1hb1mLaDjqJnV8kd0b'
            }
         }
      ],


   ],
   "markdown": {
      "lineNumbers": true
   }
}