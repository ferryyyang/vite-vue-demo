import Vue from 'vue'
import Vuex from 'vuex'

// 使用 Vuex 插件
Vue.use(Vuex)

// 地图状态模块
const mapModule = {
  namespaced: true,
  state: {
    // 地图中心点坐标 [纬度, 经度]
    mapCenter: [39.9042, 116.4074], // 默认北京天安门坐标
    // 地图缩放级别
    zoomLevel: 13,
    // 标记点列表
    markersList: [
      {
        id: 1,
        position: [39.9042, 116.4074],
        title: '天安门广场',
        description: '北京市中心地标'
      },
      {
        id: 2,
        position: [39.9163, 116.3972],
        title: '故宫博物院',
        description: '明清两代皇家宫殿'
      }
    ],
    // 地图实例引用
    mapInstance: null
  },
  
  mutations: {
    // 更新地图中心点
    SET_MAP_CENTER(state, center) {
      state.mapCenter = center
    },
    
    // 更新缩放级别
    SET_ZOOM_LEVEL(state, zoom) {
      state.zoomLevel = zoom
    },
    
    // 添加标记点
    ADD_MARKER(state, marker) {
      // 确保每个标记点都有唯一ID
      const newMarker = {
        id: Date.now(), // 使用时间戳作为临时ID
        ...marker
      }
      state.markersList.push(newMarker)
    },
    
    // 删除标记点
    REMOVE_MARKER(state, markerId) {
      const index = state.markersList.findIndex(marker => marker.id === markerId)
      if (index !== -1) {
        state.markersList.splice(index, 1)
      }
    },
    
    // 更新标记点信息
    UPDATE_MARKER(state, updatedMarker) {
      const index = state.markersList.findIndex(marker => marker.id === updatedMarker.id)
      if (index !== -1) {
        state.markersList.splice(index, 1, updatedMarker)
      }
    },
    
    // 清空所有标记点
    CLEAR_MARKERS(state) {
      state.markersList = []
    },
    
    // 设置地图实例
    SET_MAP_INSTANCE(state, map) {
      state.mapInstance = map
    }
  },
  
  actions: {
    // 异步更新地图中心点
    updateMapCenter({ commit }, center) {
      commit('SET_MAP_CENTER', center)
    },
    
    // 异步更新缩放级别
    updateZoomLevel({ commit }, zoom) {
      commit('SET_ZOOM_LEVEL', zoom)
    },
    
    // 添加新标记点
    addMarker({ commit }, markerData) {
      commit('ADD_MARKER', markerData)
    },
    
    // 删除标记点
    removeMarker({ commit }, markerId) {
      commit('REMOVE_MARKER', markerId)
    },
    
    // 更新标记点
    updateMarker({ commit }, markerData) {
      commit('UPDATE_MARKER', markerData)
    },
    
    // 初始化地图实例
    initMapInstance({ commit }, map) {
      commit('SET_MAP_INSTANCE', map)
    }
  },
  
  getters: {
    // 获取所有标记点
    allMarkers: state => state.markersList,
    
    // 根据ID获取特定标记点
    getMarkerById: state => id => {
      return state.markersList.find(marker => marker.id === id)
    },
    
    // 获取标记点数量
    markersCount: state => state.markersList.length,
    
    // 获取当前地图配置
    mapConfig: state => ({
      center: state.mapCenter,
      zoom: state.zoomLevel
    })
  }
}

// 创建 Vuex Store 实例
const store = new Vuex.Store({
  modules: {
    map: mapModule
  },
  strict: process.env.NODE_ENV !== 'production' // 生产环境关闭严格模式
})

export default store