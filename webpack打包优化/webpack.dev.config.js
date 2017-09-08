//每次在webpack中写 的不单单只是js代码 ，是node代码
//require和exports 都是node里面对模块的管理代码 Commonjs   es6 import export

//用来拼接路径
const path=require('path');
//引用webpack
const webpack=require('webpack');
//引用css分离工具
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//自动生成html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引用css 压缩
const  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//引用自动删除 dist
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports={
    //入口
    entry:{
        "bundle":path.join(__dirname,'src','main.js'), 
        "vendor":["jquery"]
        },
    //出口
    output:{
        //路径
        path:path.join(__dirname,'dist'),
        //名称
        filename:'bundle.js',
    },
    //source map
    devtool:'source-map',
    //loader
    module:{
        //规则
        rules:[
            //eslint-loader
            {
                test:/\.js$/,
                use:'eslint-loader',
                exclude: /node_modules/, 
            },
            //loader
            {
                //处理的文件
                test:/\.css$/,
                //通过ExtractTextPlugin分离css央视
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                  })
                //交给那个loader处理  单个用字符串 多个用数组 特殊情况用对象
                //css用来读取样式 style用来将读取的样式插入到页面
                /* 这里只是将css样式进行处理，完成后显示到页面 */
               // use:["style-loader","css-loader"]
            },
            {
                //图片的处理
                test:/\.(jpg|jgeg|png|ttf|gif)$/,
                use:'url-loader?limit=1000&name=[name].[ext]' 
            },
            {
                //es6=>es5
                test: /\.js$/, 
                //排除掉node_modules 中的代码
                exclude: /node_modules/, 
                loader: "babel-loader"
            }
        ]
    },
    //plugin
    plugins:[
        //webpack 本身会含有plugin
        //压缩js 和命令行中-p 是一样的
      //  new webpack.optimize.UglifyJsPlugin()
      //分离js代码
      new webpack.optimize.CommonsChunkPlugin({
          name:'vendor',//分离的名称,
          filename:'vendor.js'
      }),
      //分离css样式
      new ExtractTextPlugin('style.css'),
      //自动生成html
      new HtmlWebpackPlugin({
          //如果有index模板的情况下 title将不起作用
        title:'这是测试title',
        //模板
        template:'./src/index.html',
        //生成的名字和路径
        filename:'index.html',
        //压缩html
        minify:{
            //去除空格
            collapseWhitespace:true,
            //去除注释
            removeComments:true  
        }
      }),
      //压缩css 样式
      new OptimizeCssAssetsPlugin(),
      //自动删除dist文件
      new CleanWebpackPlugin('dist')
    ]
}