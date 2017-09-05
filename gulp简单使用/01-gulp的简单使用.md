# gulp
```
多个开发者共同开发一个项目，每位开发者负责不同的模块，
这就会造成一个完整的项目实际上是由许多的“代码版段”组成的；

使用less、sass等一些预处理程序，降低CSS的维护成本，最终需要将这些预处理程序进行解析；

合并css、javascript，压缩html、css、javascript、images可以加速网页打开速度，提升性能；
这一系列的任务完全靠手动完成几乎是不可能的，借助构建工具可以轻松实现。
所谓构建工具是指通过简单配置就可以帮我们实现合并、压缩、校验、预处理等一系列任务的软件工具。
常见的构建工具包括：Grunt、Gulp、F.I.S（百度出品）、webpack
```
## 1. gulp简介
* gulp这个软件是用nodejs写的.
* gulp是基于流的自动化构建工具
* 网站开发完成之后,我们要做项目构建,完成之后才可以上线.
* 项目构建:
    * 代码压缩.html css js
    * 代码混淆
    * 文件合并
    * 等其它自动化工作. sass转换为css.
* 这就是gulp做的事情.

## 2. gulp安装
* 首先需要全局安装gulp,如果之前已经全局安装过,可以省略这步.
    ```
    npm install gulp -g 
    全局安装的插件 可以在任意的地方使用.
    本地安装的插件 只能在当前项目中使用.
    使用gulp -v命令查看安装的gulp版本 如果可以看到就说明安装成功.
    ```
*  还需要本地安装,在项目目录中.
    ```
    npm install gulp --save
    ```

## 3. gulp使用
* 在项目目录中新建1个`gulpfile.js`文件.
* 在这个文件中写上构建代码.
* 先引入本地的`gulp`模块
    ```js
    var gulp = require('gulp');
    //这个gulp对象就可以配合插件来进行构建工作.
    ```
### 3.1 创建任务
* gulp是以任务的形式来执行每一项构建化工作.
* 调用gulp对象的task方法可以创建任务
    参数1: 任务名称
    参数2: 回调函数,执行该任务的时候,要做的事情.
    ```js
    gulp.task("testTask",function(){
        console.log();
    });
    ```
* 这个时候,我们就创建了1个任务`testTask`,该任务做的事情就是回调函数的事情.

### 3.2 执行任务
* 如何执行这个gulp任务呢?
* 打开cmd工具,切换工作路径到项目目录
* 在命令行窗口中使用`gulp 任务名称`就可以执行指定的任务.
    ```
    gulp testTask
    ```
* 这个时候,名叫`testTask`的任务就会被执行.

## 4.压缩CSS `gulp-cssmin`
* 需要创建1个压缩css的任务.
    ```js
    var cssmin = require("gulp-cssmin");
    gulp.task("yscss",function () {
        //1.这个任务是用来压缩css的.
        //  那么首先你需要指定需要压缩的css文件
        //  调用gulp对象的src方法,指定要处理的文件的路径.
        gulp.src("./src/assets/css/reset.css")
            .pipe(cssmin())
            .pipe(gulp.dest("./dist/assets/css"));
        //2.pipe()管道理解 阀门形象理解.
        //3.管道中每一个阀门做不同的事情.不同的事情需要插件来完成.
        //  压缩css的插件. gulp-cssmin
        //  安装插件,引入gulp-cssmin
        //  引入后,其实1个函数.
        //  将其在管道中调用,相当于在管道中设置了1个阀门.
        //4.管道最后1关,要调用gulp对象的dest方法,设置存放处理后的路径.
    }); 
    ```

## 5.文件监视 `watch`
* gulp对象提供了一个watch方法
* 该方法的作用,监视指定文件的变化,
* 一旦改动,就执行指定的任务
    ```js
    gulp.task("watchCss",function () {
        //监视指定的css文件.可以使用通配符,一旦文件发送变化,就自动执行yscss任务
        gulp.watch("./src/assets/css/reset.css",["yscss"]);
    })
    ```
* watch方法的第2个参数,还可以是1个回调.当文件发生变化以后,就执行这个回调.


## 5.gulp-uglify 压缩js
* 压缩混淆js代码,需要`gulp-uglify`插件支持.使用npm安装该插件.
    ```js
    //1.引入gulp模块
    var gulp = require("gulp");
    //2.引入gulp-uglify模块.返回的是1个函数.
    var uglify = require("gulp-uglify");
    //3.新建任务
    gulp.task("ysjs",function(){
        gulp.src("./js/app.js")
            .pipe(uglify())
            .pipe(gulp.dest("./dist/js"));
    });
    ```
## 6.gulp-concat 合并文件
* 文件合并需要使用到 `gulp-concat`插件支持.使用npm安装该插件.
    ```js
    gulp.task("concatFile",function(){
        gulp.src(["./src/js/app.js","./src/js/demo.js"])
        .pipe(concat("all.js"))//将待处理的文件进行合并,合并后的新文件的名称为 all.js
        .pipe(uglify())//再混淆
        .pipe(gulp.dest("./dist/js"));
    });
    ```

## 7.gulp-htmlmin 压缩html文件
* 压缩html代码需要使用到 `gulp-htmlmin`插件支持.使用npm安装该插件.
    ```js
    gulp.task("yshtml",function(){
        gulp.src("./src/index.html")
        .pipe(htmlmin({
            collapseWhitespace:true, //去空格
            removeComments:true//去注释
        }))
        .pipe(gulp.dest("./dist"))
    });
    ```

## 8.gulp-sass 将sass转换为 css
```javascript
gulp.task("sass2css",function(){
    gulp.src("./src/css/index.scss")
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/css"));
});
```

## 9. gulp-less 将less转换为 css

## 10. gulp-imagemin 压缩图片 







