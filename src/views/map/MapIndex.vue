<template>
  <div class="map-index">
    <div class="page-header">
      <h2>地图功能概览</h2>
      <p>选择您要查看的地图功能</p>
    </div>
    
    <div class="map-features">
      <div class="feature-card" @click="goToMapDetail">
        <div class="card-icon">
          <span class="icon">🗺️</span>
        </div>
        <h3>交互式地图</h3>
        <p class="map-feature-desc">查看完整的交互式地图功能，包括标记点管理、底图切换等高级功能。</p>
        <button class="btn btn-primary">进入详情</button>
      </div>
      
      <div class="feature-card">
        <div class="card-icon">
          <span class="icon">📍</span>
        </div>
        <h3>标记点管理</h3>
        <p class="map-feature-desc">管理系统中的所有标记点，支持添加、编辑、删除操作。</p>
        <button class="btn btn-secondary" disabled>即将开放</button>
      </div>
      
      <div class="feature-card">
        <div class="card-icon">
          <span class="icon">📊</span>
        </div>
        <h3>数据分析</h3>
        <p class="map-feature-desc">查看地图数据统计和分析报告。</p>
        <button class="btn btn-secondary" disabled>即将开放</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapIndex',
  methods: {
    goToMapDetail() {
      this.$router.push('/map/detail')
    }
  }
}
</script>

<style scoped>
.map-index {
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #7f8c8d;
  margin: 0;
}

.map-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

/* 地图要素描述文本样式 - 最少占用两行高度 */
.map-feature-desc {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  min-height: 3.2em; /* 2行 × 1.6行高 = 3.2em */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
  cursor: not-allowed;
}

.btn-secondary:hover {
  background-color: #95a5a6;
}
</style>