<template>
  <div class="code-preview-container">
    <el-header class="page-header" v-if="showHeader">
      <h2>代码实时预览</h2>
      <div class="header-actions">
        <el-radio-group v-model="codeType" size="small" @change="handleCodeTypeChange">
          <el-radio-button label="html">HTML</el-radio-button>
          <el-radio-button label="vue">Vue 组件</el-radio-button>
        </el-radio-group>
        <el-button type="primary" size="small" @click="refreshPreview">
          <i class="el-icon-refresh"></i> 刷新预览
        </el-button>
        <el-button type="success" size="small" @click="handleReset">
          <i class="el-icon-refresh-left"></i> 重置
        </el-button>
      </div>
    </el-header>

    <el-main class="main-content">
      <el-row :gutter="16" class="editor-row" v-if="showEditor">
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
        <el-col :span="12" class="preview-col">
          <el-card class="preview-card" shadow="hover">
            <div slot="header" class="card-header">
              <span><i class="el-icon-view"></i> 实时预览</span>
              <el-tag size="mini" type="warning" v-if="autoRefresh">自动刷新</el-tag>
            </div>
            <div class="preview-wrapper">
              <div class="preview-frame" ref="previewContainer"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <!-- 只读模式：全屏预览 -->
      <div v-if="!showEditor && hasExternalCode" class="readonly-preview">
        <div class="preview-frame" ref="previewContainer"></div>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'CodePreview',
  props: {
    // HTML 代码
    code: {
      type: String,
      default: ''
    },
    // Vue 模板代码
    vCode: {
      type: String,
      default: ''
    },
    // 代码类型：'html' 或 'vue'
    codeType: {
      type: String,
      default: 'html',
      validator: (value) => ['html', 'vue'].includes(value)
    },
    // 是否显示编辑器（false 时为只读预览模式）
    showEditor: {
      type: Boolean,
      default: true
    },
    // 是否显示头部工具栏
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      internalCodeType: 'html',
      internalCode: '',
      autoRefresh: true,
      // HTML 默认示例代码
      defaultHtmlCode: `<!DOCTYPE html>
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
      // Vue 默认示例代码
      defaultVueCode: `<template>
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
</style>`,
      debounceTimer: null
    }
  },
  computed: {
    // 是否有外部代码传入
    hasExternalCode() {
      return (this.code && this.code.trim() !== '') || (this.vCode && this.vCode.trim() !== '')
    },
    // 当前使用的代码类型
    currentCodeType() {
      return this.hasExternalCode ? this.codeType : this.internalCodeType
    },
    // 当前显示的代码
    currentCode() {
      if (this.hasExternalCode) {
        return this.codeType === 'html' ? this.code : this.vCode
      }
      return this.internalCodeType === 'html' ? this.defaultHtmlCode : this.defaultVueCode
    }
  },
  watch: {
    codeType(newVal) {
      this.internalCodeType = newVal
      // 切换类型时，如果没有外部代码，更新 internalCode
      if (!this.hasExternalCode) {
        this.internalCode = newVal === 'html' ? this.defaultHtmlCode : this.defaultVueCode
      } else {
        // 有外部代码时，切换到对应的代码
        this.internalCode = newVal === 'html' ? this.code : this.vCode
      }
    },
    code() {
      if (this.hasExternalCode && this.codeType === 'html') {
        this.internalCode = this.code
        this.refreshPreview()
      }
    },
    vCode() {
      if (this.hasExternalCode && this.codeType === 'vue') {
        this.internalCode = this.vCode
        this.refreshPreview()
      }
    },
    currentCodeType() {
      this.refreshPreview()
    },
    // 根据是否有外部代码来初始化 internalCode
    hasExternalCode: {
      immediate: true,
      /**
       * @param {boolean} hasExternal
       */
      handler(hasExternal) {
        if (!hasExternal) {
          this.internalCode = this.internalCodeType === 'html' ? this.defaultHtmlCode : this.defaultVueCode
        } else {
          // 根据当前类型选择对应的代码
          this.internalCode = this.codeType === 'html' ? this.code : this.vCode
        }
      }
    },
    // 监听 internalCode 变化并同步到外部
    /**
     * @param {string} newVal
     */
    internalCode(newVal) {
      if (!this.hasExternalCode) {
        // 没有外部代码时，更新预览
        this.refreshPreview()
      } else {
        // 有外部代码时，根据当前类型触发对应的事件
        if (this.codeType === 'html') {
          this.$emit('update:code', newVal)
        } else {
          this.$emit('update:vCode', newVal)
        }

        this.refreshPreview()
      }
    }
  },
  mounted() {
    this.internalCodeType = this.codeType
    this.refreshPreview()
  },
  methods: {
    // 切换代码类型
    handleCodeTypeChange(type) {
      this.internalCodeType = type
      this.$emit('update:codeType', type)
      this.refreshPreview()
    },
    // 代码变化处理
    handleCodeChange() {
      // 已经在 watch 中处理，这里可以添加其他逻辑
    },
    // 刷新预览
    refreshPreview() {
      const container = this.$refs.previewContainer
      if (!container) return

      // 使用 internalCode 进行渲染
      const codeToRender = this.internalCode

      if (this.currentCodeType === 'html') {
        this.renderHTML(codeToRender, container)
      } else {
        this.renderVue(codeToRender, container)
      }
    },
    // 渲染 HTML
    renderHTML(code, container) {
      const iframe = document.createElement('iframe')
      iframe.style.width = '100%'
      iframe.style.height = '98%'
      iframe.style.border = 'none'
      iframe.style.overflow = 'auto'

      container.innerHTML = ''
      container.appendChild(iframe)

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
      iframeDoc.open()
      iframeDoc.write(code)
      iframeDoc.close()
    },
    // 渲染 Vue 组件
    renderVue(code, container) {
      const iframe = document.createElement('iframe')
      iframe.style.width = '100%'
      iframe.style.height = '98%'
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
      
      let methodsStr = '{}'
      if (Object.keys(componentMethods).length > 0) {
        const methodsParts = []
        for (const key in componentMethods) {
          const methodFunc = componentMethods[key]
          const funcBody = methodFunc.toString()
          const bodyStart = funcBody.indexOf('{')
          const bodyEnd = funcBody.lastIndexOf('}')
          if (bodyStart !== -1 && bodyEnd !== -1) {
            const body = funcBody.substring(bodyStart, bodyEnd + 1)
            methodsParts.push(`${key}: function() ${body}`)
          }
        }
        methodsStr = '{' + methodsParts.join(', ') + '}'
      }
      
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
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
      iframeDoc.open()
      iframeDoc.write(html)
      iframeDoc.close()
    },
    // 重置代码
    handleReset() {
      const codeType = this.hasExternalCode ? this.codeType : this.internalCodeType
      const defaultCode = codeType === 'html' ? this.defaultHtmlCode : this.defaultVueCode
      
      this.$confirm('重置代码将恢复为默认示例，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.hasExternalCode) {
          this.$emit('update:code', defaultCode)
        }
        this.refreshPreview()
        this.$message.success('代码已重置')
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
  flex-shrink: 0;
  height: 60px;
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
  display: flex;
  flex-direction: column;
}

.editor-row {
  height: 100%;
  flex: 1;
  margin: 0;
}

.editor-col,
.preview-col {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.readonly-preview {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.editor-card,
.preview-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
}

.editor-card >>> .el-card__header,
.preview-card >>> .el-card__header {
  padding: 15px 20px;
  border-bottom: 1px solid #e6e6e6;
  flex-shrink: 0;
}

.editor-card >>> .el-card__body,
.preview-card >>> .el-card__body {
  padding: 0;
  flex: 1;
  overflow: hidden;
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.editor-wrapper,
.preview-wrapper {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
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
  border: none;
  resize: none;
  height: 100% !important;
}

.preview-frame {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: none;
  border-radius: 0;
  overflow: auto;
}
</style>
