import { defaultTheme, defineUserConfig } from "vuepress";
import {plugins} from './plugin'
export default defineUserConfig({
  lang: 'zh-CN',
  base: "/vuepress2-blog/",
  theme: defaultTheme({
    //导航栏
    navbar: [
      { text: "首页", link: "/" ,activeMatch:'^/$'},
      {
        text: "vuepress2",
        link: "/vuepress2/",
        // activeMatch 用于配置高亮规则
        activeMatch: "^/vuepress2/",
        children: [
          { text: "介绍", link: "/vuepress2/introduction.md" },
          { text: "部署", link: "/vuepress2/deploy.md" },
        ],
      },
      {text:"Markdown",link:"/markdown/"},
      { text: "Github", link: "https://github.com/yanhhhhhh/vuepress2-blog"},

    ],
    // sidebar: {
    //   '/vuepress2/': [
    //     {
    //       text: 'vuepress2',
    //       collapsible: true,
    //       children: [
    //         // {
    //         //   text: '介绍',
    //         //   link: '/vuepress2/introduction.md',
    //         //   // collapsible: true,

    //         // },
    //        '/vuepress2/introduction.md',
    //         '/vuepress2/file-structure.md',
    //         '/vuepress2/deploy.md'
    //       ]
    //     }
    //   ],
    //   '/markdown/':[
    //     {
    //       text: 'Markdown',
    //       children: [
    //         '/markdown/README.md',
    //       ]
    //       }
    //     ]
    // },
    // sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 6, // 提取哪些标签作为侧边栏
    contributors: false, // 是否显示文章的最近更新者
     
  }),
   markdown:{
    toc:{
      level:[2,3,4,5,6]
    },
    headers: {
			level: [2, 3, 4, 5, 6],
		},
   },
  plugins
});
