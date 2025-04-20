<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-xl w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div>
        <img src="../../assets/logo_main.png" alt="VitalForSport Logo" class="mx-auto h-40 w-auto" />
        <h2 class="mt-1 text-center text-2xl font-extrabold text-gray-900">
          Регистрация по приглашению
        </h2>
        <p v-if="inviteDetails" class="mt-2 text-center text-md text-gray-700">
          Вы были приглашены как <span class="font-semibold">{{ roleText }}</span>
        </p>
      </div>

      <div v-if="loading" class="text-center">
        <div class="spinner inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-primary-600"></div>
        <p class="mt-2 text-sm text-gray-600">Загрузка информации о приглашении...</p>
      </div>

      <div v-else-if="error" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              {{ error }}
            </h3>
          </div>
        </div>
      </div>

      <form v-else-if="inviteDetails" class="mt-4" @submit.prevent="handleRegister">
        <div v-if="registerError" class="rounded-md bg-red-50 p-3 mb-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ registerError }}
              </h3>
            </div>
          </div>
        </div>

        <div class="mb-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
          <h3 class="text-md font-medium text-gray-700 mb-2">Информация о приглашении</h3>
          <div class="grid grid-cols-2 gap-y-2">
            <div>
              <h4 class="text-sm font-medium text-gray-500">Email:</h4>
              <p class="text-sm text-gray-800">{{ inviteDetails.email }}</p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-500">Роль:</h4>
              <p class="text-sm text-gray-800">{{ roleText }}</p>
            </div>
            <div v-if="inviteDetails.license_number" class="col-span-2">
              <h4 class="text-sm font-medium text-gray-500">Номер лицензии:</h4>
              <p class="text-sm text-gray-800">{{ inviteDetails.license_number }}</p>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-700 mb-3 pb-2 border-b">Персональные данные</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <label for="last_name" class="block text-sm font-medium text-gray-700">Фамилия</label>
              <input
                  id="last_name"
                  v-model="lastName"
                  type="text"
                  required
                  :disabled="registerLoading"
                  class="input mt-1 w-full"
                  placeholder="Фамилия"
              />
            </div>
            <div>
              <label for="first_name" class="block text-sm font-medium text-gray-700">Имя</label>
              <input
                  id="first_name"
                  v-model="firstName"
                  type="text"
                  required
                  :disabled="registerLoading"
                  class="input mt-1 w-full"
                  placeholder="Имя"
              />
            </div>
            <div class="md:col-span-2">
              <label for="middle_name" class="block text-sm font-medium text-gray-700">Отчество</label>
              <input
                  id="middle_name"
                  v-model="middleName"
                  type="text"
                  required
                  :disabled="registerLoading"
                  class="input mt-1 w-full"
                  placeholder="Отчество"
              />
            </div>
          </div>
        </div>

        <div v-if="inviteDetails && inviteDetails.role === 'coach'" class="mb-6">
          <h3 class="text-lg font-medium text-gray-700 mb-3 pb-2 border-b">Данные тренера</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Телефон</label>
              <input
                  type="tel"
                  v-model="phone"
                  class="input mt-1 w-full"
                  placeholder="+7 (___) ___-__-__"
                  :disabled="registerLoading"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Вид спорта (ID)</label>
              <input
                  type="number"
                  v-model="sportTypeId"
                  class="input mt-1 w-full"
                  placeholder="ID вида спорта"
                  :disabled="registerLoading"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Уровень опыта</label>
              <input
                  type="text"
                  v-model="experienceLevel"
                  class="input mt-1 w-full"
                  placeholder="Начинающий, эксперт и т.д."
                  :disabled="registerLoading"
              />
            </div>
          </div>
        </div>

        <div v-if="inviteDetails && inviteDetails.role === 'medical'" class="mb-6">
          <h3 class="text-lg font-medium text-gray-700 mb-3 pb-2 border-b">Данные медицинского работника</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Специализация</label>
              <input
                  type="text"
                  v-model="specialization"
                  class="input mt-1 w-full"
                  placeholder="Например: физиотерапевт"
                  :disabled="registerLoading"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">ID организации</label>
              <input
                  type="number"
                  v-model="organizationId"
                  class="input mt-1 w-full"
                  placeholder="ID организации"
                  :disabled="registerLoading"
              />
            </div>
          </div>
        </div>

        <!-- Создание пароля -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-700 mb-3 pb-2 border-b">Создание пароля</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
              <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  :disabled="registerLoading"
                  class="input mt-1 w-full"
                  placeholder="Пароль"
              />
            </div>
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">Подтверждение пароля</label>
              <input
                  id="confirm-password"
                  v-model="confirmPassword"
                  type="password"
                  required
                  :disabled="registerLoading"
                  class="input mt-1 w-full"
                  placeholder="Подтверждение пароля"
              />
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button
              type="submit"
              :disabled="registerLoading"
              class="w-full py-3 px-4 rounded-md bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors duration-200"
          >
            <span v-if="registerLoading">Регистрация...</span>
            <span v-else>Завершить регистрацию</span>
          </button>
        </div>
      </form>

      <div class="text-center mt-4">
        <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
          Уже зарегистрированы? Войти
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ApiClient, AuthApi } from '../../api_athlet_monitoring/src'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const inviteCode = route.params.code

