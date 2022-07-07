<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      ref="Focus"
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addPost } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    console.log(this.$refs.Focus);
    // this.$refs.Focus.$el.querySelector('textarea').focus()
    this.$refs.Focus.focus()
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await addPost({
          //对象参数
          target: this.target.toString(), // 文章id 
          content: this.message, // 评论内容
          art_id: this.articleId ? this.articleId.toString() : null // 对评论进行回复的id 
        })
        // 将数据传递给父组件处理 渲染
        this.$emit('seccsePost', data.data)
        this.message = '' // 清空输入框 
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败，请重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>