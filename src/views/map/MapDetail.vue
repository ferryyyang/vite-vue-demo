<template>
  <div class="map-detail">
    <div class="page-header">
      <h2>交互式地图</h2>
      <p>基于 Leaflet 的地图展示与标记点管理</p>
    </div>
    
    <div class="map-container-wrapper">
      <!-- 地图控制面板 -->
      <div class="control-panel">
        <div class="panel-section">
          <h3>地图信息</h3>
          <div class="info-item">
            <label>中心点:</label>
            <span>{{ mapCenterDisplay }}</span>
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
        
        <div class="panel-section">
          <h3>操作控制</h3>
          <button @click="addRandomMarker" class="btn btn-secondary">
            添加随机标记点
          </button>
          <button @click="clearAllMarkers" class="btn btn-danger">
            清空所有标记
          </button>
          <button @click="resetMapView" class="btn btn-info">
            重置视图
          </button>
        </div>
        
        <div class="panel-section">
          <h3>底图切换</h3>
          <select v-model="currentTileLayer" @change="changeTileLayer" class="form-select">
            <option value="osm">OpenStreetMap</option>
            <option value="amap">高德地图</option>
            <option value="google">Google Maps</option>
          </select>
        </div>
      </div>
      
      <!-- 地图容器 -->
      <div class="map-wrapper">
        <div id="map-container" ref="mapContainer"></div>
      </div>
    </div>
    
    <!-- 标记点列表 -->
    <div class="markers-list">
      <h3>标记点列表</h3>
      <div v-if="markers.length === 0" class="no-markers">
        暂无标记点
      </div>
      <div v-else class="markers-grid">
        <div 
          v-for="marker in markers" 
          :key="marker.id" 
          class="marker-card"
        >
          <h4>{{ marker.title }}</h4>
          <p class="map-feature-desc">{{ marker.description }}</p>
          <div class="marker-coords">
            {{ formatCoordinates(marker.position) }}
          </div>
          <button 
            @click="removeMarker(marker.id)" 
            class="btn btn-small btn-danger"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'MapDetail',
  data() {
    return {
      map: null,
      markersLayer: L.layerGroup(),
      currentTileLayer: 'osm',
      tileLayers: {
        osm: {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        amap: {
          url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
          attribution: '&copy; 高德地图',
          subdomains: ['1', '2', '3', '4']
        },
        google: {
          url: 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
          attribution: '&copy; Google Maps',
          subdomains: ['0', '1', '2', '3']
        }
      }
    }
  },
  
  computed: {
    // 从 Vuex 获取地图状态
    ...mapState('map', ['mapCenter', 'zoomLevel']),
    ...mapGetters('map', ['allMarkers', 'markersCount']),
    
    // 计算属性
    markers() {
      return this.allMarkers
    },
    
    mapCenterDisplay() {
      return `${this.mapCenter[0].toFixed(4)}, ${this.mapCenter[1].toFixed(4)}`
    }
  },
  
  mounted() {
    this.initMap()
    this.addExistingMarkers()
  },
  
  beforeDestroy() {
    // 组件销毁前清理地图实例
    if (this.map) {
      this.map.remove()
    }
  },
  
  methods: {
    // 初始化地图
    initMap() {
      try {
        // 创建地图实例
        this.map = L.map('map-container', {
          center: this.mapCenter,
          zoom: this.zoomLevel,
          zoomControl: true
        })
        
        // 保存地图实例到 Vuex
        this.initMapInstance(this.map)
        
        // 添加默认底图图层
        this.addTileLayer('osm')
        
        // 添加标记点图层组
        this.markersLayer.addTo(this.map)
        
        // 监听地图事件
        this.setupMapEvents()
        
        console.log('地图初始化完成')
      } catch (error) {
        console.error('地图初始化失败:', error)
      }
    },
    
    // 添加瓦片图层
    addTileLayer(layerType) {
      const layerConfig = this.tileLayers[layerType]
      
      // 移除现有图层
      if (this.currentBaseLayer) {
        this.map.removeLayer(this.currentBaseLayer)
      }
      
      // 创建新的图层
      this.currentBaseLayer = L.tileLayer(layerConfig.url, {
        attribution: layerConfig.attribution,
        subdomains: layerConfig.subdomains || ['a', 'b', 'c']
      }).addTo(this.map)
      
      this.currentTileLayer = layerType
    },
    
    // 切换底图
    changeTileLayer() {
      this.addTileLayer(this.currentTileLayer)
    },
    
    // 设置地图事件监听
    setupMapEvents() {
      // 监听地图移动事件
      this.map.on('moveend', () => {
        const center = this.map.getCenter()
        this.updateMapCenter([center.lat, center.lng])
      })
      
      // 监听缩放事件
      this.map.on('zoomend', () => {
        const zoom = this.map.getZoom()
        this.updateZoomLevel(zoom)
      })
      
      // 监听点击事件添加标记点
      this.map.on('click', (e) => {
        this.addMarkerAtPosition(e.latlng)
      })
    },
    
    // 添加现有标记点到地图
    addExistingMarkers() {
      this.markers.forEach(markerData => {
        this.createMapMarker(markerData)
      })
    },
    
    // 在指定位置创建地图标记点
    createMapMarker(markerData) {
      const marker = L.marker(markerData.position)
        .bindPopup(`
          <div class="marker-popup">
            <h4>${markerData.title}</h4>
            <p class="map-feature-desc">${markerData.description}</p>
            <small>坐标: ${this.formatCoordinates(markerData.position)}</small>
          </div>
        `)
        .addTo(this.markersLayer)
      
      // 将标记点对象存储到数据中以便后续操作
      marker._data = markerData
      
      return marker
    },
    
    // 在指定经纬度添加标记点
    addMarkerAtPosition(latlng) {
      const markerData = {
        position: [latlng.lat, latlng.lng],
        title: `标记点 ${this.markersCount + 1}`,
        description: `通过点击地图添加的标记点`
      }
      
      this.addMarker(markerData)
      this.createMapMarker(markerData)
    },
    
    // 添加随机标记点
    addRandomMarker() {
      // 在当前地图范围内生成随机坐标
      const bounds = this.map.getBounds()
      const southWest = bounds.getSouthWest()
      const northEast = bounds.getNorthEast()
      
      const randomLat = southWest.lat + Math.random() * (northEast.lat - southWest.lat)
      const randomLng = southWest.lng + Math.random() * (northEast.lng - southWest.lng)
      
      const markerData = {
        position: [randomLat, randomLng],
        title: `随机标记 ${Date.now()}`,
        description: '这是一个随机生成的标记点'
      }
      
      this.addMarker(markerData)
      this.createMapMarker(markerData)
    },
    
    // 删除标记点
    removeMarker(markerId) {
      // 从 Vuex 状态中删除
      this.removeMarkerAction(markerId)
      
      // 从地图上删除对应的标记
      this.markersLayer.eachLayer(layer => {
        if (layer._data && layer._data.id === markerId) {
          this.markersLayer.removeLayer(layer)
        }
      })
    },
    
    // 清空所有标记点
    clearAllMarkers() {
      if (confirm('确定要清空所有标记点吗？')) {
        this.clearMarkers()
        this.markersLayer.clearLayers()
      }
    },
    
    // 重置地图视图
    resetMapView() {
      this.map.setView(this.mapCenter, this.zoomLevel)
    },
    
    // 格式化坐标显示
    formatCoordinates(position) {
      return `${position[0].toFixed(4)}, ${position[1].toFixed(4)}`
    },
    
    // Vuex actions 映射
    ...mapActions('map', [
      'updateMapCenter',
      'updateZoomLevel',
      'addMarker',
      'removeMarkerAction',
      'clearMarkers',
      'initMapInstance'
    ])
  }
}
</script>

