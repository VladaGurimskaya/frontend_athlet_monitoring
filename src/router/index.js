import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/auth/LoginForm.vue'
import RegisterForm from '../components/auth/RegisterForm.vue'
import InviteRegisterForm from '../components/auth/InviteRegisterForm.vue'
import Dashboard from '../views/Dashboard.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm,
    meta: { requiresGuest: true }
  },
  {
    path: '/register-with-invite/:code',
    name: 'InviteRegister',
    component: InviteRegisterForm,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    try {
      await authStore.checkAuth()
      
      if (!authStore.isAuthenticated) {
        next('/login')
        return
      }
    } catch (error) {
      next('/login')
      return
    }
  }
  
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }
  
  next()
})

export default router 