<!--
 * @Description: 
 * @Author: wangzhaorui
 * @Date: 2026-03-09 13:33:20
 * @LastEditors: wangzhaorui
 * @LastEditTime: 2026-03-09 21:00:23
-->
<template>
  <div class="examples-container">
    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="300px" class="examples-aside">
        <ExampleNavigator @select-example="handleSelectExample" />
      </el-aside>

      <!-- 右侧预览 -->
      <el-main class="examples-main">
        <CodePreview :code="currentExampleCode" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ExampleNavigator from './components/ExampleNavigator.vue'
import CodePreview from '../code-preview/CodePreview.vue'

export default {
  name: 'ExamplesIndex',
  components: {
    ExampleNavigator,
    CodePreview
  },
  data() {
    return {
      currentExampleCode: ''
    }
  },
  methods: {
    handleSelectExample(example) {
      console.log('Selected example:', example)
      if (!example) {
        this.currentExampleCode = '';
        return
      }
      this.currentExampleCode = example.htmlCode
    }
  }
}
</script>

<style scoped>
.examples-container {
  height: 100%;
  overflow: hidden;
}

.el-container {
  height: 100%;
}

.examples-aside {
  background-color: #fff;
  border-right: 1px solid #e6e6e6;
  overflow: hidden;
}

.examples-main {
  padding: 0;
  overflow: hidden;
}
</style>
