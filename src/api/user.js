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

// 这里发送请求 会先到 拦截器 拿token

// 主页获取个人信息请求
export const Info = () => {
  return http({
    method: 'get',
    url: '/mp/v1_0/user/profile'
  })
}

// 编辑用户资料
export const userPatch = (name) => {
  return http({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data: {
      name
    }
  })
}
