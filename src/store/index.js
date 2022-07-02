import Vue from "vue";
import Vuex from "vuex";
import { getItem, setItem } from "@/utils/storage";
Vue.use(Vuex);

const TOKEN_KEY = "TOUTIAO_USER";
export default new Vuex.Store({
  state: {
    // 一个对象存储当前登陆用户信息 （token等数据） 
    user: getItem(TOKEN_KEY),
  },
  getters: {},
  mutations: {
    setUser(state, data) {
      state.user = data;

      // 为了防止刷新数据丢失 我们需要把数据备份到本地存储中
      setItem(TOKEN_KEY, state.user);
    },
  },
  actions: {},
  modules: {},
});
