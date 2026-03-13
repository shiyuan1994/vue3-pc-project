<template>
  <div style="text-align: center; padding-top: 100px;">
    <h1 style="font-size: 80px; color: #e54d42; margin-bottom: 20px;">404</h1>
    <p style="font-size: 20px; color: #666;">页面不存在</p>
    <el-button type="primary" @click="goBack" style="margin-top: 20px;">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/dashboard')
}
</script>