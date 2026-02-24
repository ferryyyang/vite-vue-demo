# Axios 插件使用说明

## 概述

本项目已集成 Axios HTTP 客户端，并进行了全局配置和导入。

## 安装依赖

```bash
npm install axios
```

## 配置文件

配置文件位置：`src/apis/axios.js`

### 主要配置项

- **baseURL**: API 基础地址，可通过环境变量 `VUE_APP_BASE_API` 设置
- **timeout**: 请求超时时间（15秒）
- **headers**: 默认请求头设置

### 拦截器

#### 请求拦截器
- 自动添加认证 token（已注释，可根据需要启用）
- 日志记录请求信息

#### 响应拦截器
- 统一处理响应数据格式
- 错误状态码分类处理
- 网络错误处理

## 全局使用

在 `main.js` 中已将 axios 实例挂载到 Vue 原型上：

```javascript
Vue.prototype.$http = axios
```

### 在组件中使用

```javascript
export default {
  methods: {
    async fetchData() {
      try {
        // GET 请求
        const response = await this.$http.get('/api/users')
        console.log(response)
        
        // POST 请求
        const postData = { name: 'John', age: 30 }
        const result = await this.$http.post('/api/users', postData)
        console.log(result)
        
        // 带参数的请求
        const params = { page: 1, size: 10 }
        const data = await this.$http.get('/api/users', { params })
        console.log(data)
        
      } catch (error) {
        console.error('请求失败:', error)
      }
    }
  }
}
```

## API 示例

访问 `/calendar/api` 查看完整的使用示例。

### 支持的方法

```javascript
// GET 请求
this.$http.get(url[, config])

// POST 请求
this.$http.post(url[, data[, config]])

// PUT 请求
this.$http.put(url[, data[, config]])

// DELETE 请求
this.$http.delete(url[, config])

// PATCH 请求
this.$http.patch(url[, data[, config]])
```

## 错误处理

### 状态码处理

- **401**: 未授权，需要重新登录
- **403**: 禁止访问
- **404**: 请求地址不存在
- **500**: 服务器内部错误

### 自定义错误处理

```javascript
try {
  const response = await this.$http.get('/api/data')
} catch (error) {
  if (error.response) {
    // 服务器返回错误响应
    console.log(error.response.status)
    console.log(error.response.data)
  } else if (error.request) {
    // 请求已发出但没有收到响应
    console.log('网络错误')
  } else {
    // 其他错误
    console.log('请求配置错误', error.message)
  }
}
```

## 环境变量配置

在项目根目录创建 `.env` 文件：

```bash
# 开发环境
VUE_APP_BASE_API=http://localhost:3000/api

# 生产环境
# VUE_APP_BASE_API=https://your-api-domain.com/api
```

## 注意事项

1. 所有 API 请求都应该通过 `this.$http` 发起
2. 建议在 Vuex actions 中处理复杂的 API 调用
3. 敏感信息如 token 应该存储在 Vuex 或 localStorage 中
4. 生产环境记得配置正确的 baseURL
5. 建议为不同的业务模块创建专门的 API 服务文件

## 扩展配置

可以根据项目需求在 `axios.js` 中添加更多配置：

- 请求/响应数据转换
- 取消重复请求
- 请求进度显示
- Mock 数据支持