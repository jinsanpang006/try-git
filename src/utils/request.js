import axios from 'axios'

const http = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  timeout: 1000
//   headers: { 'X-Custom-Header': 'foobar' }
})

export default http
