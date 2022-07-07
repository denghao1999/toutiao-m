<template>
<van-loading v-if="isLoading" size=".53333rem"/>
  <van-icon
  v-else
    :name="is_collected ? 'star' : 'star-o'"
    :class="{
      collected:this.is_collected,
    }"
    
    @click="loadCollect"
  />
</template>

<script>
import { addCollected,deleteCollected } from '@/api/acticle'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    },
    collectId:{
        type: [Number,String,Object],
        required:true
    }
  },
  data () {
    return {
      isLoading:false
    }
  },
  methods:{
    async loadCollect(){
      this.isLoading = true
    try {
        if(this.is_collected){
        // 收藏状态 取消收藏
        await deleteCollected(this.collectId)
        }else{
            // 没有收藏 添加收藏
        await addCollected(this.collectId)
        }
        // 更新视图  将更新状态传到父组件
        this.$emit('update:is_collected', !this.is_collected)
        
        //  提示 
        this.$toast.success(!this.is_collected ? '收藏成功' : '取消收藏')
    } catch (err) {
        this.$toast.fail('收藏失败，请稍后重试')
    }
    this.isLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.collected {
  /deep/.van-icon-star {
    color: #ffa500 !important;
  }
}
</style>