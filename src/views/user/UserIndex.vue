<template>
  <div class="user-center">
    <h2>用户中心</h2>
    <div class="user-info">
      <p>欢迎来到用户中心页面！</p>
      <p>这里可以展示用户个人信息、设置选项等功能。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserIndex'
}
</script>

<style scoped>
.user-center {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.user-center h2 {
  color: #42b983;
  margin-bottom: 1.5rem;
  text-align: center;
}

.user-info {
  text-align: center;
}

.user-info p {
  margin: 1rem 0;
  color: #666;
  line-height: 1.6;
}
</style>