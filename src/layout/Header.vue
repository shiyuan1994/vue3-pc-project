<template>
  <div class="header-item">
    <span style="margin-right: 20px;">欢迎： {{ userInfoStore.userName }}</span>
    <el-button type="text" @click="loginOut">退出登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { useUserInfoStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userInfoStore = useUserInfoStore()
// 退出登录
const loginOut = () => {
  userInfoStore.loginOut()
  ElMessage.success('退出成功')
  router.push('/login')
}
</script>
<style scoped>
.header-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}
</style>