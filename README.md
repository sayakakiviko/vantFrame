## 含elementUI的vue2.5框架
- API接口除正常调用外，某些API接口为前置接口数据返回id拼接而成，这样的接口定义时正常定义，调用时url需重新指向：
```javascript
//定义
export default [
  {
    name: 'who',
    method: 'GET',
    desc: '获取用户信息',
    path: '/getAPI/${id}/who'
  }
];

//调用
let id = 'sad53fd';
this.$api['common/who'](
      {}, //参数
      {url: `/getAPI/${id}/who`}
    )
      .then(res => {})
      .catch(e => {});
```
- @/utils下有已经封装好的自定义指令、原生方法、过滤器等方法
- @/config/interceptor/axios.js下可配置接口里一些通用的选项，比如加时间戳、给请求头加参数等

## SPARKLE-VUE-ADMIN 简介

[sparkle-vue-admin](http://git.iflytek.com/EPD_whedu/sparkle-vue-admin) 是一个后台集成解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element](https://github.com/ElemeFE/element)。内置实现了登陆，动态路由，权限验证，提炼了典型的业务模型，它可以帮助你快速搭建企业级中后台产品原型。

- 前后端分离，通过 token 进行数据交互，可独立部署
- 动态菜单，通过菜单管理统一管理访问路由
- 数据切换，通过 mock 配置对接口数据／mock 模拟数据进行切换
- 封装常用模块，比如数据请求 axios、vuex 状态管理、路由拦截等
- 演示地址：[sparkle-vue-admin](http://172.16.16.53:5000) (账号密码：admin/admin)

相信不管你的需求是什么，本项目都能帮助到你。

## 整体工程结构

<pre>
sparkle-vue-admin
│  .babelrc                  //babel配置
│  .eslintignore             //eslint忽略配置
│  .eslintrc.js              //eslint配置
│  .gitignore                //git忽略配置
│  index.html                //主页模版
│  package-lock.json         //package锁定文件
│  package.json              //package配置
│  pathmap.json              //webpack alias配置
│  README.md                 //readme
│  
├─build                      //构建配置目录
│      build.js
│      proxy.js
│      utils.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.dev.server.js
│      webpack.prod.conf.js
│      webpack.test.conf.js
│
├─config                    //构建全局配置目录
│      dev.env.js
│      index.js
│      prod.env.js
│      test.env.js
│
└─src
    │  App.vue             //页面根组件
    │  index.js            //入口文件
    │  
    ├─api                  //api定义目录
    │      index.js
    │      user.js
    │       
    ├─assets               //静态资源目录
    │  ├─fonts             //字体
    │  ├─images            //图片
    │  │      logo.png
    │  │      study.png
    │  │
    │  ├─js                //脚本
    │  │      common.js
    │  │
    │  └─styles            //样式
    ├─components           //组件目录
    │   ├─commons          //公共组件，如登录、404等
    │   │      404.vue
    │   │      home.vue
    │   │      login.vue
    │   │      theme.vue
    │   │      
    │   ├─pages
    │   │  │  main.vue     //主页面
    │   │  │  
    │   │  ├─job           //job子模块
    │   │  │      schedule-add-or-update.vue
    │   │  │      schedule-log.vue
    │   │  │      schedule.vue
    │   │  │      
    │   │  ├─layout        //页面结构组件
    │   │  │      content.vue
    │   │  │      navbar-update-password.vue
    │   │  │      navbar.vue
    │   │  │      sidebar-sub-menu.vue
    │   │  │      sidebar.vue
    │   │  │      
    │   │  └─sys           //sys子模块
    │   │          config-add-or-update.vue
    │   │          config.vue
    │   │          log.vue
    │   │          menu-add-or-update.vue
    │   │          menu.vue
    │   │          role-add-or-update.vue
    │   │          role.vue
    │   │          user-add-or-update.vue
    │   │          user.vue
    │   │          
    │   └─ui               //公共UI组件
    │      │  icon-svg.vue
    │      │  
    │      └─table-tree-column
    │              index.vue
    │
    ├─config              //全局配置目录
    │  │  index.js        //项目整体配置文件
    │  │  
    │  └─interceptor      //拦截器配置
    │          axios.js   //请求拦截器配置
    │          router.js  //路由跳转拦截器
    │
    ├─plugins             //插件相关，数据请求等实例
    │      api.js
    │      axios.js
    │      eventbus.js
    │      index.js
    │
    ├─router              //路由配置
    │      index.js
    │      routers.js
    │
    ├─store               //vuex目录
    │  │  index.js
    │  │  
    │  └─modules
    │          common.js
    │          login.js
    │          user.js
    │
    └─utils               //工具类
            index.js
</pre>

## 说明文档

项目开发、部署等说明都在[wiki](http://git.iflytek.com/EPD_whedu/sparkle-vue-admin/wikis/home)中。

## 更新日志

每个版本的详细更改都记录在[release notes](http://git.iflytek.com/EPD_whedu/sparkle-vue-admin/tags)中。
