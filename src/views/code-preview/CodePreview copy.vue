<template>
  <div class="code-preview-container">
    <el-header class="page-header" v-if="!externalCode">
      <h2>代码实时预览</h2>
      <div class="header-actions">
        <el-radio-group v-model="codeType" size="small" @change="handleCodeTypeChange">
          <el-radio-button label="html">HTML</el-radio-button>
          <el-radio-button label="vue">Vue 组件</el-radio-button>
        </el-radio-group>
        <el-button type="primary" size="small" @click="refreshPreview">
          <i class="el-icon-refresh"></i> 刷新预览
        </el-button>
        <el-button type="success" size="small" @click="loadExample">
          <i class="el-icon-document"></i> 加载示例
        </el-button>
      </div>
    </el-header>

    <el-main class="main-content">
      <el-row :gutter="16" class="editor-row" v-if="!externalCode">
        <!-- 左侧代码编辑器 -->
        <el-col :span="12" class="editor-col">
          <el-card class="editor-card" shadow="hover">
            <div slot="header" class="card-header">
              <span><i class="el-icon-edit"></i> 代码编辑</span>
              <el-tag size="mini" :type="codeType === 'html' ? 'success' : 'primary'">
                {{ codeType.toUpperCase() }}
              </el-tag>
            </div>
            <div class="editor-wrapper">
              <el-input
                type="textarea"
                v-model="internalCode"
                placeholder="请输入代码..."
                :rows="50"
                class="code-editor"
                @input="handleCodeChange"
              ></el-input>
            </div>
          </el-card>
        </el-col>

        <!-- 右侧实时预览 -->
        <el-col :span="12" class="preview-col" :style="{ width: externalCode ? '100%' : '50%' }">
          <el-card class="preview-card" shadow="hover">
            <div slot="header" class="card-header">
              <span><i class="el-icon-view"></i> {{ externalCode ? '示例预览' : '实时预览' }}</span>
              <el-tag size="mini" type="warning" v-if="autoRefresh && !externalCode">自动刷新</el-tag>
            </div>
            <div class="preview-wrapper">
              <div class="preview-frame" ref="previewContainer"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'CodePreview',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      codeType: 'html',
      autoRefresh: true,
      internalCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>HTML 示例</title>
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
    }
    .demo-box {
      padding: 20px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      max-width: 600px;
    }
    .demo-box h3 {
      color: #409EFF;
      margin-bottom: 10px;
    }
    .demo-box p {
      color: #606266;
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <div class="demo-box">
    <h3>Hello World!</h3>
    <p>这是一个 HTML 实时预览示例</p>
    <el-button type="primary">按钮</el-button>
  </div>
  
  <script src="https://unpkg.com/vue@2/dist/vue.js"><\/script>
  <script src="https://unpkg.com/element-ui/lib/index.js"><\/script>
  <script>
    // 注册 Element UI
    Vue.use(ELEMENT);
    
    new Vue({
      el: document.querySelector('.demo-box'),
      data: {
        count: 0
      },
      methods: {
        handleClick() {
          this.count++
          alert('按钮被点击了 ' + this.count + ' 次')
        }
      }
    })
  <\/script>
</body>
</html>`,
      debounceTimer: null
    }
  },
  computed: {
    externalCode() {
      return this.code && this.code.trim() !== ''
    },
    currentCode() {
      return this.externalCode ? this.code : this.internalCode
    }
  },
  mounted() {
    this.refreshPreview()
  },
  watch: {
    code() {
      if (this.externalCode) {
        this.refreshPreview()
      }
    }
  },
  methods: {
    handleCodeTypeChange(type) {
      // 外部代码模式下不响应切换
      if (this.externalCode) return
      
      if (type === 'vue') {
        this.internalCode = `<template>
  <div class="vue-demo">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Vue 组件示例</span>
        <el-tag size="mini" type="success">互动演示</el-tag>
      </div>
      <div class="text item">
        <p>当前计数：{{ count }}</p>
        <el-button type="primary" @click="handleClick">
          <i class="el-icon-plus"></i> 点击 +1
        </el-button>
        <el-button type="danger" @click="resetCount">
          <i class="el-icon-refresh-left"></i> 重置
        </el-button>
      </div>
      <div class="text item" v-if="count > 0">
        <el-alert
          title="太棒了！"
          type="success"
          :closable="false"
          show-icon>
          你已经点击了 {{ count }} 次
        </el-alert>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'VueDemo',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    handleClick() {
      this.count++
      alert('点击了 ' + this.count + ' 次')
    },
    resetCount() {
      this.count = 0
      alert('已重置计数')
    }
  }
}
<\/script>

