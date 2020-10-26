import http from '@/utils/request.js'
// 获取评论列表
export const getComments = (page, per_page) => {
  return http({
    method: 'get',
    url: '/mp/v1_0/articles',
    params: {
      page,
      per_page,
      response_type: 'comment'
    }
  })
}

// 修改文章评论状态
export const modCommentStatus = (article_id, allow_comment) => {
  return http({
    method: 'put',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id
    },
    data: { allow_comment }
  })
}
