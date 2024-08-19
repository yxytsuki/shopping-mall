// 用于存放登录所有相关的接口
import request from '@/utils/request'
import axios from 'axios'
export const getPicCode = () => {
  return request.post('/captcha/image')
}
// 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    headers: { platform: 'H5' },
    form: {
      captchaCode,
      captchaKey,
      mobile
    }

  })
}
// 登录接口
export const codeLogin = (mobile, smsCode) => {
  return axios.post('https://apifoxmock.com/m1/4928016-4585237-default/data', {
    form: {
      isParty: true,
      partyData: {},
      mobile,
      smsCode
    }
  }
  )
}
// https://apifoxmock.com/m1/4928016-4585237-default/data
