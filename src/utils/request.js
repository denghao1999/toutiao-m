import axios from "axios";
import store from "@/store";
const request = axios.create({
  baseURL: "http://toutiao.itheima.net", // 接口基准地址
});

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 请求发起会经过这里
    // config：本次请求的请求配置对象
    const user = store.state.user;
    console.log(user);
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    // 注意：这里务必要返回 config 配置对象 否者请求就停在这
    return config;
  },
  function (error) {
    // 如果请求出错了 还没发出去 会进入这里
    return Promise.reject(error);
  }
);
// 相应拦截器
export default request;
