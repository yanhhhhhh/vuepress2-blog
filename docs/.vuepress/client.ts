import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    console.log('client enhance')

    
    console.log({ app, router:router.getRoutes(), siteData })
  },
  setup() {},
  rootComponents: [],
})