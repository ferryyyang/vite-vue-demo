<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="welcome-card">
          <div slot="header" class="clearfix">
            <span>欢迎使用地图演示系统</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="welcome-content">
            <h2>基于 Vite + Vue2 + Element UI + Leaflet 构建</h2>
            <p>这是一个现代化的前端项目模板，集成了常用的技术栈和组件库。</p>
            
            <el-row :gutter="20" class="feature-cards">
              <el-col :span="6">
                <el-card shadow="hover">
                  <div class="feature-card">
                    <i class="el-icon-map-location feature-icon"></i>
                    <h3>地图功能</h3>
                    <p>基于Leaflet的地图展示与交互功能</p>
                    <el-button type="primary" @click="$router.push('/map')">查看详情</el-button>
                  </div>
                </el-card>
              </el-col>
              
              <el-col :span="6">
                <el-card shadow="hover">
                  <div class="feature-card">
                    <i class="el-icon-user feature-icon"></i>
                    <h3>用户中心</h3>
                    <p>用户个人信息管理和设置功能</p>
                    <el-button type="success" @click="$router.push('/user')">进入中心</el-button>
                  </div>
                </el-card>
              </el-col>
              
              <el-col :span="6">
                <el-card shadow="hover">
                  <div class="feature-card">
                    <i class="el-icon-brush feature-icon"></i>
                    <h3>Sass演示</h3>
                    <p>CSS预处理器Sass功能展示</p>
                    <el-button type="warning" @click="$router.push('/sass')">查看演示</el-button>
                  </div>
                </el-card>
              </el-col>
              
              <el-col :span="6">
                <el-card shadow="hover">
                  <div class="feature-card">
                    <i class="el-icon-setting feature-icon"></i>
                    <h3>系统设置</h3>
                    <p>项目配置和个性化设置选项</p>
                    <el-button type="info">系统设置</el-button>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据展示区域 -->
    <el-row :gutter="20" class="data-section">
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>统计数据</span>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>快捷操作</span>
          </div>
          <div class="quick-actions">
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增项目</el-button>
            <el-button type="success" icon="el-icon-edit" @click="handleEdit">编辑项目</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleDelete">删除项目</el-button>
            <el-button type="warning" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </div>
          
          <div class="progress-section">
            <h4>项目进度</h4>
            <el-progress :percentage="70"></el-progress>
            <el-progress :percentage="100" status="success"></el-progress>
            <el-progress :percentage="50" status="exception"></el-progress>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 通知和消息 -->
    <el-row :gutter="20" class="notification-section">
      <el-col :span="24">
        <el-card>
          <div slot="header">
            <span>系统通知</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="showNotification">显示通知</el-button>
          </div>
          <el-alert
            title="系统消息"
            type="success"
            description="项目初始化完成，您可以开始使用各项功能了。"
            show-icon>
          </el-alert>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data() {
    return {
      tableData: [{
        date: '2024-01-01',
        name: '地图项目A',
        address: '北京市朝阳区'
      }, {
        date: '2024-01-02',
        name: '用户系统B',
        address: '上海市浦东新区'
      }, {
        date: '2024-01-03',
        name: '数据分析C',
        address: '深圳市南山区'
      }]
    }
  },
  methods: {
    handleAdd() {
      this.$message.success('新增项目功能待开发');
    },
    handleEdit() {
      this.$message.warning('编辑项目功能待开发');
    },
    handleDelete() {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功!');
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    handleSearch() {
      this.$message.info('搜索功能待开发');
    },
    showNotification() {
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      });
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.welcome-card {
  margin-bottom: 20px;
}

.welcome-content h2 {
  color: #409EFF;
  margin-bottom: 10px;
}

.feature-cards {
  margin-top: 30px;
}

.feature-card {
  text-align: center;
  padding: 20px;
}

.feature-icon {
  font-size: 48px;
  color: #409EFF;
  margin-bottom: 15px;
}

.feature-card h3 {
  margin: 15px 0;
  color: #303133;
}

.quick-actions {
  margin-bottom: 30px;
}

.quick-actions .el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.progress-section h4 {
  margin-bottom: 15px;
  color: #606266;
}

.progress-section .el-progress {
  margin-bottom: 15px;
}

.data-section, .notification-section {
  margin-top: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>