<template>
  <div class="not-found">
    <div class="error-container">
      <div class="error-illustration">
        <div class="error-symbol">404</div>
        <div class="error-image">🗺️</div>
      </div>
      
      <div class="error-content">
        <h1>页面未找到</h1>
        <p class="error-message">抱歉，您访问的页面不存在或已被移除</p>
        
        <div class="error-suggestions">
          <h3>您可以尝试：</h3>
          <ul>
            <li>检查网址是否正确</li>
            <li>返回上一页</li>
            <li>访问我们的主页</li>
          </ul>
        </div>
        
        <div class="error-actions">
          <button @click="goBack" class="btn btn-secondary">
            ← 返回上页
          </button>
          <router-link to="/" class="btn btn-primary">
            前往首页
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error-container {
  text-align: center;
  max-width: 600px;
}

.error-illustration {
  margin-bottom: 2rem;
}

.error-symbol {
  font-size: 6rem;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.error-image {
  font-size: 4rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
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

.error-suggestions {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: left;
}

.error-suggestions h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.error-suggestions ul {
  list-style: none;
  padding: 0;
}

.error-suggestions li {
  padding: 0.5rem 0;
  color: #7f8c8d;
  position: relative;
  padding-left: 1.5rem;
}

.error-suggestions li::before {
  content: "•";
  color: #42b983;
  position: absolute;
  left: 0;
  font-weight: bold;
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
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
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