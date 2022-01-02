###
 # @Descripttion: ----描述----
 # @version: 1.0
 # @Author: 张鹏
 # @Date: 2021-12-24 14:29:05
 # @LastEditors: 张鹏
 # @LastEditTime: 2021-12-29 16:03:24
### 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd public

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io  填写你刚刚创建的仓库地址
git push -f https://github.com.cnpmjs.org/springsheep/interviewSummary.git master:gh-pages 

cd -
