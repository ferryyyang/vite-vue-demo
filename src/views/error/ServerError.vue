<template>
  <div class="server-error">
    <div class="error-container">
      <div class="error-illustration">
        <div class="error-symbol">500</div>
        <div class="error-image">🔧</div>
      </div>
      
      <div class="error-content">
        <h1>服务器内部错误</h1>
        <p class="error-message">抱歉，服务器遇到了一些问题，请稍后再试</p>
        
        <div class="error-details">
          <h3>可能的原因：</h3>
          <div class="details-grid">
            <div class="detail-item">
              <h4>🔧 系统维护</h4>
              <p>我们正在进行系统维护和升级</p>
            </div>
            <div class="detail-item">
              <h4>⚡ 网络异常</h4>
              <p>网络连接可能出现暂时性问题</p>
            </div>
            <div class="detail-item">
              <h4>💾 数据异常</h4>
              <p>请求的数据格式或内容异常</p>
            </div>
          </div>
        </div>
        
        <div class="error-actions">
          <button @click="refreshPage" class="btn btn-primary">
            刷新页面
          </button>
          <button @click="goHome" class="btn btn-secondary">
            返回首页
          </button>
          <button @click="contactSupport" class="btn btn-info">
            联系支持
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServerError',
  methods: {
    refreshPage() {
      window.location.reload()
    },
    
    goHome() {
      this.$router.push('/')
    },
    
    contactSupport() {
      alert('请联系技术支持：support@example.com')
    }
  }
}
</script>

<style scoped>
.server-error {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error-container {
  text-align: center;
  max-width: 800px;
}

.error-illustration {
  margin-bottom: 2rem;
}

.error-symbol {
  font-size: 6rem;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.error-image {
  font-size: 4rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.error-content h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-details {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: left;
}

.error-details h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  text-align: center;
}

.detail-item h4 {
  color: #e74c3c;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.detail-item p {
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
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
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
  transform: translateY(-2px);
}

.btn-info {
  background-color: #3498db;
  color: white;
}

.btn-info:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .error-symbol {
    font-size: 4rem;
  }
  
  .error-image {
    font-size: 3rem;
  }
  
  .error-content h1 {
    font-size: 2rem;
  }
  
  .error-message {
    font-size: 1rem;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
    text-align: center;
  }
}
</style>