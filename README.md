<h1 align="center">Lotus UI Tools</h1>

<p align="center">
 <a href="https://npmjs.org/package/@lotus-ui/tools">
   <img src="https://img.shields.io/npm/v/@lotus-ui/tools.svg?style=flat">
 </a>
 <a href="https://npmjs.org/package/@lotus-ui/tools">
   <img src="https://img.shields.io/npm/dm/@lotus-ui/tools.svg?style=flat">
 </a>
</p>

## ✨ 特征

* 🔥 TypeScript: 使用TypeScript编写
* 🏖 babel-plugin-import: 支持[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
* 🎉 module: 直接生成es(esm)、lib(cjs)目录

## 📦 安装

* 项目目录安装

```
// npm 
npm install --dev @lotus-ui/tools

// yarn 
yarn add --dev @lotus-ui/tools
```

* 全局安装

```
// npm
npm install --global @lotus-ui/tools

// yarn 
yarn global add @lotus-ui/tools
```

## 🔨 使用

* 命令行

```
// 在项目目录下执行

// 创建一个组件
lotus-tools create -n button

// 开发
lotus-tools build --watch

// 执行编译 
lotus-tools build
```

## 📝 配置

支持两种配置文件格式

* js: `lotus-tools.config.js`
* ts: `lotus-tools.config.ts`

**配置项**

### libraryDir

* 类型: `String`
* 默认: `components`
* 描述: 组件存放目录

###  createComponent

* 类型: 
```
{
  // 是否支持多语言
  // 默认: true
  locale?: boolean;
  // 组件库前缀
  // 默认: 'lotus'
  prefixCls?: string;
}
```

* 默认: 

```
{
  locale: true,
  prefixCls: 'lotus'
}
```

* 描述: 创建组件配置

**Example**

```
// lotus-tools.config.ts
export default {
  libraryDir: 'examples/components',
  createComponent: {
    locale: false
  }
}
```
