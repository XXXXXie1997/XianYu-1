#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build
# cd 到构建输出的目录下
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'
git branch -M main


 git push -f git@github.com:XXXXXie1997/XianYu-1-website.git main:gh-pages

cd -
