import Vue from 'vue'
//自定义指令设置高度
Vue.directive('elHeight',function(el,binding){
    el.style.height = (binding.value || document.documentElement.clientHeight) + 'px';
    window.onresize=function(){
        el.style.height = (binding.value || document.documentElement.clientHeight) + 'px';
    }
})