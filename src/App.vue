<template>
  <div id="app">
    <!-- 固定头部 -->
    <el-header class="app-header">
      <div class="header-content">
        <!-- 系统标题 -->
        <div class="system-title">
          <i class="el-icon-location-outline"></i>
          <span class="title-text">地图演示系统</span>
        </div>
        
        <!-- 导航菜单 -->
        <el-menu
          :default-active="activeIndex"
          class="nav-menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#42b983"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">地图详情</el-menu-item>
          <el-menu-item index="3">用户中心</el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <!-- 可滚动内容区域 -->
    <div class="scrollable-content">
      <el-container class="main-container">
        <!-- 主要内容区域 -->
        <el-main class="app-main">
          <router-view />
        </el-main>

        <!-- 底部页脚 -->
        <el-footer class="app-footer">
          <div class="footer-content">
            <p>&copy; 2024 地图演示系统. 基于 Vite + Vue2 + Element UI + Leaflet 构建.</p>
            <div class="footer-links">
              <el-link type="info" href="#">关于我们</el-link>
              <el-link type="info" href="#">联系我们</el-link>
              <el-link type="info" href="#">隐私政策</el-link>
            </div>
          </div>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      switch(key) {
        case '1':
          this.$router.push('/');
          break;
        case '2':
          this.$router.push('/map');
          break;
        case '3':
          this.$router.push('/user');
          break;
      }
    }
  },
  watch: {
    '$route'(to) {
      // 根据路由更新激活的菜单项
      if (to.path === '/') {
        this.activeIndex = '1';
      } else if (to.path === '/map') {
        this.activeIndex = '2';
      } else if (to.path === '/user') {
        this.activeIndex = '3';
      }
    }
  }
}
</script>

<style scoped>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-header {
  padding: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  background-color: #42b983;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px !important;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.system-title {
  display: flex;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0; /* 防止标题被压缩 */
}

.system-title i {
  font-size: 24px;
  margin-right: 10px;
}

.title-text {
  white-space: nowrap;
}

.nav-menu {
  border-bottom: none;
  background-color: transparent !important;
  display: flex;
  flex-shrink: 0; /* 防止菜单被压缩 */
}

/* 覆盖Element UI默认的border-bottom样式 */
::v-deep .el-menu.el-menu--horizontal {
  border-bottom: unset !important;
}

.nav-menu ::v-deep .el-menu-item {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
}

/* 可滚动内容区域 - 隐藏滚动条但仍可滚动 */
.scrollable-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 60px; /* 为固定头部留出空间 */
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* 隐藏Webkit浏览器滚动条 */
.scrollable-content::-webkit-scrollbar {
  display: none;
}

.main-container {
  min-height: 100%;
}

.app-main {
  background-color: #f5f5f5;
  padding: 20px;
  min-height: calc(100vh - 180px); /* 减去头部和页脚高度 */
}

.app-footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px 0;
  flex-shrink: 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content p {
  margin: 0;
  font-size: 14px;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links .el-link {
  color: #bdc3c7;
}

.footer-links .el-link:hover {
  color: #42b983;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: row;
    gap: 15px;
    padding: 0 15px;
    height: 60px;
  }
  
  .system-title {
    font-size: 18px;
  }
  
  .system-title i {
    font-size: 20px;
    margin-right: 8px;
  }
  
  .nav-menu ::v-deep .el-menu-item {
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    padding: 0 12px;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  
  .footer-links {
    gap: 10px;
  }
  
  .app-main {
    padding: 10px;
    min-height: calc(100vh - 160px);
  }
}

/* 超小屏幕适配 */
@media (max-width: 480px) {
  .header-content {
    padding: 0 10px;
  }
  
  .system-title {
    font-size: 16px;
  }
  
  .nav-menu ::v-deep .el-menu-item {
    font-size: 13px;
    padding: 0 8px;
  }
}
</style>