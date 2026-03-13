<template>
  <el-container style="height: 100%;">
    <!-- 侧边栏 -->
    <el-aside class="el-aside">
      <div class="logo">
        后台管理系统demo
      </div>
      <Sidebar />
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header class="el-header">
        <Header />
      </el-header>

      <!-- 主内容区 -->
      <el-main class="el-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import Sidebar from './SideBar.vue'
import Header from './Header.vue'
</script>

<style scoped>
.el-header {
  background-color: #fff;
  color: #333;
  height: 60px;
  line-height: 60px;
  text-align: right;
  font-size: 12px;
  border-bottom: 1px solid #e6e6e6;
}

.el-aside {
  color: #333;
  width: 200px;
  background-color: #2e3b4e;
}
.el-main {
  padding: 20px;
  background-color: #f5f5f5;
  height: calc(100% - 60px);
  overflow: auto;
}
.logo {
  color: white;
  text-align: center;
  line-height: 60px;
  font-size: 16px;
}
</style>