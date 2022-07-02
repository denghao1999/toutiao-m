<template>
  <div class="search-histroy">
    <van-cell title="历史记录">
      <div v-if="isDelShow">
        <span @click="$emit('clearHistroy')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelShow = false">完成</span >
      </div>
      <van-icon 
      name="delete-o" 
      v-else 
      @click="isDelShow = true"
      />
    </van-cell>
    <van-cell
      :title="histroy"
      v-for="(histroy, index) in SearchHistroyList"
      :key="index"
      @click="delHistroy(histroy,index)"
    >
      <van-icon name="close" v-show="isDelShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistroy',
  props: {
    SearchHistroyList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelShow: false // 默认值为false  不显示
    }
  },
  methods:{
    delHistroy(histroy,index){
    if(this.isDelShow){
      // 删除状态 数据处理  点击删除
      this.SearchHistroyList.splice(index,1)
    }else{
      // 非删除状态数据处理 点击搜索
      this.$emit('search-histroy',histroy)
    }
  }
  }
}
</script>

<style>
</style>