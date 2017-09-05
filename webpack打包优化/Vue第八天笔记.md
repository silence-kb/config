# 支付

## 支付宝、微信支付、银联支付


## 美团WebApp
	买了一个商品准备去付款
	
	当我点击下订单，会把我刚刚的信息，提交到美团的服务器
	
## 买买买，去结算
	步骤:
		1、将我们的商品信息，价格信息，用户信息提交给我们的后台，生成订单信息
			前端的工作
			
		2、服务器接收到了请求，生成订单信息，重定向到支付界面
			order_no product_name   price  order_status
			1001      iphone6		28900     0(未支付)
											  1(已支付)
			
		3、支付界面，用户选择某种支付方式，当点击了确认支付之后，发送请求给我们公司的服务器
			前端的工作
		
		4、我们的服务器接收到这个请求之后，会生成相应平台的支付信息
		
		5、把生成好的对应平台(支付宝)的支付信息(很长)，返回个浏览器
		
		6、浏览器拿到这些之后，通过window.location.href="xxx",跳转支付宝了
			前端工作
		
		7、用户和支付宝交互，用户支付成功，扣用户的前，达到我们公司的支付宝账户
		
		8、支付宝发消息给我们自家的服务，告诉我们服务器，订单号为1001，已经成功的支付
		
		9、我们自家的服务器，把订单号为1001的支付状态，改成1(已支付)
	
----------------------------

## 支付宝支付步骤

### 文档
	https://docs.open.alipay.com/203
	
	建议：在真正需要使用的时候，再去看新的文档

### 哪些人参与
	老板/财务
	
	后台
	
	前台:
		前端
		iOS
		Android
		
		openURL("/xxx")
		com.alipay.xxx

### 步骤

	前提:
		我们公司和支付宝签约，一般是公司
		公司的老板/财务会拿着工商营业执照，公章，纳税征税
		
		商户的id:2088xxxxxxx   16位
		支付宝的合作商户
		
		后台会在我们公司支付宝账号后台的管理系统里面设置一些信息
		公钥:如何生成公钥&私钥
			
		
		RSA:
			公钥&私钥 	鸳鸯
			
			私钥加密  > 公钥解密
	
	正式接入:(前后台要一起)
		后台会生成最终支付宝支付需要的信息
			https://mclient.alipay.com/home/exterfaceAssign.htm?alipay_exterface_invoke_assign_client_ip=47.74.6.253&body=美团订单-120885176348451504576595&subject=美团订单-120885176348451504576595&sign_type=RSA&notify_url=http://10.110.162.16:8966/paygate/notify/alipay/paynotify/wap&out_trade_no=120885176348451504576595&return_url=https://meishi.meituan.com/i/order/result/3917023245&sign=aBL95E1KWgc+HxjVaPhbLa8Xv7Kv+MU8wj+FZ3RHbSLrqvLjp6oq6rnLe6kBu9pX/dFwWsWaLyGq0S90L/UbqHHhyTN5Pt0QtFY+MxYQe6H419Bn8aygPzJ16occOZXl4Iysb/eEP36tSmGLXuehLKRd0S+jl1zwtFAUiP1uEJo=&_input_charset=utf-8&it_b_pay=1440m&alipay_exterface_invoke_assign_target=mapi_direct_trade.htm&alipay_exterface_invoke_assign_model=cashier&total_fee=128&goods_type=0&service=alipay.wap.create.direct.pay.by.user&seller_id=2088311465207164&partner=2088311465207164&alipay_exterface_invoke_assign_sign=_b_eno1_h_tx_hwb+_k_se_r9b_zyp_ss6_wm_r_dia_gox_w_p_f_u3pq_i2_st_p_p_dta_ken3_a==&payment_type=1
			
		前端：
			拿着这一些，调用window.location.href="xxxx"

----------------------------

## 项目压缩打包上线

### 最终要达到的目的
	把生成好的html,js,css，发布到阿里云、新浪云
	
### 项目里面的源代码优化打包压缩等一系列操作
	gulp
	webpack
	
### webpack进行代码的压缩打包
	步骤：
		1、新建一个配置文件，生产阶段专用的
		
		2、把开发阶段里面的配置文件的代码，拷贝一份到生产阶段里面去
		
		3、打包操作
			webpack 入口文件 输出文件
			webpack 配置文件.js
			项目中打包:webpack --config webpack.publish.config.js
			
		注意点：
			html-webpack-plugin作用
			
			开发阶段:根据参照文件，在内存中生成index.html
			生产阶段:根据参照文件，在目标文件夹(dist)生成一个实实在在的index.html
			
			上面两个都会自动帮我们导入bundle.js

### 发现的问题
	1、bundle.js体积过大 1.61M
		浪费带宽，浪费用户流量，加载速度慢，用户体验不好
		
	2、html也没压缩 1.03KB
	
### 如何优化
	1、压缩bundle.js、压缩html、干掉不必要的注释
	
	
### 压缩bundle.js
	1、使用 babel 把我们Vue项目中的es6转成es5
		参考:https://babeljs.io/docs/setup/#installation
		
		使用babel:
			1、安装包
				cnpm i babel-loader babel-core babel-preset-env --save-dev
				
			2、在loader中配置
				rules: [
				    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
				]
				
			3、在项目根目录下，建立一个babel的配置文件写上预设就行了
				
		

	2、压缩js使用UglifyJs
		目前主要支持es5的压缩
		参考:
			https://cn.vuejs.org/v2/guide/deployment.html
			
		在plugins中，配置如下
			new webpack.DefinePlugin({
	            'process.env': {
	              NODE_ENV: '"production"'
	            }
	        }),
	        new webpack.optimize.UglifyJsPlugin({
	            compress: {
	                warnings: false
	            }
	        })
	        
	 3、上面这两步之后，还会报错（是因为项目中使用vue-preview）
	 	ERROR in bundle.js from UglifyJs
			Unexpected token: name ($vm) [bundle.js:38442,4]
			
	 	解决办法，在loader针对vue-preview再配置个loader
	 		{
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
          	}

----------------------------
