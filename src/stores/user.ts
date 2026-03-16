import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

// import type  { PersistedStateOptions } from 'pinia-plugin-persistedstate'
// // 定义持久化类型
// type UserInfoStorePersist = PersistedStateOptions<ReturnType<typeof useUserInfoStore>>

// export const useUserInfoStore = defineStore('userInfo', {
//   state: () => ({
//     userName: '', // 用户名
//     token: '', // 登录用户token
//     password: '' // 密码
//   }),
//   actions: {
//     // 登录
//     login() {
      
//     }
//   } 
// })

export const useUserInfoStore = defineStore('userInfo', () => {
  const userName = ref('') // 用户名
  const token = ref('') // 用户token
  const password = ref('') // 密码
  const buttonPermissCodes = reactive(['project-table-edit', 'project-table-view']) // 设置默认的权限码（这里的数据从接口获取）
  const router = useRouter() // 路由
  // 登录
  const login = (loginInfo: any) => {
    return new Promise<void>((resolve, reject) => {
      console.log('进来了', loginInfo)
      // const { userName, password } = loginInfo
      // 储存用户信息
      if (loginInfo.userName && loginInfo.password) {
        userName.value = loginInfo.userName
        password.value = loginInfo.password
        token.value = 'user-info-' + Math.random() // token随机生成保存
        sessionStorage.setItem('userToken', token.value)
  
        console.log('router', router)
        // 登录成功后跳转到系统内
        router.push({path: 'dashboard'})
        resolve()
      } else {
        reject('缺失用户信息')
      }
    })
  }

  // 退出登录
  const loginOut = () => {
    userName.value = ''
    password.value = ''
    token.value = ''
    sessionStorage.removeItem('userToken')
  }
  return {
    userName,
    token,
    password,
    buttonPermissCodes,
    login,
    loginOut
  }
}, {
  // state状态持久化存储 ---todo ts类型会报错，因不熟悉ts暂时不处理
  // persist: {
  //   key: 'userInfo', // 要存储的store模块key
  //   storage: 'localStorage', // 存储方式
  //   paths: ['userName', 'token'] // 要存储的字段
  // },
  // state状态持久化存储
  persist: true
})
