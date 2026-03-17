<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 style="text-align: center; margin-bottom: 20px;">后台管理系统demo</h2>
      <el-form :model="loginForm" :rules="loginRules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="loginForm.userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLoginThrottle" style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useUserInfoStore } from '@/stores/user'
import { useThrottle } from '@/utils/useThrottleHook';
// 登录信息
let loginForm = ref({
  userName: '张三',
  password: 123456
})

const formRef = ref(null)
// 校验规则
const loginRules = reactive({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})


const userInfoStore = useUserInfoStore()
console.log(userInfoStore, 'store')
// 提交登录
const submitLogin = () => {
  console.log('节流1秒一次')
  formRef.value.validate(async (valid) => {
    if(valid) {
      const res = await userInfoStore.login(loginForm.value)
      console.log('res', res)
      ElMessage({
        type: 'success',
        message: '登录成功'
      })
    }
  })
}
const submitLoginThrottle = useThrottle(submitLogin, 1000)
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 400px;
  padding: 20px;
}
</style>