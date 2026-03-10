// 功能示例数据
export const examplesData = [
  {
    id: '2d-map',
    title: '二维地图',
    icon: 'el-icon-map-location',
    children: [
      {
        id: 'create-map',
        title: '创建地图',
        codeType: 'vue',
        code: `<template>
  <div class="map-container">
    <div ref="mapContainer" class="map-wrapper">
      <div class="mock-map">
        <el-icon :size="40" color="#fff"><Location /></el-icon>
        <p>🗺️ 地图容器</p>
      </div>
    </div>
    <el-card class="map-info">
      <h3>🗺️ 地图已创建</h3>
      <p>中心点：{{ center.join(', ') }}</p>
      <p>缩放级别：{{ zoom }}</p>
      <el-tag type="success">Leaflet 示例</el-tag>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CreateMap',
  data() {
    return {
      map: null,
      center: [31.2304, 121.4737],
      zoom: 13,
      mapLoaded: false
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const container = this.$refs.mapContainer
      if (container) {
        this.mapLoaded = true
        this.$message.success('地图初始化成功！')
      }
    }
  }
}
<\/script>

<style scoped>
.map-container {
  position: relative;
  height: 600px;
}

.map-wrapper {
  height: 100%;
  width: 100%;
}

.mock-map {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.mock-map p {
  margin-top: 20px;
  font-size: 18px;
}

.map-info {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  z-index: 1000;
}

.map-info h3 {
  margin-top: 0;
  color: #409EFF;
}

.map-info p {
  margin: 10px 0;
  color: #606266;
}
</style>`,
        htmlCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>创建地图</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    body { margin: 0; padding: 0; }
    .map-container { position: relative; height: 600px; }
    #map { height: 100%; width: 100%; }
    .map-info {
      position: absolute;
      top: 20px;
      right: 20px;
      background: white;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
      z-index: 1000;
    }
  </style>
</head>
<body>
  <div class="map-container">
    <div id="map"></div>
    <div class="map-info">
      <h3>🗺️ 地图已创建</h3>
      <p>中心点：31.2304, 121.4737</p>
      <p>缩放级别：13</p>
      <p style="color: #409EFF; font-size: 12px;">天地图 · 矢量底图</p>
    </div>
  </div>
  
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
  <script>
    // 天地图 API Key（需要到天地图官网申请）
    var tiandituKey = 'a76b9ea6e49fb0eecdb1ed34d1e75930';
    
    var map = L.map('map').setView([31.2304, 121.4737], 13);
    
    // 天地图矢量底图
    L.tileLayer('https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tiandituKey, {
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      attribution: '© 天地图'
    }).addTo(map);
    
    // 天地图注记层
    L.tileLayer('https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tiandituKey, {
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      attribution: '© 天地图'
    }).addTo(map);
  <\/script>
</body>
</html>`
      },
      {
        id: 'add-layer',
        title: '添加图层',
        code: `<template>
  <div class="layer-demo">
    <div ref="mapContainer" class="map-wrapper">
      <div class="mock-map">
        <el-icon :size="40" color="#67C23A"><Location /></el-icon>
        <p>模拟地图容器</p>
      </div>
    </div>
    <el-card class="layer-controls">
      <h4>📑 图层控制</h4>
      <el-checkbox v-model="showMarker">显示标记</el-checkbox>
      <el-checkbox v-model="showPolygon">显示多边形</el-checkbox>
      <el-checkbox v-model="showPopup">显示弹窗</el-checkbox>
      <el-divider></el-divider>
      <el-tag size="mini" :type="activeLayers > 0 ? 'success' : 'info'">
        已激活 {{ activeLayers }} 个图层
      </el-tag>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AddLayer',
  data() {
    return {
      showMarker: true,
      showPolygon: true,
      showPopup: false
    }
  },
  computed: {
    activeLayers() {
      let count = 0
      if (this.showMarker) count++
      if (this.showPolygon) count++
      if (this.showPopup) count++
      return count
    }
  },
  watch: {
    showMarker(val) {
      this.$message.info('标记图层已' + (val ? '开启' : '关闭'))
    },
    showPolygon(val) {
      this.$message.info('多边形图层已' + (val ? '开启' : '关闭'))
    },
    showPopup(val) {
      this.$message.info('弹窗图层已' + (val ? '开启' : '关闭'))
    }
  }
}
<\/script>

<style scoped>
.layer-demo {
  position: relative;
  height: 600px;
}

.map-wrapper {
  height: 100%;
  width: 100%;
}

.mock-map {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.mock-map p {
  margin-top: 20px;
  font-size: 18px;
}

.layer-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 250px;
  z-index: 1000;
}

.layer-controls h4 {
  margin-top: 0;
  color: #409EFF;
}

.el-checkbox {
  display: block;
  margin: 10px 0;
}
</style>`,
        htmlCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>添加图层</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
    .layer-demo { position: relative; height: 600px; }
    #map { height: 100%; width: 100%; }
    .layer-controls {
      position: absolute;
      top: 20px;
      right: 20px;
      background: white;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
      z-index: 1000;
      min-width: 200px;
    }
    .layer-control {
      margin: 10px 0;
      display: flex;
      align-items: center;
    }
    .layer-control input {
      margin-right: 10px;
    }
  </style>
</head>
<body>
  <div class="layer-demo">
    <div id="map"></div>
    <div class="layer-controls">
      <h4>📑 图层控制</h4>
      <label class="layer-control">
        <input type="checkbox" id="showMarker" checked> 显示标记
      </label>
      <label class="layer-control">
        <input type="checkbox" id="showPolygon" checked> 显示多边形
      </label>
      <label class="layer-control">
        <input type="checkbox" id="showPopup"> 显示弹窗
      </label>
      <p style="color: #67C23A; font-size: 12px; margin-top: 10px;">✓ 天地图底图</p>
    </div>
  </div>
  
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
  <script>
    // 天地图 API Key（需要到天地图官网申请）
    var tiandituKey = '您的天地图 API Key';
    
    var map = L.map('map').setView([31.2304, 121.4737], 13);
    
    // 天地图矢量底图
    L.tileLayer('https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tiandituKey, {
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      attribution: '© 天地图'
    }).addTo(map);
    
    // 天地图注记层
    L.tileLayer('https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tiandituKey, {
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      attribution: '© 天地图'
    }).addTo(map);
    
    var marker = L.marker([31.2304, 121.4737]).addTo(map);
    marker.bindPopup('<b>上海</b><br>天地图示例').openPopup();
    
    var polygon = L.polygon([
      [31.2304, 121.4737],
      [31.2354, 121.4837],
      [31.2254, 121.4837]
    ]).addTo(map);
    
    document.getElementById('showMarker').addEventListener('change', function(e) {
      if (e.target.checked) {
        map.addLayer(marker);
      } else {
        map.removeLayer(marker);
      }
    });
    
    document.getElementById('showPolygon').addEventListener('change', function(e) {
      if (e.target.checked) {
        map.addLayer(polygon);
      } else {
        map.removeLayer(polygon);
      }
    });
  <\/script>
</body>
</html>`
      }
    ]
  },
  {
    id: '3d-map',
    title: '三维地图',
    icon: 'el-icon-ship',
    children: [
      {
        id: 'init-3d',
        title: '初始化地图',
        codeType: 'vue',
        code: `<template>
  <div class="globe-container">
    <div ref="globeContainer" class="globe-wrapper">
      <div class="mock-globe">
        <el-icon :size="60" color="#fff"><Globe /></el-icon>
        <p>🌍 三维地球</p>
      </div>
    </div>
    <el-card class="globe-info">
      <h3>🌍 三维地球</h3>
      <p>使用 Cesium.js 创建三维地球</p>
      <el-tag type="success">WebGL</el-tag>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Init3DMap',
  data() {
    return {
      viewer: null
    }
  },
  mounted() {
    this.initGlobe()
  },
  beforeDestroy() {
    if (this.viewer) {
      this.viewer.destroy()
    }
  },
  methods: {
    initGlobe() {
      // 模拟三维地球初始化
      this.$message.success('三维地球初始化成功！')
    }
  }
}
<\/script>

<style scoped>
.globe-container {
  position: relative;
  height: 600px;
}

.globe-wrapper {
  height: 100%;
  width: 100%;
}

.mock-globe {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.mock-globe p {
  margin-top: 20px;
  font-size: 18px;
}

.globe-info {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  z-index: 1000;
}
</style>`,
        htmlCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>初始化地图</title>
  <link rel="stylesheet" href="https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Widgets/widgets.css">
  <style>
    body { margin: 0; padding: 0; }
    .globe-container { position: relative; height: 600px; }
    #globe { height: 100%; width: 100%; }
    .globe-info {
      position: absolute;
      top: 20px;
      right: 20px;
      background: white;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
      z-index: 1000;
    }
  </style>
</head>
<body>
  <div class="globe-container">
    <div id="globe"></div>
    <div class="globe-info">
      <h3>🌍 三维地球</h3>
      <p>使用 Cesium.js 创建三维地球</p>
      <div style="color: #67C23A;">WebGL</div>
    </div>
  </div>
  
  <script src="https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Cesium.js"><\/script>
  <script>
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZjQyM2U1MS0zZjE4LTRmZjMtYTc1NS03MzQ5M2ExYzUzYzUiLCJpZCI6MTIxNTc2LCJpYXQiOjE2MzQ4ODQ1MDR9.7rH7La-G6_kQKr6P5UuNKi0aXSQY5dqC1nhg6V0qo7Y';
    
    var viewer = new Cesium.Viewer('globe', {
      terrainProvider: Cesium.createWorldTerrain()
    });
    
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(121.4737, 31.2304, 10000000),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-90),
        roll: 0.0
      }
    });
  <\/script>
