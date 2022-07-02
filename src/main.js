import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vant from "vant";
import "vant/lib/index.css";

// 加载动态设置REM 基准值 （html标签字体大小）
import "amfe-flexible";
// 加载全局样式
import "@/styles/index.less";

// 加载 dayjs 初始化配置
import "./utils/dayjs";
Vue.config.productionTip = false;

Vue.use(Vant);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 给页面上所有的元素绑定滚动事件
//  只要谁滚动 就打印出来
const list = document.querySelectorAll('*')
list.forEach(item => {
  item.onscroll = function (e) {
    console.log(e.target)
  }
})