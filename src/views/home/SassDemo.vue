<template>
  <div class="sass-demo">
    <el-card class="demo-card">
      <div slot="header" class="card-header">
        <span>Sass 样式演示</span>
      </div>
      
      <div class="demo-content">
        <h2 class="demo-title">Sass 功能展示</h2>
        
        <div class="color-demo">
          <h3>颜色变量使用</h3>
          <div class="color-swatches">
            <div class="color-swatch primary">Primary</div>
            <div class="color-swatch secondary">Secondary</div>
            <div class="color-swatch success">Success</div>
            <div class="color-swatch warning">Warning</div>
            <div class="color-swatch error">Error</div>
          </div>
        </div>
        
        <div class="spacing-demo">
          <h3>间距系统</h3>
          <div class="spacing-examples">
            <div class="box box-small">Small</div>
            <div class="box box-medium">Medium</div>
            <div class="box box-large">Large</div>
          </div>
        </div>
        
        <div class="mixin-demo">
          <h3>Mixin 混合使用</h3>
          <button class="btn btn-primary">主要按钮</button>
          <button class="btn btn-secondary">次要按钮</button>
          <button class="btn btn-success">成功按钮</button>
        </div>
        
        <div class="nesting-demo">
          <h3>Nesting 嵌套</h3>
          <ul class="feature-list">
            <li class="feature-item">
              <i class="el-icon-check"></i>
              <span>支持变量定义</span>
            </li>
            <li class="feature-item">
              <i class="el-icon-check"></i>
              <span>支持嵌套语法</span>
            </li>
            <li class="feature-item">
              <i class="el-icon-check"></i>
              <span>支持Mixin混合</span>
            </li>
            <li class="feature-item">
              <i class="el-icon-check"></i>
              <span>支持函数计算</span>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SassDemo'
}
</script>

<style lang="scss" scoped>

.sass-demo {
  padding: 20px;
}

.demo-card {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
  color: $primary-color;
}

.demo-content {
  h2.demo-title {
    color: $text-primary;
    margin-bottom: 30px;
    text-align: center;
  }
  
  h3 {
    color: $text-secondary;
    margin: 20px 0 15px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid $border-color;
  }
}

// 颜色演示
.color-demo {
  .color-swatches {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    
    .color-swatch {
      width: 100px;
      height: 60px;
      border-radius: $border-radius;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      box-shadow: $box-shadow;
      
      &.primary {
        background-color: $primary-color;
      }
      
      &.secondary {
        background-color: $secondary-color;
      }
      
      &.success {
        background-color: $success-color;
      }
      
      &.warning {
        background-color: $warning-color;
        color: $text-primary;
      }
      
      &.error {
        background-color: $error-color;
      }
    }
  }
}

// 间距演示
.spacing-demo {
  .spacing-examples {
    display: flex;
    gap: 20px;
    align-items: flex-end;
    
    .box {
      background: linear-gradient(135deg, $primary-color, $secondary-color);
      color: white;
      border-radius: $border-radius-lg;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      box-shadow: $box-shadow;
      
      &.box-small {
        width: 80px;
        height: 80px;
        font-size: 12px;
      }
      
      &.box-medium {
        width: 120px;
        height: 120px;
        font-size: 14px;
      }
      
      &.box-large {
        width: 160px;
        height: 160px;
        font-size: 16px;
      }
    }
  }
}

// Mixin 演示
@mixin button-style($bg-color, $hover-color) {
  background-color: $bg-color;
  border: 2px solid $bg-color;
  color: white;
  padding: 10px 20px;
  border-radius: $border-radius;
  cursor: pointer;
  font-weight: bold;
  transition: $transition-base;
  margin-right: 10px;
  margin-bottom: 10px;
  
  &:hover {
    background-color: $hover-color;
    border-color: $hover-color;
    transform: translateY(-2px);
    box-shadow: $box-shadow;
  }
  
  &:active {
    transform: translateY(0);
  }
}

.mixin-demo {
  .btn {
    &.btn-primary {
      @include button-style($primary-color, darken($primary-color, 10%));
    }
    
    &.btn-secondary {
      @include button-style($secondary-color, darken($secondary-color, 10%));
    }
    
    &.btn-success {
      @include button-style($success-color, darken($success-color, 10%));
    }
  }
}

// 嵌套演示
.nesting-demo {
  .feature-list {
    list-style: none;
    padding: 0;
    
    .feature-item {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      margin-bottom: 8px;
      background-color: $bg-secondary;
      border-radius: $border-radius;
      transition: $transition-base;
      
      &:hover {
        background-color: lighten($primary-color, 45%);
        transform: translateX(5px);
        
        i {
          color: $success-color;
          transform: scale(1.2);
        }
      }
      
      i {
        color: $primary-color;
        font-size: 18px;
        margin-right: 10px;
        transition: $transition-base;
      }
      
      span {
        color: $text-primary;
        font-size: 14px;
      }
    }
  }
}

// 响应式设计
@media (max-width: $breakpoint-md) {
  .color-demo .color-swatches {
    justify-content: center;
  }
  
  .spacing-demo .spacing-examples {
    flex-direction: column;
    align-items: center;
  }
  
  .mixin-demo .btn {
    width: 100%;
    margin-right: 0;
  }
}

</style>