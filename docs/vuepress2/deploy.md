# 部署

## GitHub Pages and Github Actions

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。
   如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

  如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`

2. 创建 **[Github access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)**;

![Github access token](/images/deploy/1.png)

3. 在你 github 仓库下，创建一个 **[secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)** ，填入刚创建的 `token`
   
![secrets](/images/deploy/2.png)

![secrets](/images/deploy/3.png)

![secrets](/images/deploy/4.png)

4. github 仓库中创建 `gh-pages` 分支
5. 在项目根目录下的 `.github/workflows` 目录（没有的话，请手动创建一个）下创建一个 `.yml` 或者 `.yaml` 文件，如:`vuepress-deploy.yml`
   
```yml
  name: GitHub Actions Build and Deploy Demo
on:
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@main
      with:
          persist-credentials: false

    # 生成静态文件
    - name: Build
      run: yarn install && yarn run docs:build

    # 部署到 GitHub Pages
    - name: Deploy
      # 使用别人写好的一个 action
      uses: JamesIves/github-pages-deploy-action@releases/v3
      with:
        # 这里的 ACCESS_TOKEN 名字需要和下文中的相对应
        ACCESS_TOKEN: ${{ secrets.TOKEN }}
        # 打包后的文件部署到哪个分支上
        BRANCH: gh-pages
        # 打包后的文件在哪里
        FOLDER: docs/.vuepress/dist
```

6. 之后push到 `main 分支` 都会自动执行部署任务，可以从Pages 查看部署网站
![Pages](/images/deploy/5.jpg)