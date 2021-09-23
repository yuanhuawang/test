import Vue from 'vue'
import store from '../store'
import '../axios/index.js'
import childrenAdmin from './admin'
import Index from '../views/Index.vue'

{ Vue, store }

export default [
  {
    path: '/',
    name: 'Index',
    component: Index,    //组件位置
    meta: {              //页面的元信息
      title: "普通用户首页",
      navTitle: "首页",    //显示文字，点击该处跳转
      headermenu: true      //headermenu组件被允许
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/index/views/About.vue'),
    meta: {
      title: "关于我们",
      navTitle: "关于我们",
      headermenu: true
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/pages/index/views/news.vue'),
    meta: {
      title: "新闻",
      navTitle: "新闻页面",
      headermenu: true
    }
  },
  {
    path: '/login',
    name: 'login',
    // redirect: '/admin/index',
    component: () => import('@/pages/index/views/admin/Login.vue'),
    meta: {
      title: "后台登录",
      navTitle: "后台登录",
      headermenu: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/index',
    component: () => import('@/pages/index/views/admin/Admin.vue'),
    // beforeEnter: (to, from, next) => {
    //   // eslint-disable-next-line no-constant-condition
    //   //本地存储了永久的token验证
    //   // if (localStorage.getItem('token') === '123456') {
    //   //   next()
    //   // }
    //   // else {
    //   //   next('/login')
    //   // }

    //   if (to.name === 'login') {
    //     next()
    //   } else {
    //     if (JSON.parse(sessionStorage.getItem('userinfo'))) {
    //       // eslint-disable-next-line no-unused-vars
    //       // var localtoken = store.state.userinfo.token;  
    //       // 以上获取VUX的用户登陆TOKEN  刷新就失败,需要重新登陆
    //       var localtoken = JSON.parse(sessionStorage.getItem('userinfo')).token
    //       // 以上获取本地浏览器存诸内容.关闭浏览器就失效
    //       Vue.axios({
    //         url: '/api/statusVerify.php?Verify=token',
    //         headers: {
    //           TOKEN: localtoken
    //         }
    //       })
    //         .then((res) => {
    //           if (res.data.verify) {
    //             next()
    //           } else {
    //             next('/login')
    //           }
    //         })
    //     } else {
    //       next('/login')
    //     }
    //   }
    // },
    meta: {
      title: "后台管理系统",
      navTitle:"后台首页",
    },
    children: childrenAdmin
  }
]