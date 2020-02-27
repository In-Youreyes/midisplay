const path = require('path'); //处理绝对路径方法
const uglify = require('uglifyjs-webpack-plugin'); //压缩js代码
const htmlWebpackPlugin = require('html-webpack-plugin'); //处理html代码
const autoprefixer = require('autoprefixer'); //css兼容性前缀
// const miniCssExtractPlugin = require('mini-css-extract-plugin'); //提取css

const config = {
	mode: 'development',//development
	entry: {
		list: path.resolve(__dirname, './src/js/List.js'),
		index: path.resolve(__dirname, './src/js/Index.js'),
		detail: path.resolve(__dirname, './src/js/Detail.js'),
		cart: path.resolve(__dirname, './src/js/Cart.js'),
		order: path.resolve(__dirname, './src/js/Order.js')
	},
	output: {
		path: path.resolve(__dirname + '/dist'),
		filename: 'js/[name].js'
	},
	module: { //加载模块
		rules: [ //加载规则
			{
				test: /\.js$/, //js文件
				loader: 'babel-loader',
				exclude: path.resolve(__dirname, 'node_modules'), //忽略模块
				query: {
					'presets': ['latest'] //最新版本
				}
			},
			{
				test: /\.tpl$/, //tpl模板解析
				loader: 'ejs-loader', //将EJS模板文件当做一个函数输出
			},
			{
				test: /\.scss$/, //解析sass
				use: [
					// { //提取css文件
					// 	loader: miniCssExtractPlugin, 
					// 	options: {
					// 		hmr: process.env.NODE_ENV === 'development' //热替换
					// 	}
					// },					
					'style-loader', //导出样式			
					'css-loader',
					{
						loader: 'postcss-loader', //兼容前缀
						options: {
							plugins: function () {
								return [autoprefixer('last 5 versions')] //兼容5个版本
							}
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|ico)$/i, //处理图片
				loader: [
					'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
					'image-webpack-loader'
				]
			}
		]
	},
	plugins: [
		new uglify(), //压缩混淆js
		new htmlWebpackPlugin({
			minify: { //压缩
				removeComments: true, //去注释
				collapseWhitespace: true //去空格
			},
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/index.html'), // 打包模板
			title: '小米手机官网',
			favicon: path.resolve(__dirname, 'src/favicon.ico'),
			chunksSortMode: 'manual', //手动排序
			chunks: ['index'], //排序模块 
			excludeChunks: ['node_modules'],
			hash: true
		}),
		new htmlWebpackPlugin({
			minify: { //压缩
				removeComments: true, //去注释
				collapseWhitespace: true //去空格
			},
			filename: 'list.html',
			template: path.resolve(__dirname, 'src/list.html'), // 打包模板
			title: '搜索结果',
			favicon: path.resolve(__dirname, 'src/favicon.ico'),
			chunksSortMode: 'manual', //手动排序
			chunks: ['list'], //排序模块
			excludeChunks: ['node_modules'],
			hash: true
		}),
		new htmlWebpackPlugin({
			minify: { //压缩
				removeComments: true, //去注释
				collapseWhitespace: true //去空格
			},
			filename: 'detail.html',
			template: path.resolve(__dirname, 'src/detail.html'), // 打包模板
			title: '手机详情',
			favicon: path.resolve(__dirname, 'src/favicon.ico'),
			chunksSortMode: 'manual', //手动排序
			chunks: ['detail'], //排序模块
			excludeChunks: ['node_modules'],
			hash: true
		}),
		new htmlWebpackPlugin({
			minify: { //压缩
				removeComments: true, //去注释
				collapseWhitespace: true //去空格
			},
			filename: 'cart.html',
			template: path.resolve(__dirname, 'src/cart.html'), // 打包模板
			title: '购物车',
			favicon: path.resolve(__dirname, 'src/favicon.ico'),
			chunksSortMode: 'manual', //手动排序
			chunks: ['cart'], //排序模块
			excludeChunks: ['node_modules'],
			hash: true
		}),
		new htmlWebpackPlugin({
			minify: { //压缩
				removeComments: true, //去注释
				collapseWhitespace: true //去空格
			},
			filename: 'order.html',
			template: path.resolve(__dirname, 'src/order.html'), // 打包模板
			title: '订单详情',
			favicon: path.resolve(__dirname, 'src/favicon.ico'),
			chunksSortMode: 'manual', //手动排序
			chunks: ['order'], //排序模块
			excludeChunks: ['node_modules'],
			hash: true
		})
		// ,new miniCssExtractPlugin({
		// 	filename: 'css/[name].css'
		// })
	],
	devServer: {
		watchOptions: { //监听选择
  		ignored: /node_modules/ //忽略监听
  	},
		host: 'localhost', //主机
		port: 80, //端口
		disableHostCheck: true // 转发
	}
}

module.exports = config;







