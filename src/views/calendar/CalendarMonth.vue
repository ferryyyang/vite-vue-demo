<template>
  <el-container class="calendar-month">
    <!-- 页面头部 -->
    <el-header class="calendar-header">
      <div class="header-content">
        <el-button 
          icon="el-icon-back" 
          @click="goBack"
          circle
          class="back-btn"
        ></el-button>
        <div class="header-info">
          <h1 class="month-title">{{ monthName }} {{ currentYear }}年</h1>
          <p class="month-stats">共 {{ logsCount }} 条日志记录</p>
        </div>
        <div class="header-actions">
          <el-button 
            type="primary" 
            icon="el-icon-plus"
            @click="showLogDialog(null)"
          >
            添加日志
          </el-button>
        </div>
      </div>
    </el-header>

    <!-- 主要内容区域 -->
    <el-main class="calendar-main">
      <div class="content-wrapper">
        <!-- 左侧图片区域 -->
        <div class="image-section">
          <el-image
            src="https://pic1.arkoo.com/DC110377D9114DE885231756C42EF257/picture/o_1ji71l9n213hi15ck1aoqu5g3tt3g.jpg"
            class="responsive-image"
            fit="cover"
            lazy
          >
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-loading"></i>
              <span>加载中...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
              <span>加载失败</span>
            </div>
          </el-image>
        </div>

        <!-- 右侧日历组件 -->
        <div class="calendar-section">
          <div class="calendar-wrapper">
            <!-- VCalendar 日历组件 -->
            <v-calendar
              v-model="selectedDate"
              :attributes="calendarAttributes"
              @dayclick="onDayClick"
              class="custom-calendar"
              is-expanded
              :locale="{ id: 'zh-CN', masks: { weekdays: 'WWW' } }"
            />
          </div>
        </div>   
      </div>
    </el-main>

    <!-- 日志录入对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <el-form
        :model="logForm"
        :rules="logRules"
        ref="logForm"
        label-width="80px"
      >
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="logForm.date"
            type="date"
            placeholder="选择日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            :disabled="!!editingLog"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item label="日志内容" prop="content">
          <el-input
            type="textarea"
            v-model="logForm.content"
            placeholder="请输入日志内容..."
            :rows="6"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button 
          type="primary" 
          @click="submitLog"
          :loading="submitLoading"
        >
          {{ submitLoading ? '提交中...' : '确 定' }}
        </el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { Calendar } from 'v-calendar'

