import request from '@/utils/request'
export const getCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 获取购物车列表
export const getCartList = () => {
  return request.post('/cart/list')
}
// 更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update',
    {
      goodsId,
      goodsNum,
      goodsSkuId
    }
  )
}
// 删除购物车
export const delCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
