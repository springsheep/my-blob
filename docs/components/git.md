---
title: git
sidebarDepth: 2
tags:
 - git
categories:
 - git
date: 2022-01-02
---

::: tip 提示
this is a git
:::

<!-- more -->
## git版本回退

## git回退某个文件到某个版本

## reset 和revert的区别

## 撤销某个文件的某次提交

## git flow

## git merge 和 rebase的区别
1. marge 特点：自动创建一个新的commit  
如果合并的时候遇到冲突，仅需要修改后重新commit  
优点：记录了真实的commit情况，包括每个分支的详情  
缺点：因为每次merge会自动产生一个merge commit，所以在使用一些git 的GUI tools，特别是commit比较频繁时，看到分支很杂乱。
2. rebase 特点：会合并之前的commit历史  
优点：得到更简洁的项目历史，去掉了merge commit  
缺点：如果合并出现代码问题不容易定位，因为re-write了history  
