<template>
  <div class="calendar-index">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">{{ currentYear }}年 日历概览</h1>
      <p class="page-subtitle">选择月份查看详细日程安排</p>
    </div>

    <!-- 月份网格容器 - 占满剩余空间 -->
    <div class="months-wrapper">
      <div class="months-container">
        <el-row :gutter="20" class="months-grid">
          <!-- 第一行：1-4月 -->
          <el-col v-for="month in months.slice(0, 4)" :key="month.value" :span="6" class="month-col">
            <el-card class="month-card" :class="{ 'is-active': isActiveMonth(month.value) }" shadow="hover"
              @click.native="goToMonthDetail(month.value)">
              <div class="month-content">
                <div class="month-name">{{ month.name }}</div>
                <div class="month-stats">
                  <span class="stat-item">
                    <i class="el-icon-document"></i>
                    {{ getMonthLogsCount(month.value) }} 条记录
                  </span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="months-grid">
          <!-- 第二行：5-8月 -->
          <el-col v-for="month in months.slice(4, 8)" :key="month.value" :span="6" class="month-col">
            <el-card class="month-card" :class="{ 'is-active': isActiveMonth(month.value) }" shadow="hover"
              @click.native="goToMonthDetail(month.value)">
              <div class="month-content">
                <div class="month-name">{{ month.name }}</div>
                <div class="month-stats">
                  <span class="stat-item">
                    <i class="el-icon-document"></i>
                    {{ getMonthLogsCount(month.value) }} 条记录
                  </span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="months-grid">
          <!-- 第三行：9-12月 -->
          <el-col v-for="month in months.slice(8, 12)" :key="month.value" :span="6" class="month-col">
            <el-card class="month-card" :class="{ 'is-active': isActiveMonth(month.value) }" shadow="hover"
              @click.native="goToMonthDetail(month.value)">
              <div class="month-content">
                <div class="month-name">{{ month.name }}</div>
                <div class="month-stats">
                  <span class="stat-item">
                    <i class="el-icon-document"></i>
                    {{ getMonthLogsCount(month.value) }} 条记录
                  </span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarIndex',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      months: [
        { value: 1, name: '一月' },
        { value: 2, name: '二月' },
        { value: 3, name: '三月' },
        { value: 4, name: '四月' },
        { value: 5, name: '五月' },
        { value: 6, name: '六月' },
        { value: 7, name: '七月' },
        { value: 8, name: '八月' },
        { value: 9, name: '九月' },
        { value: 10, name: '十月' },
        { value: 11, name: '十一月' },
        { value: 12, name: '十二月' }
      ]
    }
  },
  computed: {
    calendarLogs() {
      return this.$store.state.calendar.logs || {}
    },

    // 当前年份
    currentYear() {
      return new Date().getFullYear()
    },
  },
  methods: {
    // 跳转到月份详情页
    goToMonthDetail(month) {
      this.$router.push(`/calendar/month/${month}`)
    },

    // 获取月份日志数量
    getMonthLogsCount(month) {
      const monthKey = `${this.currentYear}-${String(month).padStart(2, '0')}`
      return this.calendarLogs[monthKey] ? this.calendarLogs[monthKey].length : 0
    },

    // 判断是否为当前活跃月份
    isActiveMonth(month) {
      const now = new Date()
      return now.getFullYear() === this.currentYear && now.getMonth() + 1 === month
    }
  }
}
</script>

<style scoped lang="scss">
.calendar-index {
  padding: 20px;
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
}

.page-header {
  text-align: center;
  // margin-bottom: 25px;
  flex-shrink: 0;
  margin-top: 50px;

  .page-title {
    font-size: 28px;
    color: #303133;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .page-subtitle {
    font-size: 16px;
    color: #909399;
    margin: 0;
  }
}

.months-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.months-container {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.months-grid {
  margin-bottom: 15px;
  flex-shrink: 0;

  &:last-child {
    margin-bottom: 0;
  }
}

.month-col {
  margin-bottom: 0;
}

.month-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 90px;

  // 强制设置el-card__body的padding为0
  ::v-deep .el-card__body {
    padding: 0 !important;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
  }

  &.is-active {
    border-color: #409EFF;

    .month-content {
      color: #409EFF;
    }
  }
}

.month-content {
  text-align: center;
  padding: 15px 0;

  .month-name {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #303133;
  }

  .month-stats {
    .stat-item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #606266;

      i {
        margin-right: 4px;
        font-size: 14px;
      }
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .months-container {
    max-width: 900px;
  }
}

@media (max-width: 992px) {
  .months-container {
    max-width: 700px;
  }

  .el-col {
    span: 8;
  }
}

@media (max-width: 768px) {
  .months-container {
    max-width: 100%;
    padding: 0 15px;
  }

  .el-col {
    span: 12;
  }

  .calendar-index {
    padding: 15px;
    min-height: calc(100vh - 140px);
  }

  .page-header {
    margin-bottom: 20px;

    .page-title {
      font-size: 24px;
    }
  }

  .month-card {
    height: 75px;
  }

  .month-content {
    padding: 12px 0;

    .month-name {
      font-size: 16px;
      margin-bottom: 6px;
    }
  }
}
</style>

<!-- 全局样式覆盖 -->
<style lang="scss">
// 强制设置全局el-main的padding为0
.el-main {
  padding: 0 !important;
}
</style>