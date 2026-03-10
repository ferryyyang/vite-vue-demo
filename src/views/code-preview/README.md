# CodePreview 组件使用说明

## 优化内容

### 1. 支持的 Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `code` | String | `''` | 外部传入的代码，为空时使用默认示例 |
| `codeType` | String | `'html'` | 代码类型：`'html'` 或 `'vue'` |
| `showEditor` | Boolean | `true` | 是否显示编辑器，false 时为只读预览模式 |
| `showHeader` | Boolean | `true` | 是否显示头部工具栏 |

### 2. 核心逻辑

#### 代码显示规则
- **外部代码模式**：当 `code` prop 不为空时，显示传入的代码
- **默认模式**：当 `code` prop 为空时，显示内置的示例代码
- **类型切换**：HTML 和 Vue 模式互不影响，各自保持独立的代码

#### 重置逻辑
- **有外部代码**：重置时触发 `update:code` 事件，将默认代码传回父组件
- **无外部代码**：直接重置为当前类型的默认示例代码

### 3. 使用示例

#### 基础用法（独立使用）
```vue
<template>
  <CodePreview />
</template>

<script>
import CodePreview from '@/views/code-preview/CodePreview.vue'

export default {
  components: { CodePreview }
}
</script>
```

#### 只读预览模式
```vue
<template>
  <CodePreview 
    :code="myCode" 
    code-type="vue"
    :show-editor="false"
    :show-header="false"
  />
</template>

<script>
export default {
  data() {
    return {
      myCode: `<template>
  <div>我的代码</div>
</template>`
    }
  }
}
</script>
```

#### 完整功能模式
```vue
<template>
  <CodePreview 
    :code.sync="myCode"
    :code-type.sync="currentType"
    @update:code="handleCodeUpdate"
    @update:codeType="handleTypeUpdate"
  />
</template>

<script>
export default {
  data() {
    return {
      myCode: '',
      currentType: 'html'
    }
  },
  methods: {
    handleCodeUpdate(newCode) {
      this.myCode = newCode
    },
    handleTypeUpdate(newType) {
      this.currentType = newType
    }
  }
}
</script>
```

### 4. 功能特性

✅ **支持外部传参**：通过 `code` prop 传入自定义代码
✅ **双模式支持**：HTML 和 Vue 模式独立，互不影响
✅ **智能重置**：根据是否有外部代码，智能选择重置目标
✅ **只读模式**：支持隐藏编辑器和工具栏，仅显示预览
✅ **自动刷新**：代码编辑后 500ms 自动刷新预览
✅ **类型同步**：支持 `.sync` 修饰符双向绑定代码类型

### 5. 注意事项

1. **外部代码模式下**，编辑器中的代码变化不会自动同步到父组件，需要手动处理
2. **重置功能**会弹出确认对话框
3. **HTML 和 Vue 模式**的代码是独立的，切换时不会相互覆盖
4. **只读模式**下，建议同时隐藏头部工具栏（`show-header="false"`）

### 6. 在 ExamplesIndex 中的应用

```vue
<template>
  <div class="examples-container">
    <el-container>
      <el-aside width="300px">
        <ExampleNavigator @select-example="handleSelectExample" />
      </el-aside>
      <el-main>
        <!-- 只读预览模式 -->
        <CodePreview 
          :code="currentExampleCode"
          :show-editor="false"
          :show-header="false"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentExampleCode: ''
    }
  },
  methods: {
    handleSelectExample(example) {
      this.currentExampleCode = example.code
    }
  }
}
</script>
```

## 备份文件

原始版本已备份至：`CodePreview.vue.backup`
