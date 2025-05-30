import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginPage from '../features/auth/pages/LoginPage.vue'
import PortalPage from '../features/hiring/pages/PortalPage.vue'
import { checkAuth } from '../features/auth/utils/checkAuth'

const routes: Array<RouteRecordRaw> = [
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/portal', name: 'portal', component: PortalPage },
  { path: '/', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const valid = await checkAuth()
  console.log('Auth check result:', valid)

  if (authRequired && !valid) {
    return next('/login')  // block unauthorized access
  }

  next()
})

export default router
