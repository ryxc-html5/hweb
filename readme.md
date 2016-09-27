# hweb工程

本问主要介绍说明hweb工程技术相关的问题

#初始化环境步骤
1. 安装node 4.0+
2. 打开命令行工具执行以下步骤

  1. `npm install -g webpack webpack-dev-server`
  2. 进入到工程目录
  3. 执行`npm install`
  4. 执行`npm run dev`开始开发

 3. 打开命令行工具执行以下步骤2

  1.安装nodejs
  2.安装npm
        (1).git clone --recursive git://github.com/isaacs/npm.git
        (2).node cli.js install npm -gf
  3.切换淘宝镜像
      npm config set registry https://registry.npm.taobao.org
  4.npm编译package.json
    npm install
  5.安装webpack
  npm install webpack -g
  6.编译webpack
   webpack
  7.运行
  npm run admindev

  8.跨域设置：
  在浏览器属性--目标中设置：
  --disable-web-security --user-data-dir=D:\chromData

  webpack 编译store目录

  webpack -w  自动编译

  9.访问地址：
  http://localhost:8080/store/#!/good/list

  10.服务端接口地址：
  http://localhost:8085/springmvc-demo/Ucenter/ShopGoods/getShopGoodsList

