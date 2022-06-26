import request from "@/utils/request";
// import store from '@/store'
export const login = (data) => {
  return request({
    url: "v1_0/authorizations",
    method: "POST",
    data,
  });
};
// 获取验证码
export const sendSms = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: "GET",
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: "/v1_0/user",
    method: "GET",
    // 发送请求头数据
    // headers:{
    // Authorization:`Bearer ${store.state.user.token}`
    // }
  });
};

// 获取用户频道列表信息
export const getUserChannls = () => {
  return request({
    url: "/v1_0/user/channels",
    method: "GET",
  });
};
