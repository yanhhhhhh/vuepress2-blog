import { defaultTheme, defineUserConfig } from "vuepress";
import {plugins} from './plugin'
export default defineUserConfig({
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
        // children: [
        //   { text: "介绍", link: "/vuepress2/introduction.md" },
        //   { text: "部署", link: "/vuepress2/deploy.md" },
        // ],
      },
      {text:"Markdown",link:"/markdown/"},
      { text: "Github", link: "https://github.com/yanhhhhhh/vuepress2-blog"},

    ],
    sidebar: {
      '/vuepress2/': [
        {
          text: 'vuepress2',
          children: [
            '/vuepress2/introduction.md',
            '/vuepress2/file-structure.md',
            '/vuepress2/deploy.md'
          ]
        }
      ],
      '/markdown/':[
        {
          text: 'Markdown',
          children: [
            '/markdown/README.md',
          ]
          }
        ]
    }
  }),
  plugins
});
