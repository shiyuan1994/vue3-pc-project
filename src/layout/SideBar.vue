<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#2e3b4e"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/dashboard">
      <el-icon><House /></el-icon>
      <template #title>工作台</template>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><DataBoard /></el-icon>
        <span>我的项目</span>
      </template>
      <el-menu-item index="/progressProject">项目管理</el-menu-item>
      <!-- <el-menu-item index="/progressProject">招标计划</el-menu-item> -->
    </el-sub-menu>

    <el-menu-item index="/form">
      <el-icon><EditPen /></el-icon>
      <template #title>新建表单</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { House, DataBoard, EditPen } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-menu-vertical-demo {
  border-right: none;
  height: calc(100% - 60px);
}
</style>