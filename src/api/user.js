import http from '@/utils/request.js'

// 登录请求
export const Login = (mobile, code) => {
  return http({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 主页获取个人信息请求
export const Info = () => {
  const manInfo = JSON.parse(localStorage.getItem('userInfo'))
  return http({
    method: 'get',
    url: '/mp/v1_0/user/profile',
    headers: {
      Authorization: `Bearer ${manInfo.token}`
    }
  })
}

// 编辑用户资料
export const userPatch = (name) => {
  const manPatch = JSON.parse(localStorage.getItem('userInfo'))
  return http({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data: {
      name
    },
    headers: {
      Authorization: `Bearer ${manPatch.token}`
    }
  })
}
