import request from '@/utils/request'
export const getProList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      sortPrice: 0,
      categoryId,
      goodsName,
      page

    }
  })
}
// 获取商品评价
export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
