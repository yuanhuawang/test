import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import '../axios/index'
import API from './axios/index'
import Qs from 'qs'
import './scripts/filter';
import './scripts/directive';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
// Vue.use(VueAxios,axios)
Vue.prototype.$qs=Qs;
Vue.prototype.$API=API
Vue.use(ElementUI);


new Vue({
  router:router,
  store:store,
  render: h => h(App)
}).$mount('#app')