<style scoped>
.vue-demo {
  padding: 20px;
}
.box-card {
  max-width: 500px;
  margin: 0 auto;
}
.text {
  font-size: 14px;
}
.item {
  padding: 18px 0;
  text-align: center;
}
</style>`
      } else {
        // this.internalCode = ``
      }
      this.refreshPreview()
    },
    handleCodeChange() {
      if (this.autoRefresh) {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer)
        }
        this.debounceTimer = setTimeout(() => {
          this.refreshPreview()
        }, 500)
      }
    },
    refreshPreview() {
      const container = this.$refs.previewContainer
      if (!container) return

      if (this.codeType === 'html') {
        this.renderHTML(this.currentCode, container)
      } else {
        this.renderVue(this.currentCode, container)
      }
    },
    renderHTML(code, container) {
      const iframe = document.createElement('iframe')
      iframe.style.width = '100%'
      iframe.style.height = '600px'
      iframe.style.border = 'none'
      iframe.style.overflow = 'auto'

      container.innerHTML = ''
      container.appendChild(iframe)

      // const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/gi)
      // const styleContent = styleMatch ? styleMatch.map(m => {
      //   const match = m.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
      //   return match ? match[1] : ''
      // }).join('\n') : ''
      
      // const htmlContent = code.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').trim()
      
      const html = code;
      
      const blob = new Blob([html], { type: 'text/html' })
      iframe.src = URL.createObjectURL(blob)
    },
    renderVue(code, container) {
      const iframe = document.createElement('iframe')
      iframe.style.width = '100%'
      iframe.style.height = '600px'
      iframe.style.border = 'none'
      iframe.style.overflow = 'auto'

      container.innerHTML = ''
      container.appendChild(iframe)

      const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/i)
      const scriptMatch = code.match(/<script>([\s\S]*?)<\/script>/i)
      const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/gi)
      
      const template = templateMatch ? templateMatch[1].trim() : '<div>Template not found</div>'
      
      let componentData = {}
      let componentMethods = {}
      
      if (scriptMatch) {
        const scriptContent = scriptMatch[1].trim()
        
        const dataMatch = scriptContent.match(/data\s*\(\s*\)\s*\{[\s\S]*?return\s+({[\s\S]*?})\s*;?\s*\}/)
        if (dataMatch) {
          try {
            componentData = eval('(' + dataMatch[1] + ')')
          } catch (e) {
            console.error('Data parse error:', e)
          }
        }
        
        // 改进 methods 匹配逻辑，处理嵌套花括号
        const methodsStart = scriptContent.indexOf('methods:')
        if (methodsStart !== -1) {
          const methodsStartBrace = scriptContent.indexOf('{', methodsStart)
          if (methodsStartBrace !== -1) {
            let braceCount = 1
            let endIndex = methodsStartBrace + 1
            while (braceCount > 0 && endIndex < scriptContent.length) {
              if (scriptContent[endIndex] === '{') braceCount++
              if (scriptContent[endIndex] === '}') braceCount--
              endIndex++
            }
            const methodsContent = scriptContent.substring(methodsStartBrace + 1, endIndex - 1)
            try {
              componentMethods = eval('({' + methodsContent + '})')
            } catch (e) {
              console.error('Methods parse error:', e)
            }
          }
        }
      }
      
      let styleContent = ''
      if (styleMatch) {
        styleContent = styleMatch.map(m => {
          const match = m.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
          return match ? match[1] : ''
        }).join('\n')
      }
      
      // 将 methods 转换为字符串形式
      let methodsStr = '{}'
      if (Object.keys(componentMethods).length > 0) {
        const methodsParts = []
        for (const key in componentMethods) {
          const methodFunc = componentMethods[key]
          // 将函数转换为字符串并格式化为正确的语法
          const funcBody = methodFunc.toString()
          // 提取函数体（花括号内的内容）
          const bodyStart = funcBody.indexOf('{')
          const bodyEnd = funcBody.lastIndexOf('}')
          if (bodyStart !== -1 && bodyEnd !== -1) {
            const body = funcBody.substring(bodyStart, bodyEnd + 1)
            // 格式化为 function() { ... }
            methodsParts.push(`${key}: function() ${body}`)
          }
        }
        methodsStr = '{' + methodsParts.join(', ') + '}'
      }
      
      console.log('Generated methods string:', methodsStr)
      
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
          <style>
            body { 
              font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            ${styleContent}
          </style>
        </head>
        <body>
          <div id="app"></div>
          <script src="https://unpkg.com/vue@2/dist/vue.js"><\/script>
          <script src="https://unpkg.com/element-ui/lib/index.js"><\/script>
          <script>
            try {
              Vue.use(ELEMENT);
              
              var template = ${JSON.stringify(template)};
              var dataObj = ${JSON.stringify(componentData)};
              
              new Vue({
                el: '#app',
                template: template,
                data: function() {
                  return dataObj;
                },
                methods: ${methodsStr}
              });
            } catch (e) {
              document.getElementById('app').innerHTML = '<div style="color: red; padding: 20px;">错误：' + e.message + '</div>';
              console.error(e);
            }
          <\/script>
        </body>
        </html>
      `
      
      const blob = new Blob([html], { type: 'text/html' })
      iframe.src = URL.createObjectURL(blob)
    },
    loadExample() {
      this.$confirm('加载示例代码将覆盖当前代码，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleCodeTypeChange(this.codeType)
        this.$message.success('示例代码已加载')
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.code-preview-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.page-header {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  color: #303133;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.main-content {
  padding: 20px;
  flex: 1;
  overflow: hidden;
}

.editor-row {
  height: 100%;
}

.editor-col,
.preview-col {
  height: 100%;
  overflow: hidden;
}

.editor-card,
.preview-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header span {
  font-weight: bold;
}

.editor-wrapper,
.preview-wrapper {
  flex: 1;
  overflow: hidden;
}

.code-editor {
  height: 100%;
}

.code-editor >>> textarea {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  background-color: #282c34;
  color: #abb2bf;
  padding: 15px;
}

.preview-frame {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
  overflow: auto;
}
</style>
