import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局导入 Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入全局样式文件
import './styles/global.css'
// import './styles/variables.scss'

// 使用 Element UI
Vue.use(ElementUI)

// 创建 Vue 实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')