</body>
</html>`
      },
      {
        id: '3d-toolbar',
        title: '三维工具条',
        codeType: 'vue',
        code: `<template>
  <div class="toolbar-demo">
    <div ref="globeContainer" class="globe-wrapper">
      <div class="mock-globe">
        <el-icon :size="60" color="#fff"><Globe /></el-icon>
        <p>🌍 三维地球</p>
      </div>
    </div>
    <el-card class="toolbar">
      <h4>🛠️ 工具条</h4>
      <el-button-group>
        <el-button @click="rotateLeft" title="向左旋转">
          <i class="el-icon-refresh-left"></i>
        </el-button>
        <el-button @click="rotateRight" title="向右旋转">
          <i class="el-icon-refresh-right"></i>
        </el-button>
        <el-button @click="zoomIn" title="放大">
          <i class="el-icon-zoom-in"></i>
        </el-button>
        <el-button @click="zoomOut" title="缩小">
          <i class="el-icon-zoom-out"></i>
        </el-button>
        <el-button @click="resetView" title="重置视图">
          <i class="el-icon-home"></i>
        </el-button>
      </el-button-group>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '3DToolbar',
  data() {
    return {
      viewer: null
    }
  },
  mounted() {
    this.initGlobe()
  },
  beforeDestroy() {
    if (this.viewer) {
      this.viewer.destroy()
    }
  },
  methods: {
    initGlobe() {
      this.$message.success('三维工具条已加载！')
    },
    rotateLeft() {
      this.$message.info('向左旋转')
    },
    rotateRight() {
      this.$message.info('向右旋转')
    },
    zoomIn() {
      this.$message.info('放大')
    },
    zoomOut() {
      this.$message.info('缩小')
    },
    resetView() {
      this.$message.info('重置视图')
    }
  }
}
<\/script>

