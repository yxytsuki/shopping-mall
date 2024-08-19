import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo() || {
        token: '',
        userId: ''
      }
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }

  },
  actions: {
    logout (context) {
      //  个人信息重置
      context.commit('setUserInfo', {})
      // 购物车信息重置(跨模块) selCartList
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
