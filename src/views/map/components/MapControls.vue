<template>
  <div class="map-controls">
    <div class="control-section">
      <h3>地图信息</h3>
      <div class="info-item">
        <label>中心点:</label>
        <span>{{ centerDisplay }}</span>
      </div>
      <div class="info-item">
        <label>缩放级别:</label>
        <span>{{ zoomLevel }}</span>
      </div>
      <div class="info-item">
        <label>标记点数量:</label>
        <span>{{ markersCount }}</span>
      </div>
    </div>
    
    <div class="control-section">
      <h3>操作控制</h3>
      <button @click="$emit('add-random-marker')" class="btn btn-secondary btn-block">
        添加随机标记点
      </button>
      <button @click="$emit('clear-markers')" class="btn btn-danger btn-block">
        清空所有标记
      </button>
      <button @click="$emit('reset-view')" class="btn btn-info btn-block">
        重置视图
      </button>
    </div>
    
    <div class="control-section">
      <h3>底图切换</h3>
      <select 
        :value="currentTileLayer" 
        @change="$emit('change-tile-layer', $event.target.value)"
        class="form-select"
      >
        <option value="osm">OpenStreetMap</option>
        <option value="amap">高德地图</option>
        <option value="google">Google Maps</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapControls',
  props: {
    mapCenter: {
      type: Array,
      required: true
    },
    zoomLevel: {
      type: Number,
      required: true
    },
    markersCount: {
      type: Number,
      default: 0
    },
    currentTileLayer: {
      type: String,
      default: 'osm'
    }
  },
  computed: {
    centerDisplay() {
      return `${this.mapCenter[0].toFixed(4)}, ${this.mapCenter[1].toFixed(4)}`
    }
  }
}
</script>

<style scoped>
.map-controls {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow-y: auto;
}

.control-section {
  margin-bottom: 1.5rem;
}

.control-section:last-child {
  margin-bottom: 0;
}

.control-section h3 {
  color: #42b983;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ecf0f1;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.info-item label {
  font-weight: bold;
  color: #2c3e50;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  text-align: center;
}

.btn:last-child {
  margin-bottom: 0;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.btn-block {
  display: block;
  width: 100%;
}

.btn-secondary {
  background-color: #3498db;
  color: white;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-info {
  background-color: #9b59b6;
  color: white;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-family: inherit;
  font-size: 1rem;
}

.form-select:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}
</style>