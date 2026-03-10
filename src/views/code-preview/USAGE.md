# CodePreview 组件使用说明（更新版）

## Props 说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `code` | String | `''` | **HTML 代码** |
| `vCode` | String | `''` | **Vue 模板代码** |
| `codeType` | String | `'html'` | 当前显示的类型：`'html'` 或 `'vue'` |
| `showEditor` | Boolean | `true` | 是否显示编辑器 |
| `showHeader` | Boolean | `true` | 是否显示头部工具栏 |

## 核心逻辑

### 代码显示规则

1. **无外部代码时**（`code` 和 `vCode` 都为空）
   - 显示内置的默认示例代码
   - HTML 模式：`defaultHtmlCode`
   - Vue 模式：`defaultVueCode`

2. **有外部代码时**
   - 根据 `codeType` 决定显示哪个代码
   - `codeType === 'html'` → 显示 `code`
   - `codeType === 'vue'` → 显示 `vCode`

### 类型切换

- 切换 `codeType` 时，自动切换到对应的代码
- 编辑器内容会立即更新
- 预览自动刷新

### 编辑同步

- **无外部代码**：编辑时直接更新预览
- **有外部代码**：
  - HTML 模式编辑 → 触发 `update:code` 事件
  - Vue 模式编辑 → 触发 `update:vCode` 事件

## 使用示例

### 1. 基础用法（独立使用）

```vue
<template>
  <CodePreview />
</template>
```

### 2. 只读预览模式

```vue
<template>
  <CodePreview 
    :code="myHtmlCode"
    :v-code="myVueCode"
    code-type="vue"
    :show-editor="false"
    :show-header="false"
  />
</template>

<script>
export default {
  data() {
    return {
      myHtmlCode: '<div>HTML 内容</div>',
      myVueCode: `<template>
  <div>Vue 内容</div>
</template>`
    }
  }
}
</script>
```

### 3. 双向绑定模式

```vue
<template>
  <CodePreview 
    :code.sync="htmlCode"
    :v-code.sync="vueCode"
    :code-type.sync="currentType"
  />
</template>

<script>
export default {
  data() {
    return {
      htmlCode: '<div>HTML</div>',
      vueCode: '<template><div>Vue</div></template>',
      currentType: 'html'
    }
  }
}
</script>
```

### 4. 在 ExamplesIndex 中的应用

```vue
<template>
  <div class="examples-container">
    <el-container>
      <el-aside width="300px">
        <ExampleNavigator @select-example="handleSelectExample" />
      </el-aside>
      <el-main>
        <CodePreview 
          :code="currentExample.code"
          :v-code="currentExample.vueCode"
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
      currentExample: {
        code: '',
        vueCode: ''
      }
    }
  },
  methods: {
    handleSelectExample(example) {
      if (example) {
        this.currentExample = {
          code: example.htmlCode,
          vueCode: example.code
        }
      } else {
        this.currentExample = {
          code: '',
          vueCode: ''
        }
      }
    }
  }
}
</script>
```

## 事件说明

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:code` | `(code: String)` | HTML 代码更新时触发 |
| `update:vCode` | `(vCode: String)` | Vue 代码更新时触发 |
| `update:codeType` | `(type: String)` | 类型切换时触发 |

## 注意事项

1. **code 和 vCode 的关系**
   - `code` 专门用于 HTML 代码
   - `vCode` 专门用于 Vue 模板代码
   - 两者可以同时存在，通过 `codeType` 切换显示

2. **编辑模式**
   - 无外部代码：编辑器显示默认示例，可编辑
   - 有外部代码：编辑器显示传入的代码，编辑后触发对应事件

3. **类型切换**
   - 切换时会自动加载对应类型的代码
   - 预览会立即刷新

4. **取消选择**
   - 在树形菜单中再次点击已选节点可取消选择
   - 取消选择时传入 `null`，组件会恢复默认示例
