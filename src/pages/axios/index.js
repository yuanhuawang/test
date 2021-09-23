import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import Qs from 'qs'
import { Loading, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(VueAxios, axios)

// axios.defaults.baseURL = 'http://www.wangyh.icu';
axios.defaults.headers.common['token'] = 123456;
axios.defaults.timeout = 5000

// eslint-disable-line no-unused-vars
let loadingservice;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    loadingservice = Loading.service({})
    return config;
}, function (error) {
    // 对请求错误做些什么
    loadingservice.close()
    Message({
        message: error,
        type: 'warning'
    })
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    loadingservice.close()
    return response;
}, function (error) {
    // 对响应错误做点什么
    loadingservice.close(),
        Message({
            message: error,
            type: 'warning'
        })
    // alert('对响应错误做些什么')
    return Promise.reject(error);
});

const API = {
    baseUrl: {
        api: "/api",
        blog: "url1",
        news: "url2"
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