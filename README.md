# antd-admin-boilerplate
以 antd 为基础组件构建的一套中后台管理系统的基本架构模板

## 本项目已废弃

建议使用官方 ant-design-pro

## 预览

http://myqianlan.com/antd-admin-boilerplate/dist/#/login

账户密码随便输入即可

## 目的

使用 antd 和 react 来构建中后台系统，从上家公司开始，已经用来构建过三四个系统了，这个算是沉淀下来的一些东西，放出来给大家参考参考吧。

## 技术栈

- react
- antd
- webpack
- es6(babel)

## 兼容性

原则上支持 IE9+ 及现代浏览器

## 环境

- node 4 LTS 版本
- npm 建议 3+
- webpack 3

> npm 建议使用cnpm, 通过设置 alias 的方式;(在私有npm还没搭建起来的时候)

## 开发

```bash

    cnpm install

    npm run dev

```
### 设置 api 代理

可在 webpack.dev.config.js 里面的 devServer 配置项设置 api 代理

## 其他

其他功能问题请阅读本项目源代码，或者提 issue

## 鸣谢

其中很多代码参考了前同事范峻植的最初版本，在此表示感谢。

## License

MIT
