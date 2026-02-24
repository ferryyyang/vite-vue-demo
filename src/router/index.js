import Vue from 'vue'
import VueRouter from 'vue-router'

// 动态导入各模块页面组件
const HomeIndex = () => import('@/views/home/HomeIndex.vue')
const SassDemo = () => import('@/views/home/SassDemo.vue')
const MapIndex = () => import('@/views/map/MapIndex.vue')
const MapDetail = () => import('@/views/map/MapDetail.vue')
const UserIndex = () => import('@/views/user/UserIndex.vue')
const UserSettings = () => import('@/views/user/UserSettings.vue')
const CalendarIndex = () => import('@/views/calendar/CalendarIndex.vue')
const CalendarMonth = () => import('@/views/calendar/CalendarMonth.vue')
const TestCalendar = () => import('@/views/calendar/TestCalendar.vue')
const NotFound = () => import('@/views/error/NotFound.vue')
const ServerError = () => import('@/views/error/ServerError.vue')

// 使用 Vue Router 插件
Vue.use(VueRouter)

// 定义路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeIndex,
    meta: {
      title: '首页',
      module: 'home'
    }
  },
  {
    path: '/map',
    name: 'MapIndex',
    component: MapIndex,
    meta: {
      title: '地图功能',
      module: 'map'
    }
  },
  {
    path: '/map/detail',
    name: 'MapDetail',
    component: MapDetail,
    meta: {
      title: '地图详情',
      module: 'map'
    }
  },
  {
    path: '/user',
    name: 'UserIndex',
    component: UserIndex,
    meta: {
      title: '用户中心',
      module: 'user',
      // requiresAuth: true // 添加需要认证的元信息
    }
  },
  {
    path: '/user/settings',
    name: 'UserSettings',
    component: UserSettings,
    meta: {
      title: '账户设置',
      module: 'user'
    }
  },
  {
    path: '/calendar',
    name: 'CalendarIndex',
    component: CalendarIndex,
    meta: {
      title: '日历概览',
      module: 'calendar'
    }
  },
  {
    path: '/calendar/month/:month',
    name: 'CalendarMonth',
    component: CalendarMonth,
    props: true,
    meta: {
      title: '月份详情',
      module: 'calendar'
    }
  },
  {
    path: '/calendar/test',
    name: 'TestCalendar',
    component: TestCalendar,
    meta: {
      title: '日历测试',
      module: 'calendar'
    }
  },
  {
    path: '/sass',
    name: 'SassDemo',
    component: SassDemo,
    meta: {
      title: 'Sass演示',
      module: 'home'
    }
  },
  {
    path: '/500',
    name: 'ServerError',
    component: ServerError,
    meta: {
      title: '服务器错误',
      module: 'error'
    }
  },
  // 重定向规则
  { path: '/home', redirect: '/' },
  { path: '/map/index', redirect: '/map' },
  { path: '/user/index', redirect: '/user' },
  { path: '/calendar/index', redirect: '/calendar' },
  // 404 页面必须放在最后
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面未找到',
      module: 'error'
    }
  }
]

// 创建路由实例
const router = new VueRouter({
  mode: 'history', // 使用 HTML5 History 模式
  base: '/',
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 路由切换时滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 路由守卫 - 设置页面标题和权限控制
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 地图演示系统` : '地图演示系统'
  
  // 简单的权限控制示例
  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = true // 实际项目中应该从store或API获取
  
  // 需要登录的页面
  const authPages = ['/user', '/user/settings']
  
  if (authPages.includes(to.path) && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

// 路由后置守卫 - 页面访问统计等
router.afterEach((to, from) => {
  // 可以在这里添加页面访问统计、面包屑导航更新等逻辑
  console.log(`路由切换: ${from.path} -> ${to.path}`)
})

export default router