# 工大校园集市后台管理

> 这是一个校园二手市场的后台管理项目。基于一个现今主流的 vue admin 后台管理模板项目：vue-admin-template ，以及 elementUI 组件库进行开发

## 相关项目

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [vue-admin-template](https://github.com/maaye3210/vue-admin-template)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/maaye3210/HIT-SecondaryMarket.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
