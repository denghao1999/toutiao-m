<template>
  <div class="search-result">
    <van-pull-refresh 
    v-model="isLoading" 
    @refresh="onRefresh"
     success-text="刷新成功"
     
     >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，请点击重试"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchtext: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      Page: 1,
      per_Page: 50,
      error: false
    };
  },
  methods: {
    async onLoad () {
      // 获取数据
      try {
        const { data } = await getResult({
          page: this.Page,// 页码 不传默认为1 
          per_page: this.per_Page, // 每页的数量
          q: this.searchtext
        })
        // 将请求来的数据 push 到数组中
        const { results } = data.data
        console.log(results);
        this.list.push(...results)

        // 将本次加载的 loading 关闭
        this.loading = false
        this.isLoading = false
        // 判断是否有数据
        if (results.length) {
          //  有数据让页码 ++
          this.Page++
        } else {
          // 没有数据了让加载状态 为结束状态
          this.finished = true
        }
        // 

      } catch (err) {
        // 展示加载失败的提示状态 
        this.error = true
        // 加载失败了 loading 也要关闭
        this.loading = false
      }
    },
    // 下拉刷新 
    onRefresh () { 
      this.list = [],
      this.onLoad()
    }
  },
}
</script>

<style scoped lanh="less">
.search-result {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>