<style scoped>
.map-detail {
  padding: 1rem 0;
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

.map-container-wrapper {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  height: 600px;
}

.control-panel {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow-y: auto;
}

.panel-section {
  margin-bottom: 1.5rem;
}

.panel-section:last-child {
  margin-bottom: 0;
}

.panel-section h3 {
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

.map-wrapper {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

#map-container {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
}

/* 标记点弹窗样式 */
.marker-popup h4 {
  margin: 0 0 0.5rem 0;
  color: #42b983;
}

.marker-popup p {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.marker-popup small {
  color: #7f8c8d;
}

/* 地图要素描述文本样式 - 最少占用两行高度 */
.map-feature-desc {
  color: #7f8c8d;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
  min-height: 2.8em; /* 2行 × 1.4行高 = 2.8em */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 按钮样式 */
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

.btn-primary {
  background-color: #42b983;
  color: white;
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

.btn-small {
  padding: 0.5rem;
  font-size: 0.9rem;
  width: auto;
  display: inline-block;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

/* 标记点列表样式 */
.markers-list {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.markers-list h3 {
  color: #42b983;
  margin-bottom: 1rem;
}

.no-markers {
  text-align: center;
  color: #7f8c8d;
  padding: 2rem;
}

.markers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.marker-card {
  border: 1px solid #ecf0f1;
  border-radius: 8px;
  padding: 1rem;
  background: #f8f9fa;
}

.marker-card h4 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.marker-card p {
  color: #7f8c8d;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.marker-coords {
  font-size: 0.8rem;
  color: #95a5a6;
  margin-bottom: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .map-container-wrapper {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .control-panel {
    order: 2;
  }
  
  .map-wrapper {
    order: 1;
    height: 400px;
  }
  
  .markers-grid {
    grid-template-columns: 1fr;
  }
}
</style>