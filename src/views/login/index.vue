<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="UserFromRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="UserFromRules.code"
        type="number"
        maxlength="6"
      >
        <!-- native-type="button"  防止触发表单提交 -->
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDown"
            @finish="isCountDown = false"
          />
          <van-button
            v-else
            round
            native-type="button"
            size="small"
            type="default"
            class="send-sm-btn"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <!-- 登录按钮  -->
      <div class="login-btn-warp">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
export default {
  name: "LoginIndex", // 组件名字
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "",
      },
      UserFromRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDown: false,
    };
  },
  methods: {
    async onSubmit() {
      // 获取表单数据
      const user = this.user;
      this.$toast.loading({
        message: "登陆中...",
        forbidClick: true,
        duration: 0,
      });
      // 提交表单请求登录
      try {
        // 成功
        const { data } = await login(user);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登陆成功");
        //登陆成功调回原来的页面
        this.$router.back();
      } catch (err) {
        // 失败
        if (err.response.status === 400) {
          this.$toast.fail("手机或验证码错误");
        } else {
          this.$toast.fail("登陆失败，请稍后再试");
        }
      }
    },
    async onSendSms() {
      console.log("safas");
      // 1. 验证手机号
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }
      //       // 2. 验证通过，显示倒计时
      this.isCountDown = true;
      //       // 3. 请求与发送验证码
      try {
        console.log(1);
        await sendSms(this.user.mobile);
        this.$toast("发送成功");
      } catch (err) {
        this.isCountDown = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁了请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
}
.send-sm-btn {
  width: 156px;
  height: 46px;
  font-size: 22px;
  line-height: 22px;
  color: #666666;
  background-color: #ededed;
}
.login-btn-warp {
  padding: 53px 28px;

  .login-btn {
    border: none;
    background-color: #6db4fb;
  }
}
.van-icon {
  color: #fff;
}
</style>
