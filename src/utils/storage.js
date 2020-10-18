const KEY = 'hm-tt-pc-userinfo'

// 设置
export const setUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

// 获取     这里是要赋值给别人 用在请求头中的   返回值是一个值
export const getUser = () => {
  return JSON.parse(localStorage.getItem(KEY)) || {}// 当token没有的时候 也是个对象  否则当没有token值得时候会报错 token为空
}

// 删除
export const delUser = () => {
  localStorage.removeItem(KEY)
}
