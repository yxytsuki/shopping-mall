<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <!-- 主题 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img @click="getPicCode" v-if="picUrl" :src="picUrl" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode"  class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{ second===totalSecond?'获取验证码':second+'秒后重新发送' }}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { codeLogin, getMsgCode, getPicCode } from '@/api/login'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // 图形验证码内容
      picUrl: '', // 图形验证码地址
      picKey: '', // 图形验证码唯一标识
      totalSecond: 60,
      second: 60,
      timer: null,
      mobile: '',
      msgCode: ''
    }
  },
  created () {
    this.getPicCode()
  },
  methods: {
    // 获取图形验证
    async getPicCode () {
      const res = await getPicCode()
      // console.log(res)
      const { base64, key } = res.data
      // console.log(base64, key)
      this.picUrl = base64
      this.picKey = key

      // Toast('获取图形验证码成功')
      // this.$toast('获取成功')
      // this.$toast.success('成功文案')
    },

    // 校验
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        // 没通过校验return
        return
      }

      // 发送请求
      const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
      console.log(res)

      this.$toast('验证码发送成功注意查收')

      // 开启倒计时
      if (!this.timer && this.second === this.totalSecond) {
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data.data)
      console.log(res.data.data)
      // 跳转到首页
      this.$toast(res.data.message)
      // 判断有无回调地址
      const url = this.$route.query.backUrl || '/'

      this.$router.replace(url)
    }
  },

  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  }

}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
