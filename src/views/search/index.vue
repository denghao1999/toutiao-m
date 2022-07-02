<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/" class="search-from">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
        background="#3296fa"
        autofocus
      />
    </form>
    <!-- 顶部搜索栏 -->
    <!-- 结果列表 -->
    <SearchResult v-if="isResultShow" :searchtext="searchText"> </SearchResult>
    <!-- 结果列表 -->
    <!-- 联想建议 -->
    <SearchSugger
      v-else-if="searchText"
      :searchtext="searchText"
      @search="onSearch"
    >
    </SearchSugger>
    <!-- 联想建议 -->
    <!-- 历史记录页面 -->
    <SearchHistroy 
    v-else
    :SearchHistroyList="SearchHistroyList"
    @search-histroy="onSearch"
    @clearHistroy="SearchHistroyList = []"
    > </SearchHistroy>
    <!-- 历史记录页面 -->
  </div>
</template>

<script>
import SearchHistroy from './components/search-histroy.vue'
import SearchSugger from './components/search-sugger.vue'
import SearchResult from './components/search-result.vue'
import { setItem , getItem} from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      SearchHistroyList: getItem('HISTROY') || [] // 是搜索历史数据
    }
  },
  watch: {
    SearchHistroyList(value){
      setItem('HISTROY' , value)
    }
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容 
      this.searchText = val
      // 
      // 判断添加的数组是否重复 
      const index = this.SearchHistroyList.indexOf(val)
      if(index !== -1){
        this.SearchHistroyList.splice(index,1)
      }
      // 添加搜索历史数据 将最新的数据排在最前面
      this.SearchHistroyList.unshift(val)
      // 渲染搜索结果内容
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
  },
  components: {
    SearchHistroy,
    SearchSugger,
    SearchResult
  }
}
</script>
<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-from {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>