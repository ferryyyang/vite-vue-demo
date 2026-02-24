import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  // baseURL: 'http://127.0.0.1:8080', // process.env.VUE_APP_BASE_API || '', // api 的 base_url
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 可以在这里添加 token 等认证信息
    // const token = localStorage.getItem('access_token')
    // if (token) {
    //   config.headers['Authorization'] = 'Bearer ' + token
    // }
    
    console.log('请求发送:', config)
    return config
  },
  error => {
    // 对请求错误做些什么
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const res = response.data
    
    // 可以根据实际的后端返回格式进行调整
    // if (res.code !== 200) {
    //   // 处理业务错误
    //   console.error('业务错误:', res.message)
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
    
    console.log('响应接收:', res)
    return res
  },
  error => {
    // 对响应错误做点什么
    console.error('响应错误:', error)
    
    // 可以根据不同的错误状态码进行处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，可以跳转到登录页
          console.error('未授权，请重新登录')
          break
        case 403:
          // 禁止访问
          console.error('拒绝访问')
          break
        case 404:
          // 请求地址出错
          console.error('请求地址出错')
          break
        case 500:
          // 服务器内部错误
          console.error('服务器内部错误')
          break
        default:
          console.error(`错误代码: ${error.response.status}`)
      }
    } else {
      // 网络错误
      console.error('网络错误')
    }
    
    return Promise.reject(error)
  }
)

export default service