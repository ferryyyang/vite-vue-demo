<template>
  <div class="user-settings">
    <div class="page-header">
      <h2>账户设置</h2>
      <p>管理您的个人资料和系统偏好</p>
    </div>
    
    <div class="settings-container">
      <div class="settings-sidebar">
        <div class="sidebar-menu">
          <button 
            v-for="tab in tabs" 
            :key="tab.key"
            :class="['menu-item', { active: activeTab === tab.key }]"
            @click="activeTab = tab.key"
          >
            <span class="menu-icon">{{ tab.icon }}</span>
            <span class="menu-text">{{ tab.label }}</span>
          </button>
        </div>
      </div>
      
      <div class="settings-content">
        <!-- 个人资料设置 -->
        <div v-show="activeTab === 'profile'" class="settings-panel">
          <h3>个人资料</h3>
          <form class="settings-form">
            <div class="form-group">
              <label>用户名</label>
              <input type="text" v-model="profile.username" placeholder="请输入用户名">
            </div>
            
            <div class="form-group">
              <label>邮箱地址</label>
              <input type="email" v-model="profile.email" placeholder="请输入邮箱地址">
            </div>
            
            <div class="form-group">
              <label>个人简介</label>
              <textarea v-model="profile.bio" placeholder="简单介绍一下自己..." rows="4"></textarea>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-primary" @click="saveProfile">保存更改</button>
              <button type="button" class="btn btn-secondary" @click="resetProfile">重置</button>
            </div>
          </form>
        </div>
        
        <!-- 系统偏好设置 -->
        <div v-show="activeTab === 'preferences'" class="settings-panel">
          <h3>系统偏好</h3>
          <div class="preference-group">
            <div class="preference-item">
              <label class="switch">
                <input type="checkbox" v-model="preferences.darkMode">
                <span class="slider"></span>
              </label>
              <span class="preference-label">深色主题</span>
            </div>
            
            <div class="preference-item">
              <label class="switch">
                <input type="checkbox" v-model="preferences.notifications">
                <span class="slider"></span>
              </label>
              <span class="preference-label">启用通知</span>
            </div>
            
            <div class="preference-item">
              <label class="switch">
                <input type="checkbox" v-model="preferences.autoSave">
                <span class="slider"></span>
              </label>
              <span class="preference-label">自动保存地图</span>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-primary" @click="savePreferences">保存设置</button>
          </div>
        </div>
        
        <!-- 安全设置 -->
        <div v-show="activeTab === 'security'" class="settings-panel">
          <h3>安全设置</h3>
          <div class="security-section">
            <h4>修改密码</h4>
            <form class="settings-form">
              <div class="form-group">
                <label>当前密码</label>
                <input type="password" v-model="security.currentPassword" placeholder="请输入当前密码">
              </div>
              
              <div class="form-group">
                <label>新密码</label>
                <input type="password" v-model="security.newPassword" placeholder="请输入新密码">
              </div>
              
              <div class="form-group">
                <label>确认新密码</label>
                <input type="password" v-model="security.confirmPassword" placeholder="请再次输入新密码">
              </div>
              
              <div class="form-actions">
                <button type="button" class="btn btn-primary" @click="changePassword">修改密码</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSettings',
  data() {
    return {
      activeTab: 'profile',
      tabs: [
        { key: 'profile', label: '个人资料', icon: '👤' },
        { key: 'preferences', label: '系统偏好', icon: '⚙️' },
        { key: 'security', label: '安全设置', icon: '🔒' }
      ],
      profile: {
        username: '访客用户',
        email: 'guest@example.com',
        bio: '这是一个示例用户简介'
      },
      preferences: {
        darkMode: false,
        notifications: true,
        autoSave: true
      },
      security: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    saveProfile() {
      alert('个人资料保存成功！')
    },
    
    resetProfile() {
      this.profile = {
        username: '访客用户',
        email: 'guest@example.com',
        bio: '这是一个示例用户简介'
      }
    },
    
    savePreferences() {
      alert('系统偏好设置保存成功！')
    },
    
    changePassword() {
      if (this.security.newPassword !== this.security.confirmPassword) {
        alert('两次输入的新密码不一致！')
        return
      }
      alert('密码修改成功！')
      this.security = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  }
}
</script>

<style scoped>
.user-settings {
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #7f8c8d;
  margin: 0;
}

.settings-container {
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.settings-sidebar {
  width: 250px;
  background: #f8f9fa;
  border-right: 1px solid #ecf0f1;
}

.sidebar-menu {
  padding: 1rem 0;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: #e9ecef;
}

.menu-item.active {
  background: #42b983;
  color: white;
}

.menu-icon {
  font-size: 1.2rem;
  margin-right: 0.75rem;
}

.settings-content {
  flex: 1;
  padding: 2rem;
}

.settings-panel h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ecf0f1;
}

.settings-form {
  max-width: 500px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:hover {
  background-color: #359c6d;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.preference-group {
  max-width: 500px;
}

.preference-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ecf0f1;
}

.preference-item:last-child {
  border-bottom: none;
}

.preference-label {
  margin-left: 1rem;
  color: #2c3e50;
  font-weight: 500;
}

/* 开关样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #42b983;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.security-section {
  max-width: 500px;
}

.security-section h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .settings-container {
    flex-direction: column;
  }
  
  .settings-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ecf0f1;
  }
  
  .sidebar-menu {
    display: flex;
    overflow-x: auto;
  }
  
  .menu-item {
    white-space: nowrap;
  }
  
  .settings-content {
    padding: 1.5rem;
  }
}
</style>