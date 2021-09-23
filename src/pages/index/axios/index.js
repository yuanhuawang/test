import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {Loading,Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Qs from 'qs'
// import user from '../router/user';

Vue.use(VueAxios,axios)

{Loading,Message,Qs}

// axios.defaults.baseURL = "https://s.hzbiz.net";
// axios.defaults.headers.common['token'] = 123456;
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;    //设置cross跨域 并设置访问权限 不允许跨域携带cookie信息
axios.defaults.transformRequest = [function(data){
    //对data进行任意转换
    return Qs.stringify(data);
}]

// 添加请求拦截器
// eslint-disable-next-line no-unused-vars
let loadingservice;

let message = function (error) {
    //弹出警告框，1秒钟
    Message({
        message: error,
        type: 'warning',
        duration: 3000
    })
}

axios.interceptors.request.use(function (config) {
    axios.defaults.headers.common['TOKEN'] = sessionStorage.getItem('userinfo')?JSON.parse(sessionStorage.getItem('userinfo')).token:'';
    loadingservice = Loading.service({})
    return config;
}, function (error) {
    // 对请求错误做些什么
    loadingservice.close()
    message(error)
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    loadingservice.close()
    return response;
}, function (error) {
    // 对响应错误做点什么
    loadingservice.close()
    message(error)
    return Promise.reject(error);
});

const API = {
    modules: {
        api: '/api',
        blog: "/blog"
    },
    login(data) {
        let that = this;
        // console.log(this);
        return Vue.axios
            .post(that.modules.api + "/Landing.php", data)
    },
    getBlog(id) {
        // let _this=this
        let url=`${this.baseUrl.api}/`;
        if (id) {
            url += `blog/blog.php?id=${id}`
        }
        else {
            url += `blog/blog.php`
        }
        // let _this=this;
        return Vue.axios({
            url: url,
            method: "get",
        })
    },
}

export default API