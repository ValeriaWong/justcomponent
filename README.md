# 项目介绍
全员无项目经验小白，最终仅两人开发，一个月内完成devops并按规范控制代码质量，vue3+ts+vite构建的组件库，现包含组件6个，其中核心需求复杂组件共2个全部完成。

文档站预览地址  http://39.101.72.88:8081/ 

项目发布地址（尚未发布在npm） http://39.101.72.88/

原代码地址 https://gitlab.com/JasonGuo1/jenkins-gitlab-demo/-/tree/dev 注：dev分支

## 技术栈：Vue 3 + TypeScript + Vite + SCSS
- 所有的组件都是基于SCSS Modules开发的，可以有效避免SCSS命名冲突的问题
- 构建工具 ：vite
- 测试工具：单元测试  jest
- 集成测试：cypress，但截至本文档提交之日尚未进行集成测试
- 代码审查工具 
   - 使用 ts ， vscode作为IDE自动检查
- code style：  eslint+prettier+stylelint+lint-staged+husky＋commonlint

## DevOps：jenkins+ngnix

## 文档站生成：vuepress

## 规范
### 设计原则
组件的单一职责、组件的可复用性、组件的可配置性等等。

### 开发模式
我们采用了TDD开发模式，每个组件都有完整的测试用例。

### github flow
在开发流程上，我们采用了Github Flow的流程，使用Github进行版本管理和协作开发。

### Git commit 
遵循 类angular 规范 （有husky+commitlint+lint-staged强制控制，如果不符合将不予commit）
`type: (scope)subject #issueNum`
每人负责的组件user story 应建立 #issue 及 README.md 

### 测试用例命名及位置存放规范
 - 根据 jest 约定：
    - 功能函数对应的测试函数放在__tests__目录中功能函数所对应的目录中；
    - 测试的函数的文件名会是 fun.spec.js。 比如 add.js => add.spec.js。

---

# Contributors

Valeria 
JasonGuo1

---

# 后续开发计划

- 日期时间选择器优化

- 优化项目结构

- icon组件开发

- 七彩进度条

- 布局

...

---


# Use 

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