<style scoped>
.toolbar-demo {
  position: relative;
  height: 600px;
}

.globe-wrapper {
  height: 100%;
  width: 100%;
}

.mock-globe {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.mock-globe p {
  margin-top: 20px;
  font-size: 18px;
}

.toolbar {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
}
</style>`,
        htmlCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>三维工具条</title>
  <link rel="stylesheet" href="https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Widgets/widgets.css">
  <style>
    body { margin: 0; padding: 0; }
    .toolbar-demo { position: relative; height: 600px; }
    #globe { height: 100%; width: 100%; }
    .toolbar {
      position: absolute;
      top: 20px;
      left: 20px;
      background: white;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
      z-index: 1000;
    }
  </style>
</head>
<body>
  <div class="toolbar-demo">
    <div id="globe"></div>
    <div class="toolbar">
      <h4>🛠️ 工具条</h4>
      <button onclick="rotateLeft()">←</button>
      <button onclick="rotateRight()">→</button>
      <button onclick="zoomIn()">+</button>
      <button onclick="zoomOut()">-</button>
      <button onclick="resetView()">⌂</button>
    </div>
  </div>
  
  <script src="https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Cesium.js"><\/script>
  <script>
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZjQyM2U1MS0zZjE4LTRmZjMtYTc1NS03MzQ5M2ExYzUzYzUiLCJpZCI6MTIxNTc2LCJpYXQiOjE2MzQ4ODQ1MDR9.7rH7La-G6_kQKr6P5UuNKi0aXSQY5dqC1nhg6V0qo7Y';
    
    var viewer = new Cesium.Viewer('globe', {
      animation: false,
      timeline: false
    });
    
    function rotateLeft() {
      viewer.camera.rotateLeft(Cesium.Math.toRadians(15));
    }
    
    function rotateRight() {
      viewer.camera.rotateRight(Cesium.Math.toRadians(15));
    }
    
    function zoomIn() {
      viewer.camera.zoomIn(2);
    }
    
    function zoomOut() {
      viewer.camera.zoomOut(2);
    }
    
    function resetView() {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(121.4737, 31.2304, 10000000)
      });
    }
  <\/script>
</body>
</html>`
      }
    ]
  }
]
