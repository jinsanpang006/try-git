import http from '@/utils/request'

// 获取粉丝列表
export const reqGetFans = (page, per_page) => {
  return http({
    method: 'get',
    url: '/mp/v1_0/followers',
    params: {
      page,
      per_page
    }
  })
}
// 获取粉丝列表统计数据
export const reqGetFansStatistics = () => {
  return http({
    method: 'GET',
    url: '/mp/v1_0/statistics/followers'
  })
}
