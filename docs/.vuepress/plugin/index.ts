import { searchPlugin } from "@vuepress/plugin-search";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)
export const plugins =[
  searchPlugin,
  registerComponentsPlugin({
		componentsDir: path.resolve(__dirname, '../global_components'),
	}),
]