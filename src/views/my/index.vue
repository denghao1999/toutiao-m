<template>
  <div class="my-container">
    <!-- 已登录状态 -->
    <div class="header user-info" v-if="user">
      <div class="on">
        <div class="left">
          <van-image :src="UserInfo.photo" round cover class="img" />
          <span class="text">{{ UserInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="down">
        <div class="data-item">
          <span class="count">{{ UserInfo.art_count }}</span>
          <span class="name">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ UserInfo.follow_count }}</span>
          <span class="name">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ UserInfo.fans_count }}</span>
          <span class="name">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ UserInfo.like_count }}</span>
          <span class="name">获赞</span>
        </div>
      </div>
    </div>

    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('login')">
        <img class="mobile" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid :column-num="2" clickable class="mb-9">
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 导航 -->
    <van-cell is-link title="消息通知" />
    <van-cell class="mb-9" is-link title="小旭同学" />
    <van-cell
     is-link
      v-if="user"
      class="logout-cell"
      title="退出登录"
      clickable
      @click="outLogin"
    />
    <van-grid clickable>
  <van-grid-item  icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
</van-grid>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user";
export default {
  name: "MyIndex",
  data() {
    return {
      UserInfo: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    // 如果用户登陆了 请求用户信息数据
    if (this.user) {
      //
      this.loadUserInfo();
    }
  },
  methods: {
    // 点击退出登录按钮
    outLogin() {
      this.$dialog
        .confirm({
          title: "确定要退出登录吗", 
        })
        .then(() => {
          // 确认退出：清除登陆状态（容器中的user+ 本地存储中的user）
          this.$store.commit("setUser", null);
        })
        .catch(() => {});
    },
    async loadUserInfo() {
      try {
        const res = await getUserInfo(); //  
        console.log(res);
        this.UserInfo = res.data.data;
      } catch (err) {
        this.$toast("用户信息加载失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    background: url("~@/assets/banner.png");
    background-size: cover;
    height: 361px;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .on {
      height: 231px;

      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .img {
          border: 4px solid #fff;
          height: 132px;
          width: 132px;
          margin-right: 23px;
        }
        .text {
          color: #fff;
          font-size: 30px;
        }
      }
    }
    .down {
      height: 130px;
      display: flex;
      .data-item {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .name {
          font-size: 23px;
        }
      }
    }
  }
  .grid-item {
    height: 141px;
    i.toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
  .mb-9 {
    margin-bottom: 5px;
  }
  .logout-cell {
    text-align: center;
    color: #eb5253;
  }
}
</style>
