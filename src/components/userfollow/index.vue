<template>
  <van-button
    :disabled="isAjax"
    :loading="isAjax"
    v-if="isFollow"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    >已关注</van-button
  >

  <van-button
    :loading="isAjax"
    @click="onFollow"
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    >关注</van-button
  >

  <!-- <van-button
    :loading="loading"
    @click="onFollow"
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="is_followed ? '' : 'plus'"
    :pain="is_followed"
    >{{is_followed ? '已关注' : '关注'}}</van-button
  > -->
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'UserFollow',
  //自定义 v-model 的数据名称
  model: {
    prop: 'isFollow', // 默认是 value  字符串
    event: 'updateFollowed' // 默认是 $event  字符串
  },
  props: {
    isFollow: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isAjax: false // 按钮加载默认状态 
    }
  },
  methods: {
    async onFollow () {
      // 展示按钮的 loading状态
      this.isAjax = true
      try {
        if (this.isFollow) {
          // 已关注
          await deleteFollow(this.userId)
        } else {
          // 没有关注
          await addFollow(this.userId)
        }
        // 自定义事件  将状态传给父组件进行修改
        this.$emit('updateFollowed', !this.isFollow)
        // 默认是value
        // this.$emit('input', !this.value)
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己！'
        }
        this.$toast(message)
      }
      // 关闭按钮的 loading状态
      this.isAjax = false
    }
  }
}
</script>

<style>
</style>