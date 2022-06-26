<template>
  <div class="Chennel-eitd">
    <!--单元格 我的频道-->
    <van-cell :border="false">
      <div slot="title" class="eidt-title">我的频道</div>
      <van-button
        class="eitd-btn"
        type="danger"
        plain
        round
        size="small"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <!--宫格 -->
    <van-grid :column-num="3" gutter="10" class="my-grid">
      <van-grid-item
        v-for="(channel, index) in MyChannls"
        :key="index"
        class="grid-item"
        @click="TacthChannel(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fixdChannel.includes(channel.id)"
        ></van-icon>
        <span class="text" slot="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="eidt-title">频道推荐</div>
    </van-cell>

    <van-grid :column-num="3" gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        icon="plus"
        @click="onAddchannel(channel)"
      />
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
import { 
  getAllChannels,
   AddUserChannels,
   DelUserChannels
   } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  data () {
    return {
      allChannels: [], // 所有频道 
      isEdit: false,// 删除图表显示与不显示状态
      fixdChannel: [0]
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(channel => {
        // find 遍历数字，找到满足条件的元素项
        return !this.MyChannls.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
  },
  props: {
    MyChannls: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  created () {
    this.LoadAllChannels()
  },
  methods: {
    async LoadAllChannels () {
      // console.log(1);
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        // console.log(this.allChannels);
      } catch (err) {
        this.$toast('获取数据失败')
        console.log(err);
      }
    },
    async onAddchannel (channel) {
      this.MyChannls.push(channel)

      //数据持久化 处理
      if (this.user) {
        try {
          // 已登录， 数据放到线上
          await AddUserChannels({
            id: channel.id, // 频道id
            seq: this.MyChannls.length // 频道序号
          })
        } catch (err) {
          this.$toast('保存失败', err)
        }
      } else {
        //未登录， 把数据放到本地存储
        setItem('TOUTIAO_CHANNELS', this.MyChannls)
      }

    },
    TacthChannel (channel, index) {
      if (this.isEdit) {
        // 固定频道 不删除
        if (this.fixdChannel.includes(channel.id)) {
          return
        }
          // 删除频道项
          this.MyChannls.splice(index, 1)
        // 编辑状态处理删除
        if (index <= this.active) {
          this.$emit('Updata-channel', this.active - 1, true)
        }
        // 处理持久化 
        this.deleteUserChannel(channel)
      } else {
        // 完成状态跳转页面
        this.$emit('Updata-channel', index, false)
      }
    },
   async deleteUserChannel(channel){
    try{
        if(this.user){
            //登陆状态 删除同步存储到线上
            await DelUserChannels(channel.id)
        }else{
          // 未登录状态 存到本地
          setItem('TOUTIAO_CHANNELS', this.MyChannls)
        }
    }catch(err){
      this.$toast('同步数据失败',err)
    }
        
    }
  }
};
</script>

<style scoped lang="less">
.Chennel-eitd {
  padding-top: 90px;
  .eidt-title {
    font-size: 32px;
    color: #333333;
  }
  .eitd-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        //
      }
    }
  }
}
</style>
