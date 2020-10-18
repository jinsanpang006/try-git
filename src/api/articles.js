import http from '@/utils/request.js'

// 获取文章列表
export const getArticles = (queryObj) => {
  return http({
    method: 'get',
    url: '/mp/v1_0/articles',
    params: queryObj || {}
  })
}

// 获取频道信息
export const getChannels = () => {
  return http({
    method: 'get',
    url: '/mp/v1_0/channels'
  })
}
