# xiaomi_mobile
小米手机官网
====
## 一、项目结构
### 1.构建：使用工具、项目组件化和插件，语法
    1.1使用nodejs为服务器，webpack开发和打包项目文件。
    1.2将页面中的不同功能模块抽成组件，分组件完成页面搭建，业务逻辑，模块化开发。
    1.3使用htmlWebpackPlugin处理html代码，uglify压缩JS代码等，使用scss语法编写css样式，jquery插件编写js代码。
    1.4使用es6，es7语法(async、await)，在package.json中"babel-plugin-transform-runtime": "^version"，并且在项目根目录下新建".babelrc"文件，内容如下：      
      {
        "plugins": [
          [
            "babel-plugin-transform-runtime",
            {
              "absoluteRuntime": false,
              "corejs": false,
              "helpers": true,
              "regenerator": true,
              "useESModules": false
            }
          ]
        ]
      }     
### 2.结构：首页index，搜索列表页list，手机详情页detail，购物车页cart，订单页order
    组件化在不同地方可以共用一个组件，省略大量代码和时间，头部组件底部组件每个页面都需要，可以一次写完多次复用。
    使用class类定义模块，App为父类，三个页面的模块继承此类。
#### 2.1首页index.html
    包括头部组件Header，轮播组件Carousel，列表标题BoardTitle，列表内容ShowBoard，底部组件Footer。
#### 2.2搜索列表页list.html
    包括头部组件Header,列表内容ShowBoard，底部组件Footer。
#### 2.3手机详情页detail.html
    包括头部组件Header，详情页组件DetailBoard，底部组件Footer。
#### 2.4购物车页cart.html
    包括头部组件Header，购物列表组件CartBoard，底部组件Footer。
#### 2.5订单页order.html
    包括头部组件Header，订单列表组件OrderBoard，底部组件Footer。
## 二、数据
### 1.数据模型
#### 1.1请求数据：
    在models文件夹下的index.js中请求api，返回数据到App.js中。
#### 1.2渲染数据：
    定义工具函数，在不同页面的不同组件中使用正则将模板{{}}中内容替换成对应数据，使用jquery将数据模板插入到DOM中。
#### 1.3绑定事件：
    绑定事件在渲染完成之后，使用async、await解决。
### 2.备注
#### 2.1在detail抽出图片组件
    根据图片颜色的length动态添加，图片采用绝对定位，添加上下页查看内容，根据index改变图片的类”isCurrent“显示或隐藏。
#### 2.2刷新页面、添加页和当前页操作，保存url
    2.2.1在list页面刷新页面时重定向基础url，
    2.2.2在Header的Search组件中搜索时
    (1)当前页为首页index和详情页detail，则open添加页并跳转。
    (2)当前页为list，则location.href重定向，并删除存储的url，防止自动刷新
#### 2.3购物操作
    通过localStorage保存购物车内容和已购订单内容，在购物时添加相关提示信息，使用时间戳加随机6位数生成订单号，在购物车页面点击选择按钮计算总价，分别处理单个结算和选中结算，点击删除时刷新页面，区分保存购物车和已购订单
#### 2.4添加鼠标行为预测和图片放大镜
    在使用鼠标滑入nav使用行为预测，判断用户是切换选项(立即切换)还是进入子菜单(设置延时内不切换)，使用放大镜查看图片内容
## 三、结尾
    该项目为小米手机官网商品展示，不包括现金购物，用户数据库后端内容。
