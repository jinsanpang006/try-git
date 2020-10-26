import http from '@/utils/request.js'

// 获取图片
export const getPictures = (picturesObj) => {
  return http({
    method: 'get',
    url: '/mp/v1_0/user/images',
    params: picturesObj
  })
}

// 收藏图片
export const collectPictures = (collectId, collect) => {
  return http({
    method: 'put',
    url: `/mp/v1_0/user/images/${collectId}`,
    data: { collect }
  })
}

// 删除图片
export const delPictures = (id) => {
  return http({
    method: 'delete',
    url: `/mp/v1_0/user/images/${id}`
  })
}
