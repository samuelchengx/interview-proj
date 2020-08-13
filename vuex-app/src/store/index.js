import Vue from 'vue';
// import Vuex from 'vuex';
import Vuex from './../vuex.js';

Vue.use(Vuex); // install方法

export default new Vuex.Store({
  state: {
    count: 100
  },
  getters: {
    newCount(state){
      return state.count + 100;
    }
  },
  mutations: {
    change(state){
      state.count += 10;
    }
  },
  actions: {
    change({commit}){
      setTimeout(()=>{
        commit('change');
      }, 1000);
    }
  },
  // 给状态划分模块
  modules: {
    a: {
      state: {
        count: 2000
      },
      modules: {
        b: {
          state: {
            count: 3000
          }
        }
      }
    }
  }
})
