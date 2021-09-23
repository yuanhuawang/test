import Vue from 'vue'
import VueRouter from 'vue-router'
import menu from "./menu"

Vue.use(VueRouter)

const routes = menu

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 在使用ElementUi时点击同一个路由，页面报错
// 解决方法如下
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    // console.log();
  }
  next()
})

export default router
