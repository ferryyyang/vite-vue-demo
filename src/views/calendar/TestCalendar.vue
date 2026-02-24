<template>
  <div class="test-calendar">
    <h1>日历功能测试</h1>
    <p>这是一个测试页面，用于验证日历模块的基本功能。</p>
    
    <div class="actions">
      <el-button @click="$router.push('/calendar')" type="primary">前往日历概览</el-button>
      <el-button @click="initDemoData" type="success">初始化演示数据</el-button>
      <el-button @click="clearAllData" type="danger">清空所有数据</el-button>
    </div>
    
    <div style="margin-top: 30px;">
      <h3>当前存储的日志数据：</h3>
      <el-table :data="formattedLogs" style="width: 100%" max-height="400">
        <el-table-column prop="month" label="月份" width="120"></el-table-column>
        <el-table-column prop="date" label="日期" width="120"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="count" label="该月记录数" width="120"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { initDemoData } from './demo-data'

export default {
  name: 'TestCalendar',
  computed: {
    calendarLogs() {
      return this.$store.state.calendar.logs
    },
    formattedLogs() {
      const logs = []
      Object.keys(this.calendarLogs).forEach(month => {
        const monthLogs = this.calendarLogs[month]
        monthLogs.forEach(log => {
          logs.push({
            month: month,
            date: log.date,
            content: log.content,
            count: monthLogs.length
          })
        })
      })
      return logs
    }
  },
  methods: {
    initDemoData() {
      initDemoData(this.$store)
      this.$message.success('演示数据初始化成功！')
    },
    clearAllData() {
      this.$store.commit('calendar/CLEAR_ALL_LOGS')
      this.$message.success('所有数据已清空！')
    }
  }
}
</script>

<style scoped>
.test-calendar {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.actions {
  margin: 20px 0;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
</style>