// Персональные данные
const firstName = ref('')
const lastName = ref('')
const middleName = ref('')
const password = ref('')
const confirmPassword = ref('')

// Дополнительные поля по ролям
const phone = ref('')                 // для coach
const sportTypeId = ref(null)        // для coach
const experienceLevel = ref('')      // для coach
const specialization = ref('')       // для medical
const organizationId = ref(null)     // для medical

// Состояния загрузки и ошибок
const inviteDetails = ref(null)
const loading = ref(true)
const registerLoading = ref(false)
const error = ref(null)
const registerError = ref(null)

// Настройка API клиента
const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'
apiClient.withCredentials = true
apiClient.enableCookies = true
const authApi = new AuthApi(apiClient)

const roleText = computed(() => {
  if (!inviteDetails.value) return ''
  switch (inviteDetails.value.role) {
    case 'coach': return 'Тренер'
    case 'medical': return 'Медицинский работник'
    default: return inviteDetails.value.role
  }
})

onMounted(async () => {
  try {
    const { data } = await new Promise((resolve, reject) => {
      const inviteDetailsRequest = { invite_code: inviteCode }
      authApi.authGetInviteDetailsPost(inviteDetailsRequest, (error, data, response) => {
        if (error) {
          reject(error)
        } else {
          resolve({ data, response })
        }
      })
    })

    inviteDetails.value = data

    if (data.full_name) {
      const nameParts = data.full_name.split(' ')
      if (nameParts.length >= 1) lastName.value = nameParts[0]
      if (nameParts.length >= 2) firstName.value = nameParts[1]
      if (nameParts.length >= 3) middleName.value = nameParts[2]
    }
  } catch (err) {
    console.error('Error loading invite details:', err)
    error.value = 'Не удалось загрузить информацию о приглашении. Возможно, код приглашения недействителен или срок его действия истек.'
  } finally {
    loading.value = false
  }
})

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    registerError.value = 'Пароли не совпадают'
    return
  }

  registerLoading.value = true
  registerError.value = null

  try {
    if (!inviteDetails.value) throw new Error('Детали приглашения не загружены')

    const registerData = {
      invite_code: inviteCode,
      email: inviteDetails.value.email,
      password: password.value,
      role: inviteDetails.value.role,
      first_name: firstName.value,
      last_name: lastName.value,
      middle_name: middleName.value,
      license_number: inviteDetails.value.license_number,
      organization_id: inviteDetails.value.organization_id
    }

    if (inviteDetails.value.role === 'coach') {
      registerData.phone = phone.value
      registerData.sport_type_id = sportTypeId.value
      registerData.experience_level = experienceLevel.value
    }
    if (inviteDetails.value.role === 'medical') {
      registerData.specialization = specialization.value
      registerData.organization_id = organizationId.value
    }

    const { data, response } = await new Promise((resolve, reject) => {
      authApi.authRegisterInvitePost(registerData, (error, data, response) => {
        if (error) {
          reject(error)
        } else {
          resolve({ data, response })
        }
      })
    })

    if (response.status === 201 || response.status === 200) {
      alert('Регистрация прошла успешно! Теперь вы можете войти в систему.')
      router.push('/login')
    }
  } catch (err) {
    console.error('Register error:', err)
    registerError.value = err.message || 'Ошибка при регистрации'
  } finally {
    registerLoading.value = false
  }
}
</script> 