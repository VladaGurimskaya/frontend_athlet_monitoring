<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div>
        <img src="../../assets/logo_main.png" alt="VitalForSport Logo" class="mx-auto h-40 w-auto" />
        <h2 class="mt-1 text-center text-3xl font-extrabold text-gray-900">
          Вход в систему
        </h2>
      </div>
      <form class="mt-6 space-y-6" @submit.prevent="handleLogin">
        <div v-if="error" class="rounded-md bg-red-50 p-4 mb-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ error }}
              </h3>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-700 mb-3 pb-2 border-b">Данные для входа</h3>
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                required
                :disabled="loading"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                required
                :disabled="loading"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Пароль"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span v-if="loading">
              Вход...
            </span>
            <span v-else>
              Войти
            </span>
          </button>
        </div>
      </form>
      <div class="text-center mt-4">
        <router-link
          to="/register"
          class="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
        >
          Нет аккаунта? Зарегистрироваться
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null
  
  try {
    const success = await authStore.login(email.value, password.value)
    
    if (success) {
      try {
        await router.push('/dashboard')
      } catch (routerError) {
        console.error('Ошибка роутера:', routerError)
        window.location.href = '/dashboard'
      }
    } else {
      throw new Error('Ошибка авторизации')
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = err.message || 'Ошибка при входе'
  } finally {
    loading.value = false
  }
}
</script>