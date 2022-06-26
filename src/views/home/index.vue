<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        size="small"
        round
       
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 导航栏 -->

    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab :title="item.name" v-for="item in Channls" :key="item.id">
        <!-- 文章列表组件 -->
        <acticleList :channel="item" />
        <!-- 文章列表组件 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="ChennelShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表 -->
    <img src="~@/assets/gradient-gray-line_proc.jpg" alt="" />

    <!-- 频道编辑区域 -->
    <van-popup
      v-model="ChennelShow"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChennelEitd 
      :MyChannls="Channls" 
      :active="active" 
       @Updata-channel="UpdataChannel"/>
    </van-popup>

    <!-- 频道编辑弹出层区域 -->
  </div>
</template>

<script>
import acticleList from "./acticle-List.vue";
import { getUserChannls } from "@/api/user";
import ChennelEitd from "@/views/home/ChennelEitd.vue";
export default {
  name: "HomeIndex",
  data() {
    return {
      active: 0,
      Channls: {},
      ChennelShow: false,
    };
  },
  created() {
    this.getChannls();
  },
  methods: {
    async getChannls() {
      try {
        const res = await getUserChannls();
        // console.log(res);
        this.Channls = res.data.data.channels;
      } catch (err) {
        console.log(err);
      }
    },
    UpdataChannel(index,ChennelShow =  true){
      this.active = index

      // 关闭编辑频道弹出层
      this.ChennelShow = ChennelShow
    }
  },
  components: {
    acticleList,
    ChennelEitd,
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }

  /deep/.search-btn {
    width: 554px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    color: #fff;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 96px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 3px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line_proc.jpg);
        background-size: contain;
      }
    }
  }
}
</style>
