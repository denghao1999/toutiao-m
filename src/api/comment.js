/**
 * 文章评论 API
 */
 import request from "@/utils/request";

 // 获取评论列表

 export const commentList = params =>{
    return request ({
        url:'/v1_0/comments',
        method:'GET',
        params
    })
 }

 // 点赞评论

 export const addCommentLike = target =>{
    return request ({
        url:'/v1_0/comment/likings',
        method:'POST',
        data:{
        target
        }
    })
 }
 // 取消点赞评论

 export const delCommentLike = target =>{
    return request ({
        url:`/v1_0/comment/likings/${target}`,
        method:'DELETE',
    })
 }

 // 发布文章评论
    // data  传递一个对象进来
 export const addPost = data =>{
    return request ({
        url:"/v1_0/comments",
        method:'POST',
        data
    })
 }
