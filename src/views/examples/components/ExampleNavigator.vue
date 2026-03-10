<template>
  <div class="example-navigator">
    <el-card class="navigator-card" shadow="never">
      <div slot="header" class="card-header">
        <i class="el-icon-connection"></i>
        <span>功能示例</span>
      </div>
      
      <el-tree
        :data="examples"
        :props="defaultProps"
        :expand-on-click-node="false"
        default-expand-all
        node-key="id"
        class="example-tree"
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span class="tree-label">
            <i v-if="data.icon" :class="data.icon" class="tree-icon"></i>
            {{ node.label }}
          </span>
        </span>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { examplesData } from '../data/examples-data'

export default {
  name: 'ExampleNavigator',
  data() {
    return {
      examples: examplesData,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      selectedNodeId: null
    }
  },
  methods: {
    handleNodeClick(data) {
      // 只有当节点有 htmlCode 属性时才触发（即叶子节点）
      if (data && data.htmlCode) {
        // 如果点击的是已选中的节点，取消选择
        if (this.selectedNodeId === data.id) {
          this.selectedNodeId = null
          this.$emit('select-example', null)
        } else {
          this.selectedNodeId = data.id
          this.$emit('select-example', data)
        }
      }
    }
  }
}
</script>

<style scoped>
.example-navigator {
  height: 100%;
  overflow: hidden;
}

.navigator-card {
  height: 100%;
  border: none;
  box-shadow: none;
}

.card-header {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
}

.card-header i {
  margin-right: 8px;
  color: #409EFF;
}

.example-tree {
  .el-tree-node__content {
    height: 40px;
    border-radius: 4px;
    margin-bottom: 4px;
    
    &:hover {
      background-color: #f5f7fa;
    }
  }
  
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  
  .tree-label {
    display: flex;
    align-items: center;
  }
  
  .tree-icon {
    margin-right: 8px;
    color: #909399;
  }
  
  .el-tree-node.is-leaf > .el-tree-node__content {
    padding-left: 20px;
  }
}
</style>
