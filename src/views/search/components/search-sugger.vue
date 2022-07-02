<template>
  <div class="search-sugger">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search',text)"
    >
    <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  props: {
    searchtext: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [],
      
    }
  },
  name: 'SearchSugger',
  watch: {
    searchtext: {
      // 当数据发生改变的时候就会调用 handel函数
      // handler函数名称固定

      // debounce 函数 
      // 参数1 ： 一个函数
      // 参数2 ： 延迟事件 单位是毫秒
      // 返回值： 防抖之后的函数
      handler: debounce(function (value) {
        console.log(value);
        this.LoadSuggestion(value)
      }, 200),
      // 该回掉将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  methods: {
    async LoadSuggestion (q) {
      try {
        const { data } = await getSuggestion(q)
        this.suggestions = data.data.options
        console.log(this.suggestions);
      } catch (err) {
        // console.log(err);
        this.$toast('获取失败，稍后重试', err)
      }
    },
    highlight(text){
      // 因为这块要渲染的不是普通的字符串，而是html片段，所以必须要用v-html v-html时属性绑定，所以不能用过滤器
      // 所以只能在methods中写
      const highlightstr = `<span class="active">${this.searchtext}</span>`

      const reg = new RegExp(this.searchtext,'gi')
      return text.replace(reg, highlightstr)
    }
  }
}
</script>

<style scoped lang="less">
 .search-sugger{
 /deep/ span.active{
    color: #3296fa;
  }
 }
</style>