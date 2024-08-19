import { changeCount, delCart, getCartList } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  statu () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 设置cartList
    setCartList (state, newList) {
      console.log(newList)

      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    // 全选控制小单选框
    toggleAllcheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      // console.log(goodsNum, goodsId)

      goods.goods_num = goodsNum
    }

  },
  actions: {
    async getCartAction (context) {
      const res = await getCartList()
      console.log(res)
      const { data } = res
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      // console.log(obj)

      const { goodsNum, goodsId, goodsSkuId } = obj
      const res = await changeCount(goodsId, goodsNum, goodsSkuId)
      context.commit('changeCount', { goodsId, goodsNum })
      console.log(res)
    },
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      console.log(cartIds)
      await delCart(cartIds)
      Toast('删除成功')
      context.dispatch('getCartAction')
    }
  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 选中的商品
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },

    // 选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num
      }, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0)
    },
    // 全选框
    isAllchecked (state) {
      return state.cartList.every(item => item.isChecked)
    }

  }
}
