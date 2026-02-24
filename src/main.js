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

// Use v-calendar & v-date-picker components
import VCalendar from 'v-calendar';
Vue.use(VCalendar, {
  // componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
  // ...,                // ...other defaults
});

// 使用 Element UI
Vue.use(ElementUI)

// 创建 Vue 实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')