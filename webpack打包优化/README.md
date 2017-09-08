# 反馈

```
 	想听课, 又想弄简历弄项目, 徘徊在两者中间, 结果哪个都没弄好... 好纠结,,,
 	其实。。我不在
 	老师说下单线程&多线程
```

- 组件化 （双向/单项）数据绑定 MVVM(Vue) React(View)  指令系统 es6 
- Vue(2016)/Angular(2013)/React(2015)/Jquery(2010)   听课/ 复习前面的js （找工作）

# WebPack

- webpack是一个构建工具，将无序的js 图片 css  html 整合成有序的代码
- webpack 主要功能打包SPA（单页面应用程序）应用  （主入口 出口 loader plugin），gulp
- webpack 1 2(重大更新) 3(增加了某些api 修复了一些bug)
- [官网](https://webpack.github.io/)
- [中文官网](https://doc.webpack-china.org/)
- [webpack2优秀文章](https://github.com/webpack-china/awesome-webpack-cn)

## 步骤
- 1. 全局安装webpack和本地项目安装webpack
    + `npm install -g webpack`(全局)
    + `npm install webpack --save-dev`(本地)
- 2. 在项目中创建webpack.config.js 配置文件（webpack在运行时会去寻找当前项目中是否有webpack.config.js这个配置文件）
- 3. 通过webpack运行 webpack.config.js文件

## webpack cli运行参数

- `webpack --config webpack.dev.config.js` 修改config名称
- `webpack --progress ` 查看进度百分比
- `webpack -p` 压缩代码
- `wepback --color` 给命令行添加颜色
- `webpack -w` 自动监视代码改变并自动打包


## webpack针对错误修复
- 1. 通过console 将怀疑的错打印出来
- 2. 通过source map的方式将其代码还原

## source map(还原js代码 用来查看还原之前的逻辑)
- 在你的webpack.config.js的配置文件中添加 ` devtool:'source-map'`
- source map 只是将你的压缩后的js代码还原
- 在压缩文件找错误 一般来说是寻找代码中的逻辑错误


## 主入口
- 
```javascript
 
const path=require('path')
module.exports={
    //入口 入口既可以是字符串又可以是对象
    entry:path.join(__dirname,'src','main.js'), 
}
```

## 出口 

- 
```javascript
//用来拼接路径
const path=require('path')
module.exports={ 
    //出口
    output:{
        //路径
        path:path.join(__dirname,'dist'),
        //名称
        filename:'bundle.js',
    }
}
```

## loader

- loader 用来做对数据的处理
- css img js(es6=>es5)


### css-loader
- 用来处理css文件
- 需要下载`css-loader style-loader `
- `npm install css-loader style-loader --save-dev` 下载
- 
``` javascript
module:{
        //规则
        rules:[
            //loader
            {
                //处理的文件
                test:/\.css$/,
                //交给那个loader处理  单个用字符串 多个用数组 特殊情况用对象
                //css用来读取样式 style用来将读取的样式插入到页面
                use:["style-loader","css-loader"]
            }
        ]
    }
```

### url-loader
- 图片的处理
- `npm install url-loader --save-dev`
- 如果在没有设置的情况下使用url-loader会将其转换成base64格式图,如果还需要限制
图片格式 可以在url-loader后面做设置，假设图片超过一定大小以后通过file-loader来将图片原样输出 
- 如果传输图片时间过长 用原图片
- 如果网络处理时间长 用base64
- 
```javascript
 {
	//图片的处理
	test:/\.(jpg|jgeg|png|ttf|gif)$/,
	use:'url-loader?limit=1000&name=[name].[ext]' 
}
```
### babel-loader

- babel用来将es6、es7、es8、jsx 语法做转换
- [英文](https://babeljs.io/)
- [中文](http://babeljs.cn/)
- 需要下载babel 
	+ babel-loader 是给webpack使用的，真正核心的代码是babel-core
	+ `npm install babel-loader babel-core --save-dev`
- 如果需要实现babel完全转换es6语法需要`es2015 + stage-0`
	+ 1. 下载`npm install babel-preset-stage-0 babel-preset-es2015 --save-dev`
	+ 2. 下载完成以后还需要配置`.babelrc`文件
		- 
		```
		{
			"presets": ["stage-0","es2015"]
		}
		```


## plugin

- plugin插件用处理loader无法完成的任务

### webpack plugin

- 用来将js代码进行压缩的plugin
- 下载webpack以后
- 
```javascript
const webpack=requrie('webpack')
module.export={
	plugins:[
		//压缩你的js代码
		new  webpack.optimize.UglifyJsPlugin()
	]
}
```

### js拆分
- 单个js包体积不要超过200kb-500kb
- 步骤
	+ 1.对入口进行修改

    ```javascript
     //入口
    entry:{
        "bundle":path.join(__dirname,'src','main.js'), 
        "vendor":["jquery"]
        },
        
    ```
    + 2.对出口也要进行修改
    ```
     plugins:[ 
      //分离js代码
      new webpack.optimize.CommonsChunkPlugin({
          name:'vendor',//分离的名称,
          filename:'vendor.js'//分离后的结果名称
      })
    ]
    ```
### css 分离(ExtractTextWebpackPlugin) 
- 步骤
    + 1. 下载 `npm install --save-dev extract-text-webpack-plugin` 
    + 2. 引用  const ExtractTextPlugin = require ("extract-text-webpack-plugin");
    + 3. 修改之前css-loader处理
    ```javascript
      use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
    ```
    + 4. 分离css样式
    ```
    plugins:[
        //style.css 分离以后的名字
         new ExtractTextPlugin('style.css')  
    ]
    
    ```
### css 压缩
- 步骤 
    + 1. 下载 `npm install --save-dev optimize-css-assets-webpack-plugin`
    + 2. 引入
```javascript
//引用css 压缩
const  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
```    
    + 3. 使用
```javascript
plugins:[
      //压缩css 样式
      new OptimizeCssAssetsPlugin()
]
```
### 自动删除插件
- 步骤
    + 1. 下载`npm install clean-webpack-plugin --save-dev`
    + 2. 引用 `const CleanWebpackPlugin = require('clean-webpack-plugin');`
    + 3. 使用
```javascript
plugins:[
     //自动删除dist文件
      new CleanWebpackPlugin('dist')
]
```    

## eslint（检查js代码规范） 
- eslint 用来检测你的代码规范
- eslint-loader是给webpack使用的 eslint是核心代码
- 步骤
    + 1. 下载 `npm install eslint-loader eslint --save-dev`
    + 2. 配置你的rules
```javascript
rules:[
     {
        test:/\.js$/,
        use:'eslint-loader',
        exclude: /node_modules/, 
    },
]
```
    + 3. 添加配置文件 `.eslintrc`
    + 4. 在配置文件中添加配置内容
```javascript
//将当前的配置文件暴露出去
module.exports={
    //是否启用路径过长的检查
    "root":true,
    //eslint检测空赋值，忽略参数
    "globals":{
        "window":"true",
        "document":"true",
        "$":"true",
        "jquery":"true"
    },
    //eslint检查标准
    "parserOptions":{
        "ecamaVersion":6, //es6的标准检查
        "souceType":"module"  //script modules
    },
    //eslint执行环境
    "env":{
        "browser":true //以浏览器的方式检查代码
    },
    //制定检查规则
    "rules":{
        //0不检查 1警告 2错误
        "no-console":2
    }

}
```

## nrm 切换镜像源工具
- 下载nrm `npm install -g nrm` 
- 查看 `nrm ls`
- 切换 `nrm use taobao`
- 测试速度 值越大越慢 `nrm  test taobao`