export default {
  name: 'CalendarMonth',
  components: {
    'v-calendar': Calendar
  },
  data() {
    return {
      selectedDate: null,
      dialogVisible: false,
      submitLoading: false,
      editingLog: null,
      logForm: {
        date: '',
        content: ''
      },
      logRules: {
        date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入日志内容', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 获取月份参数
    month() {
      return parseInt(this.$route.params.month) || 1
    },

    // 当前年份
    currentYear() {
      return new Date().getFullYear()
    },

    // 月份名称
    monthName() {
      const monthNames = [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
      ]
      return monthNames[this.month - 1] || ''
    },

    // 月份键值（用于存储）
    monthKey() {
      return `${this.currentYear}-${String(this.month).padStart(2, '0')}`
    },

    // 当前月份的日志数据
    monthLogs() {
      return this.$store.state.calendar.logs[this.monthKey] || []
    },

    // 日志总数
    logsCount() {
      return this.monthLogs.length
    },

    // 对话框标题
    dialogTitle() {
      return this.editingLog ? '编辑日志' : '添加日志'
    },

    // 日历属性配置
    calendarAttributes() {
      return [
        {
          key: 'logs',
          dates: this.monthLogs.map(log => log.date),
          highlight: {
            backgroundColor: '#409EFF',
            borderColor: '#409EFF'
          },
          dot: true,// 显示小圆点
          // popover: {
          //   label: (date) => {
          //     const log = this.monthLogs.find(l => l.date === this.formatDate(date))
          //     return log ? log.content.substring(0, 30) + (log.content.length > 30 ? '...' : '') : ''
          //   }
          // },
        },
        {
          key: 'today',
          highlight: true,
          dates: new Date()
        }
      ]
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.push('/calendar')
    },

    // 点击日期事件
    onDayClick(day) {
      this.showLogDialog(day.id)
    },

    // 显示日志对话框
    showLogDialog(date) {
      this.selectedDate = date

      // 如果是编辑现有日志
      if (date) {
        const existingLog = this.monthLogs.find(log => log.date === date)
        if (existingLog) {
          this.editingLog = existingLog
          this.logForm = {
            date: existingLog.date,
            content: existingLog.content
          }
        } else {
          this.logForm = {
            date: date,
            content: ''
          }
        }
      } else {
        // 新增日志
        this.logForm = {
          date: '',
          content: ''
        }
      }

      this.dialogVisible = true
    },

    // 关闭对话框
    handleClose() {
      this.$refs.logForm.resetFields()
      this.dialogVisible = false
      this.editingLog = null
      this.submitLoading = false
    },

    // 提交日志
    async submitLog() {
      try {
        await this.$refs.logForm.validate()
        this.submitLoading = true

        const logData = {
          id: this.editingLog ? this.editingLog.id : Date.now(),
          date: this.logForm.date,
          content: this.logForm.content,
          timestamp: new Date().toISOString()
        }

        // 提交到 Vuex store
        await this.$store.dispatch('calendar/saveLog', {
          monthKey: this.monthKey,
          log: logData
        })

        this.$message.success(this.editingLog ? '日志更新成功' : '日志添加成功')
        this.handleClose()

      } catch (error) {
        console.error('提交日志失败:', error)
        this.$message.error('操作失败，请重试')
      } finally {
        this.submitLoading = false
      }
    },

    // 格式化日期
    formatDate(dateObj) {
      const year = dateObj.getFullYear()
      const month = String(dateObj.getMonth() + 1).padStart(2, '0')
      const day = String(dateObj.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  }
}
</script>

<style scoped lang="scss">
.calendar-month {
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
}

.calendar-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .header-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .back-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }

    .header-info {
      flex: 1;
      text-align: center;
      margin: 0 20px;

      .month-title {
        font-size: 24px;
        margin: 0 0 5px 0;
        font-weight: 500;
      }

      .month-stats {
        font-size: 14px;
        opacity: 0.9;
        margin: 0;
      }
    }

    .header-actions {
      min-width: 120px;
      text-align: right;
    }
  }
}

.calendar-main {
  flex: 1;
  padding: 30px;
  background: #f5f7fa;
}

.content-wrapper {
  display: flex;
  gap: 30px;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.calendar-section {
  flex: 1;
  min-width: 0;
}

.calendar-wrapper {
  height: 100%;
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.image-section {
  width: 400px;
  flex-shrink: 0;
}

.responsive-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  
  ::v-deep .el-image__inner {
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 14px;
  
  i {
    font-size: 24px;
    margin-right: 8px;
  }
}

.custom-calendar {
  flex: 1;
  
  ::v-deep .vc-container {
    border: none;
    font-family: inherit;
    height: 100%;
    
    .vc-day-content {
      border-radius: 50%;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: #ecf5ff;
      }
    }
    
    .vc-highlight {
      background-color: #409EFF !important;
      border-color: #409EFF !important;
    }
    
    .vc-text-sm {
      font-size: 0.875rem;
    }
  }
}

.dialog-footer {
  text-align: right;
}

// 响应式设计
@media (max-width: 1200px) {
  .content-wrapper {
    gap: 20px;
  }
  
  .image-section {
    width: 350px;
  }
}

@media (max-width: 992px) {
  .content-wrapper {
    flex-direction: column;
    gap: 20px;
  }
  
  .image-section {
    width: 100%;
    height: 300px;
  }
  
  .calendar-wrapper {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .calendar-header {
    padding: 0 15px;
    
    .header-content {
      .header-info {
        .month-title {
          font-size: 20px;
        }
      }
      
      .header-actions {
        min-width: auto;
      }
    }
  }
  
  .calendar-main {
    padding: 20px;
  }
  
  .content-wrapper {
    gap: 15px;
  }
  
  .calendar-wrapper {
    padding: 15px;
  }
}
</style>