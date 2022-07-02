<template>
  <div class="article-list">
    <van-pull-refresh
      ref="pullrefresh"
      v-model="isLoading"
      :success-text="successText"
      @refresh="onRefresh"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败,点击重新加载"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem>
        <!-- <van-cell 
  
  :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
let ele = null
let scrolltop = 0
import { getActicle } from "@/api/acticle";
import ArticleItem from "@/components/article-item";
export default {
  name: "ActicleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 获取下一页的时间戳
      error: false, // 控制列表加载失败的提示状态
      isLoading: false, // 控制下拉刷新的 loading状态
      successText: "加载成功",
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getActicle({
          channel_id: this.channel.id, // 频道id

          // 时间戳，请求新的数据时会更新新的
          timestamp: this.timestamp || Date.now(),
        });

        //  模拟失败的情况
        // if(Math.random() > 0.5){
        //   JSON.parse('asfafaf')
        // }

        // 接收获取过来的数据
        const { results } = data.data;
        console.log(results);
        this.list.push(...results);
        // 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false;
        // 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有数据了件 finished 设置为true，不在 load加载更多
          this.finished = true;
        }
      } catch (err) {
        // 加载失败处理 展示错误提示
        this.error = true;

        // 请求失败了，loading 也需要关闭
        this.loading = false;
      }
    },

    // 下拉刷新
    async onRefresh() {
      try {
        const { data } = await getActicle({
          channel_id: this.channel.id, // 频道id

          // 时间戳，请求新的数据时会更新新的
          timestamp: Date.now(),
        });

        //  模拟失败的情况
        // if(Math.random() > 0.5){
        //   JSON.parse('asfafaf')
        // }

        // 将获取到的数据追加到列表最前面
        const { results } = data.data;
        this.list.unshift(...results);

        // 追加完关闭下拉刷新状态
        this.isLoading = false;
        // 更新下拉刷新成功提示的文本
        this.successText = `刷新成功,更新了${results.length}数据`;
        //
      } catch (err) {
        this.successText = "刷新失败";
        this.isLoading = false;
      }
    },
  },
  // 操做Dom
  mounted(){
    // 组件最终渲染成html dom ，$el 就是渲染好的跟标签
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll',function(){
      console.log(this.scrollTop);
      scrolltop = this.scrollTop
    })
  },
  activated(){
    ele.scrollTop = scrolltop
  }
};
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
