<template>
  <van-icon
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1,
    }"
    :loading="isAjax"
    @click="loadLiking"
  />
</template>

<script>
import {deleteLiking,addLiking} from '@/api/acticle'
export default {
  name: 'LikingArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    likedId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    async loadLiking () {
      this.isAjax = true
      try {
        let status = -1
        if (this.value === 1) {
          // 点赞状态 取消点赞
          await deleteLiking(this.likedId)

        } else {
          // 没有点赞 添加点赞
          await addLiking(this.likedId)
          status = 1

        }
        // 更新视图  将更新状态传到父组件
        this.$emit('input',status)

        //  提示 
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('点赞失败，请稍后重试')
      }
      this.isAjax = false
    }
  }
}
</script>

<style scoped lang=less"">
.liked {
  /deep/.van-icon {
    color: #ffa500 !important;
  }
}
</style>