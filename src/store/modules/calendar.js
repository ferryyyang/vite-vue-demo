const state = {
  // 日志数据结构: { '2024-01': [{id, date, content, timestamp}, ...], ... }
  logs: JSON.parse(localStorage.getItem('calendar_logs')) || {}
}

const mutations = {
  // 保存日志
  SAVE_LOG(state, { monthKey, log }) {
    if (!state.logs[monthKey]) {
      state.logs[monthKey] = []
    }
    
    // 检查是否为编辑操作
    const existingIndex = state.logs[monthKey].findIndex(item => item.id === log.id)
    if (existingIndex >= 0) {
      // 更新现有日志
      state.logs[monthKey][existingIndex] = log
    } else {
      // 添加新日志
      state.logs[monthKey].push(log)
    }
    
    // 按日期排序
    state.logs[monthKey].sort((a, b) => new Date(a.date) - new Date(b.date))
    
    // 保存到本地存储
    localStorage.setItem('calendar_logs', JSON.stringify(state.logs))
  },
  
  // 删除日志
  DELETE_LOG(state, { monthKey, logId }) {
    if (state.logs[monthKey]) {
      state.logs[monthKey] = state.logs[monthKey].filter(log => log.id !== logId)
      
      // 如果该月份没有日志了，删除该月份的键
      if (state.logs[monthKey].length === 0) {
        delete state.logs[monthKey]
      }
      
      // 保存到本地存储
      localStorage.setItem('calendar_logs', JSON.stringify(state.logs))
    }
  },
  
  // 清空所有日志
  CLEAR_ALL_LOGS(state) {
    state.logs = {}
    localStorage.removeItem('calendar_logs')
  }
}

const actions = {
  // 保存日志
  saveLog({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        commit('SAVE_LOG', payload)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  
  // 删除日志
  deleteLog({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        commit('DELETE_LOG', payload)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  
  // 清空所有日志
  clearAllLogs({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('CLEAR_ALL_LOGS')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

const getters = {
  // 获取指定月份的日志
  getMonthLogs: (state) => (monthKey) => {
    return state.logs[monthKey] || []
  },
  
  // 获取指定日期的日志
  getDateLogs: (state) => (date) => {
    const monthKey = date.substring(0, 7) // YYYY-MM
    const monthLogs = state.logs[monthKey] || []
    return monthLogs.filter(log => log.date === date)
  },
  
  // 获取所有日志统计
  getAllStats: (state) => {
    let totalLogs = 0
    let monthlyStats = {}
    
    Object.keys(state.logs).forEach(monthKey => {
      const count = state.logs[monthKey].length
      totalLogs += count
      monthlyStats[monthKey] = count
    })
    
    return {
      total: totalLogs,
      monthly: monthlyStats
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}