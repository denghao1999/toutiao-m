<template>
  <div>
    <van-nav-bar
      :title="
        comment.reply_count > 0
          ? `
  ${comment.reply_count}条回复`
          : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="sollol-warp">
      <CommentItem :comment="comment" />
      <van-cell title="回复列表" />
      <CommentList :source="comment.com_id" type="c" :list="commentList" />
    </div>

    <!-- 写评论 -->
    <div class="post-warp">
      <van-button round size="small" class="post-btn" @click="commentShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 写评论 -->

    <!-- 评论弹出层 -->
    <van-popup v-model="commentShow" position="bottom">
      <CommentPost :target="comment.com_id" @seccsePost="onSeccsePost" />
    </van-popup>

    <!-- 评论弹出层 -->
  </div>
</template>

<script>
import CommentItem from './commentitem.vue'
import CommentList from './commentList.vue'
import CommentPost from './commentPost.vue'

export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  data () {
    return {
      commentShow: false,
      commentList: []
    }
  },
  created(){
    
      // this.seccsePost()
  },
  methods: {
    onSeccsePost (data) {
      console.log(data);
      // 更新评论回复 ++
      this.comment.reply_count++
      // 关闭发布弹层
      this.commentShow = false

      // 将最新的评论添加到列表的最前面
      this.commentList.unshift(data.new_obj)
    }
  },
  computed:{
  }
}
</script>
<style scoped lang="less">
.sollol-warp {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow: auto;
}
.post-warp {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
    background-color: #fff;
    // border: none;
  }
}
</style>