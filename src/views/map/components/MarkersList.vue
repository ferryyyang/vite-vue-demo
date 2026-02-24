<template>
  <div class="markers-list">
    <div class="list-header">
      <h3>标记点列表</h3>
      <span class="marker-count">{{ markers.length }} 个标记点</span>
    </div>
    
    <div v-if="markers.length === 0" class="no-markers">
      <div class="empty-state">
        <span class="empty-icon">📍</span>
        <p>暂无标记点</p>
        <small>点击地图添加第一个标记点</small>
      </div>
    </div>
    
    <div v-else class="markers-container">
      <div 
        v-for="marker in markers" 
        :key="marker.id" 
        class="marker-card"
      >
        <div class="marker-header">
          <h4 class="marker-title">{{ marker.title }}</h4>
          <button 
            @click="$emit('remove-marker', marker.id)" 
            class="btn-remove"
            title="删除标记点"
          >
            ×
          </button>
        </div>
        <p class="marker-description">{{ marker.description }}</p>
        <div class="marker-coords">
          <span class="coords-label">坐标:</span>
          <span class="coords-value">{{ formatCoordinates(marker.position) }}</span>
        </div>
        <div class="marker-actions">
          <button 
            @click="$emit('focus-marker', marker)" 
            class="btn btn-small btn-secondary"
          >
            定位到地图
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarkersList',
  props: {
    markers: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatCoordinates(position) {
      return `${position[0].toFixed(4)}, ${position[1].toFixed(4)}`
    }
  }
}
</script>

<style scoped>
.markers-list {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ecf0f1;
}

.list-header h3 {
  color: #42b983;
  margin: 0;
}

.marker-count {
  background: #42b983;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.no-markers {
  text-align: center;
  padding: 2rem;
}

.empty-state {
  color: #7f8c8d;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-state p {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
}

.empty-state small {
  font-size: 0.9rem;
}

.markers-container {
  max-height: 400px;
  overflow-y: auto;
}

.marker-card {
  border: 1px solid #ecf0f1;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.marker-card:hover {
  border-color: #42b983;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.1);
}

.marker-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.marker-title {
  color: #2c3e50;
  margin: 0;
  font-size: 1.1rem;
  flex: 1;
}

.btn-remove {
  background: #e74c3c;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-remove:hover {
  background: #c0392b;
  transform: scale(1.1);
}

.marker-description {
  color: #7f8c8d;
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.marker-coords {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
}

.coords-label {
  color: #95a5a6;
  margin-right: 0.5rem;
}

.coords-value {
  color: #2c3e50;
  font-family: monospace;
  background: #ecf0f1;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.marker-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.btn-small {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
}

.btn-secondary {
  background-color: #3498db;
  color: white;
}

.btn-secondary:hover {
  background-color: #2980b9;
  transform: translateY(-1px);
}

/* 滚动条样式 */
.markers-container::-webkit-scrollbar {
  width: 6px;
}

.markers-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.markers-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.markers-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .marker-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .marker-actions {
    justify-content: flex-end;
  }
}
</style>