import request from '@/utils/request'
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order',
    {
      // mode:cart=>obj cartIds
      // mode:buyNow=>obj goodsId,goodsNum,goodsSkuId
      params: {
        mode, // cart buyNow
        delivery: 10, // 10快递配送，20门店自提

        couponId: 0, // 优惠券ID，0不传优惠券
        isUsePoints: 0, // 积分0，不使用积分
        ...obj
      }
    })
}
// 提交订单
// cart obj:{cartIds,remark}
// buyNow obj{goodsId,goodsNum,goodsSkuId,remark}
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    delivery: 10, // 10快递配送
    couponId: 0, // 优惠券ID
    isUsePoints: 0, // 是否使用积分
    mode,
    payType: 10, // 余额支付
    ...obj

  })
}
// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
