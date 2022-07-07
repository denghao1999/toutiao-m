//获取新闻列表

import request from "@/utils/request";

export const getActicle = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
};

// 获取新闻详情
export const getActicleById = acticleId => {
  return request({
    method: "GET",
    url: `/v1_0/articles/${acticleId}`,
  });
};

// 取消收藏
export const deleteCollected = target	 => {
  return request({
    method: "DELETE",
    url: `/v1_0/article/collections/${target}`,
  });
};

// 收藏
export const addCollected = target=> {
  return request({
    method: "POST",
    url: '/v1_0/article/collections',
    data:{
      target	
    }
  });
};

// 取消点赞文章
export const deleteLiking = target=> {
  return request({
    method: "DELETE",
    url: `/v1_0/article/likings/${target}`,
  });
};
// 点赞文章
export const addLiking = target=> {
  return request({
    method: "POST",
    url: '/v1_0/article/likings',
    data:{
      target	
    }
  });
};
