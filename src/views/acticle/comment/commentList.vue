<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text="获取失败 点击重试"
    :immediate-check="false"
  >
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
      :comment="item"
      @raplyClick="$emit('raplyClick', $event)"
    />
  </van-list>
</template>

<script>
import { commentList } from '@/api/comment'
import CommentItem from '@/views/acticle/comment/commentitem.vue'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      //自定义Prop数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10, // 每页请求的数据数量
      error: false
    }
  },
  created () {
    this.loading = true
    this.onLoad()
    console.log(this.source);
  },
  methods: {
    async onLoad () {
      // 1.获取数据
      try {
        const { data } = await commentList({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), //源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据  
          limit: this.limit, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        console.log(data);
        const { results } = data.data
        this.list.push(...results) // 保留每一页的数据
        // 2 将数据添加到列表当中 将loading 设置为 false
        // 将文章评论总数 传给父组件
        this.$emit('updata-susses', data.data)
        this.loading = false
        // this.loading = true
        // 判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页数据页码
          this.offset = data.data.last_id
        } else {
          // 没有就将finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="less">
</style>