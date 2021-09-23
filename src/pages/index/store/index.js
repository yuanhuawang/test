import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:null,
    islogin:false
  },
  mutations: {
    setUserinfo(state,value){
      state.userinfo = value,
      state.inlogin = true
    }
  },
  actions: {
  },
  modules: {
  }
})
