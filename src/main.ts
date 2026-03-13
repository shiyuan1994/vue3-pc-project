
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入ui组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' 

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // pinia持久化存储

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(ElementPlus, { locale: zhCn }) // element-plus 中文语言
app.use(router)

app.mount('#app')
