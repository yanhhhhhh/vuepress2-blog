

# vuepress 

## 介绍
VuePress 是一个以 Markdown 为中心的静态网站生成器。你可以使用 Markdown 来书写内容 (如文档、博客等) ，然后 VuePress 会帮助你生成一个静态网站来展示它们。

## 工作原理
一个 VuePress 站点本质上是一个由 `Vue` 和 `Vue Router`驱动的单页面应用 (SPA)。

路由会根据你的 Markdown 文件的相对路径来自动生成。每个 Markdown 文件都通过 `markdown-it` 编译为 HTML ，然后将其作为 Vue 组件的模板。因此，你可以在 Markdown 文件中直接使用 Vue 语法，便于你嵌入一些动态内容。

- 在开发过程中，我们启动一个常规的开发服务器 (dev-server) ，并将 VuePress 站点作为一个常规的 SPA。

- 在构建过程中，我们会为 VuePress 站点创建一个服务端渲染 (SSR) 的版本，然后通过虚拟访问每一条路径来渲染对应的 HTML。

## 页面
### 路由
### Frontmatter

Markdown 文件可以包含一个 YAML Frontmatter 。Frontmatter 必须在 Markdown 文件的顶部，并且被包裹在一对三短划线中间。下面是一个基本的示例:
```
---
lang: zh-CN
title: 页面的标题
description: 页面的描述
---
```
:::tip
Frontmatter 优先级最高,Markdown 配置了Frontmatter 将会覆盖`defineUserConfig`中的站点配置
:::


#### 添加 Frontmatter配置项
> 使Markdown 中的toc 可配置,使用`extendsPageOptions`
```
import { defineUserConfig } from "vuepress";
export default defineUserConfig({

	
	extendsPageOptions: (pageOptions, app) => {
		pageOptions.frontmatter = pageOptions.frontmatter ?? {};
		pageOptions.frontmatter.toc = false;
	},
});

```

## 配置
[VuePress配置](https://v2.vuepress.vuejs.org/zh/)
### navbar
```js
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
```
![navbar](/images/introduction/navbar1.jpg)
### siderbar
#### 

#### 设置根据页面标题自动生成的侧边栏的最大深度为6
1. sidebarDepth:6
2. markdown.headers.level:[2,3,4,5,6]
#### 自动生成侧边栏
使用 `siderbar:auto`

## Markdown
页面的主要内容是使用 Markdown 书写的。VuePress 首先会将 Markdown 转换为 HTML ，然后将 HTML 作为 Vue 单文件组件的 `<template> `。

借助 markdown-it 和 Vue 模板语法的能力，基础的 Markdown 可以得到很多的扩展功能。
### Markdown 中使用模板语法

```md
<span v-for="i in 3"> span: {{ i }} </span>

```
### Markdown 中使用Vue 组件

[exmple](../markdown/markdown-vue.md)

#### 注册组件（方式一）
`enhance` 函数既可以是同步的，也可以是异步的。它接收一个 Context 参数，包含以下属性：

app 是由 `createApp` 创建的 Vue 应用实例。
router 是由 `createRouter` 创建的路由实例。
siteData 是一个根据用户配置生成的 Ref 对象，包含 `base, lang, title, description, head 和 locales`。
enhance 函数会在客户端应用创建后被调用，你可以对 Vue 应用添加各种能力。


通过 app.component 方法来注册 Vue 全局组件：
```
import { defineClientConfig } from '@vuepress/client'
import MyComponent from './MyComponent.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('MyComponent', MyComponent)
  },
})
```


#### 注册组件（方式二）
1. 安装@vuepress/plugin-register-components
   ```
   pnpm install @vuepress/plugin-register-components@next
   ```

2. 将 docs/.vuepress/global_components 下的vue文件自动注册为 Vue 组件
```
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)
export const plugins =[

  registerComponentsPlugin({
		componentsDir: path.resolve(__dirname, '../global_components'),
	}),
]
```

## 架构
[架构](https://v2.vuepress.vuejs.org/zh/advanced/architecture.html)
<!-- [架构](./architecture.md) -->
## 插件
### 官方插件
[插件列表](https://v2.vuepress.vuejs.org/zh/reference/plugin/back-to-top.html)
### 社区插件
[Awesome VuePress](https://github.com/vuepressjs/awesome-vuepress#plugins)
### 自定义插件
#### 插件api

## 主题
### 默认主题

### 继承主题
#### 布局插槽
默认主题的 `Layout` 布局提供了一些插槽：

- `navbar`
- `navbar-before`
- `navbar-after`
- `sidebar`
- `sidebar-top`
- `sidebar-bottom`
- `page`
- `page-top`
- `page-bottom`
- `page-content-top`
- `page-content-bottom`
  
  ![layout](/images/introduction/layout.png)
1. 首先，创建一个客户端配置文件 .vuepress/client.ts :
 ```js
import { defineClientConfig } from '@vuepress/client'
import Layout from './layouts/Layout.vue'

export default defineClientConfig({
  layouts: {
    Layout,
  },
})
 ```

2. 创建 .vuepress/layouts/Layout.vue ，并使用由默认主题的 Layout 布局提供的插槽：

```js
<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="my-footer">This is my custom page footer</div>
    </template>
  </ParentLayout>
</template>

<style lang="css">
.my-footer {
  text-align: center;
}
</style>
```
 ![layout-slot](/images/introduction/layout-slot.png)


#### 组件替换
> 替换默认主题提供的某个组件


### 自定义主题
默认主题将所有 `非全局的组件` 都注册了一个带 @theme 前缀的` alias` 。例如，Navbar.vue 的别名是 @theme/Navbar.vue 

想要替换 Navbar.vue 组件，只需要在配置文件 .vuepress/config.ts 中覆盖这个别名即可：

```ts
import { getDirname, path } from "@vuepress/utils";
import { defaultTheme, defineUserConfig } from "vuepress";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  theme: defaultTheme(),
  alias: {
    "@theme/HomeFooter.vue": path.resolve(
      __dirname,
      "./components/MyHomeFooter.vue"
    ),
  },
});
```







## VuePress 官方文档
[VuePress](https://v2.vuepress.vuejs.org/zh/)

## VuePress packages
vuepress 默认主题@vuepress/theme-default
vuepress 工具类 @vuepress/utils
Node API @vuepress/core,其中 提供插件API
客户端API @vuepress/clien

