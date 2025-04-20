<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
    <div class="max-w-xl w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div>
        <img src="../../assets/logo_main.png" alt="VitalForSport Logo" class="mx-auto h-40 w-auto" />
        <h2 class="mt-1 text-center text-2xl font-extrabold text-gray-900">
          Регистрация спортсмена
        </h2>
      </div>
      <form class="mt-4" @submit.prevent="handleRegister">
        <div v-if="error" class="rounded-md bg-red-50 p-3 mb-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ error }}
              </h3>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-700 mb-3 pb-2 border-b">Личные данные</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <label for="last_name" class="block text-sm font-medium text-gray-700">Фамилия</label>
              <input
                id="last_name"
                v-model="lastName"
                name="last_name"
                type="text"
                required
                :disabled="loading"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Фамилия"
              />
            </div>
            <div>
              <label for="first_name" class="block text-sm font-medium text-gray-700">Имя</label>
              <input
                id="first_name"
                v-model="firstName"
                name="first_name"
                type="text"
                required
                :disabled="loading"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Имя"
              />
            </div>
            <div>
              <label for="middle_name" class="block text-sm font-medium text-gray-700">Отчество</label>
              <input
                id="middle_name"
                v-model="middleName"
                name="middle_name"
                type="text"
                required
                :disabled="loading"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Отчество"
              />
            </div>
            <div>
              <label for="date_of_birth" class="block text-sm font-medium text-gray-700">Дата рождения</label>
              <input
                id="date_of_birth"
                v-model="dateOfBirth"
                name="date_of_birth"
                type="date"
                required
                :disabled="loading"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label for="gender" class="block text-sm font-medium text-gray-700">Пол</label>
              <select
                id="gender"
                v-model="gender"
                name="gender"
                required
                :disabled="loading"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              >
                <option value="" disabled>Выберите пол</option>
                <option value="M">Мужской</option>
                <option value="F">Женский</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-700 mb-3 pb-2 border-b">Данные для входа</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div class="md:col-span-2">
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
                autocomplete="new-password"
                required
                :disabled="loading"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Пароль"
              />
            </div>
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">Подтверждение пароля</label>
              <input
                id="confirm-password"
                v-model="confirmPassword"
                name="confirm-password"
                type="password"
                required
                :disabled="loading"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Подтверждение пароля"
              />
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span v-if="loading">
              Регистрация...
            </span>
            <span v-else>
              Зарегистрироваться
            </span>
          </button>
        </div>
      </form>
      <div class="text-center mt-4">
        <router-link
          to="/login"
          class="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
        >
          Уже есть аккаунт? Войти
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthApi, ApiClient } from '../../api_athlet_monitoring/src'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const middleName = ref('')
const gender = ref('')
const dateOfBirth = ref('')
const loading = ref(false)
const error = ref(null)

const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'

const authApi = new AuthApi(apiClient)

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Пароли не совпадают'
    return
  }

  loading.value = true
  error.value = null
  
  try {
    const registerData = {
      email: email.value,
      password: password.value,
      first_name: firstName.value,
      last_name: lastName.value,
      middle_name: middleName.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value
    }
    
    console.log('Отправляем данные для регистрации атлета:', registerData)
    
    const { data, response } = await new Promise((resolve, reject) => {
      authApi.authRegisterAthletePost(registerData, (error, data, response) => {
        if (error) {
          console.error('API error:', error)
          reject(error)
        } else {
          console.log('API response status:', response.status)
          resolve({ data, response })
        }
      })
    })

    if (response.status === 201 || response.status === 200) {
      alert('Регистрация прошла успешно! Теперь вы можете войти в систему.')
      router.push('/login')
    }
  } catch (err) {
    console.error('Registration error:', err)
    error.value = err.message || 'Ошибка при регистрации'
  } finally {
    loading.value = false
  }
}
</script> 