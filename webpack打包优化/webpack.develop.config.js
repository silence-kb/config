
var path = require('path')

//在内存中根据参照文件(template.html),生成一个index.html
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/main.js', //打包的入口文件
    output:{ //打包的输出文件
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    },
    module: {
        rules: [
          { 
              test: /\.vue$/, 
              use: 'vue-loader' 
          },
          { 
            test: /\.css$/, 
            loader: [
                { 
                    loader: 'style-loader' 
                },
                {
                    loader: 'css-loader'
                }
            ] 
          },
          {
            test: /\.(ttf|png|svg|gif)$/,
            use: [
              {
                loader: 'url-loader'
              }
            ]
          }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',//在内存中生成文件名称
            template: './template.html' //参照文件
        })
    ]
}