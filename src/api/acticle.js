//获取新闻列表

import request from "@/utils/request";

export const getActicle = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
};