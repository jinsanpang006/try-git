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

// 删除基本信息
export const delArticles = (id) => {
  return http({
    method: 'delete',
    url: `/mp/v1_0/articles/${id}`
  })
}

// 发表文章
export const addArticles = (draft, dataObj) => {
  return http({
    method: 'post',
    url: '/mp/v1_0/articles',
    params: { draft },
    data: dataObj
  })
}

// 获取文章
export const editArticlesId = (id) => {
  return http({
    method: 'get',
    url: `/mp/v1_0/articles/${id}`
  })
}

// 修改文章
export const editArticles = (id, draft, dataObj) => {
  return http({
    method: 'put',
    url: `/mp/v1_0/articles/${id}`,
    params: { draft },
    data: dataObj
  })
}
