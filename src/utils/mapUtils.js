/**
 * 地图工具函数集合
 */

// 坐标转换相关工具
export const coordinateUtils = {
  /**
   * 将十进制度数转换为度分秒格式
   * @param {number} decimal - 十进制度数
   * @returns {string} 度分秒格式字符串
   */
  decimalToDMS(decimal) {
    const absDecimal = Math.abs(decimal)
    const degrees = Math.floor(absDecimal)
    const minutes = Math.floor((absDecimal - degrees) * 60)
    const seconds = ((absDecimal - degrees - minutes / 60) * 3600).toFixed(2)
    
    return `${degrees}°${minutes}'${seconds}"${decimal >= 0 ? 'N' : 'S'}`
  },
  
  /**
   * 将度分秒转换为十进制度数
   * @param {string} dms - 度分秒字符串
   * @returns {number} 十进制度数
   */
  dmsToDecimal(dms) {
    // 简化的解析实现
    const match = dms.match(/(\d+)°(\d+)'([\d.]+)"([NSEW])/)
    if (!match) return null
    
    const [, degrees, minutes, seconds, direction] = match
    const decimal = parseInt(degrees) + parseInt(minutes) / 60 + parseFloat(seconds) / 3600
    
    return (direction === 'S' || direction === 'W') ? -decimal : decimal
  },
  
  /**
   * 计算两点间距离（使用 Haversine 公式）
   * @param {Array} point1 - 第一个点 [纬度, 经度]
   * @param {Array} point2 - 第二个点 [纬度, 经度]
   * @returns {number} 距离（米）
   */
  calculateDistance(point1, point2) {
    const [lat1, lon1] = point1
    const [lat2, lon2] = point2
    
    const R = 6371e3 // 地球半径（米）
    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lon2 - lon1) * Math.PI / 180
    
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    
    return R * c
  }
}

// 地图边界处理工具
export const boundsUtils = {
  /**
   * 扩展边界以包含指定点
   * @param {Object} bounds - 当前边界对象
   * @param {Array} point - 要包含的点 [纬度, 经度]
   * @returns {Object} 扩展后的边界对象
   */
  extendBounds(bounds, point) {
    if (!bounds) {
      return {
        minLat: point[0],
        maxLat: point[0],
        minLng: point[1],
        maxLng: point[1]
      }
    }
    
    return {
      minLat: Math.min(bounds.minLat, point[0]),
      maxLat: Math.max(bounds.maxLat, point[0]),
      minLng: Math.min(bounds.minLng, point[1]),
      maxLng: Math.max(bounds.maxLng, point[1])
    }
  },
  
  /**
   * 计算边界中心点
   * @param {Object} bounds - 边界对象
   * @returns {Array} 中心点坐标 [纬度, 经度]
   */
  getBoundsCenter(bounds) {
    return [
      (bounds.minLat + bounds.maxLat) / 2,
      (bounds.minLng + bounds.maxLng) / 2
    ]
  },
  
  /**
   * 计算适合的缩放级别
   * @param {Object} bounds - 边界对象
   * @param {Object} mapSize - 地图尺寸 {width, height}
   * @returns {number} 建议的缩放级别
   */
  calculateFitZoom(bounds, mapSize) {
    const latDiff = bounds.maxLat - bounds.minLat
    const lngDiff = bounds.maxLng - bounds.minLng
    
    // 简化的缩放级别计算
    const latZoom = Math.floor(Math.log2(360 / latDiff))
    const lngZoom = Math.floor(Math.log2(360 / lngDiff))
    
    return Math.min(latZoom, lngZoom, 18) // 最大缩放到18级
  }
}

// 标记点数据验证工具
export const markerValidation = {
  /**
   * 验证标记点数据的有效性
   * @param {Object} markerData - 标记点数据
   * @returns {Object} 验证结果 {isValid: boolean, errors: Array}
   */
  validateMarker(markerData) {
    const errors = []
    
    // 验证必需字段
    if (!markerData.position || !Array.isArray(markerData.position)) {
      errors.push('缺少有效的坐标位置')
    } else {
      const [lat, lng] = markerData.position
      if (typeof lat !== 'number' || typeof lng !== 'number') {
        errors.push('坐标必须是数字类型')
      }
      if (lat < -90 || lat > 90) {
        errors.push('纬度必须在-90到90之间')
      }
      if (lng < -180 || lng > 180) {
        errors.push('经度必须在-180到180之间')
      }
    }
    
    if (!markerData.title || typeof markerData.title !== 'string') {
      errors.push('缺少有效的标题')
    }
    
    if (!markerData.description || typeof markerData.description !== 'string') {
      errors.push('缺少有效的描述')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },
  
  /**
   * 标准化标记点数据
   * @param {Object} markerData - 原始标记点数据
   * @returns {Object} 标准化后的数据
   */
  normalizeMarker(markerData) {
    return {
      id: markerData.id || Date.now(),
      position: [
        parseFloat(markerData.position[0]),
        parseFloat(markerData.position[1])
      ],
      title: String(markerData.title || '').trim(),
      description: String(markerData.description || '').trim()
    }
  }
}

// 地图配置工具
export const mapConfig = {
  /**
   * 默认地图配置
   */
  defaults: {
    center: [39.9042, 116.4074], // 北京天安门
    zoom: 13,
    minZoom: 3,
    maxZoom: 18
  },
  
  /**
   * 支持的地图提供商配置
   */
  providers: {
    osm: {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    amap: {
      name: '高德地图',
      url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
      attribution: '&copy; 高德地图',
      subdomains: ['1', '2', '3', '4']
    },
    google: {
      name: 'Google Maps',
      url: 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Maps',
      subdomains: ['0', '1', '2', '3']
    }
  }
}

export default {
  coordinateUtils,
  boundsUtils,
  markerValidation,
  mapConfig
}