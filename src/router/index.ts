import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/Index.vue'
import { useUserInfoStore } from '@/stores/user'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: { title: '工作台' },
      },
      {
        path: '/progressProject',
        component: () => import('@/views/progressProject.vue'),
        meta: { title: '项目管理' },
      },
      {
        path: '/form',
        component: () => import('@/views/addForm.vue'),
        meta: { title: '新建表单' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 简单路由守卫
router.beforeEach((to, from, next) => {
  const store = useUserInfoStore()
  // console.log('store.token', store.token)
  // console.log(to, from)
  if (to.path !== '/login' && !store.token) {
    // 不是跳登录页，没有登录用户token
    next('/login')
  } else {
    next()
  }
})

export default router
