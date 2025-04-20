<template>
  <div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Пригласить нового пользователя</h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Отправьте приглашение тренеру или медицинскому персоналу для регистрации в системе.</p>
      </div>
      <form class="mt-5" @submit.prevent="handleInvite">
        <div v-if="error" class="rounded-md bg-red-50 p-3 mb-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ error }}
              </h3>
            </div>
          </div>
        </div>
        
        <!-- Результат успешного приглашения -->
        <div v-if="inviteResult" class="rounded-md bg-green-50 p-4 mb-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                Приглашение успешно создано!
              </h3>
              <div class="mt-2 text-sm text-green-700">
                <p>Код приглашения: <span class="font-medium">{{ inviteResult.invite_code }}</span></p>
                <p class="mt-1">Ссылка для регистрации:</p>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    readonly
                    class="block w-full pr-10 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    :value="inviteResult.url"
                  />
                  <button 
                    type="button" 
                    @click="copyInviteLink"
                    class="absolute inset-y-0 right-0 px-3 flex items-center"
                  >
                    <span class="h-5 w-5 text-gray-400 hover:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                        <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                      </svg>
                    </span>
                  </button>
                </div>
                <p v-if="copySuccess" class="mt-1 text-xs text-green-600">{{ copySuccess }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="!inviteResult" class="grid grid-cols-1 gap-y-3">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              required
              :disabled="loading"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">Роль</label>
            <select
              id="role"
              name="role"
              v-model="role"
              required
              :disabled="loading"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="" disabled>Выберите роль</option>
              <option value="coach">Тренер</option>
              <option value="medical">Медицинский персонал</option>
            </select>
          </div>
          <div>
            <label for="full_name" class="block text-sm font-medium text-gray-700">ФИО полностью</label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              v-model="fullName"
              required
              :disabled="loading"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Иванов Иван Иванович"
            />
          </div>
          <div>
            <label for="license_number" class="block text-sm font-medium text-gray-700">Номер лицензии</label>
            <input
              type="text"
              name="license_number"
              id="license_number"
              v-model="licenseNumber"
              required
              :disabled="loading"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Л123456789"
            />
          </div>
          <div>
            <label for="organization_id" class="block text-sm font-medium text-gray-700">ID организации</label>
            <input
              type="number"
              name="organization_id"
              id="organization_id"
              v-model.number="organizationId"
              required
              :disabled="loading"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="1"
            />
          </div>
        </div>
        <div class="mt-5">
          <button
            v-if="!inviteResult"
            type="submit"
            :disabled="loading"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span v-if="loading">Отправка приглашения...</span>
            <span v-else>Отправить приглашение</span>
          </button>
          <button
            v-else
            type="button"
            @click="resetForm"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Создать новое приглашение
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ApiClient, AuthApi } from '../../api_athlet_monitoring/src'

const email = ref('')
const role = ref('')
const fullName = ref('')
const licenseNumber = ref('')
const organizationId = ref('')
const loading = ref(false)
const error = ref(null)
const inviteResult = ref(null)
const copySuccess = ref('')

const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'
apiClient.withCredentials = true
apiClient.enableCookies = true

const authApi = new AuthApi(apiClient)

const handleInvite = async () => {
  loading.value = true
  error.value = null
  inviteResult.value = null
  copySuccess.value = ''
  
  try {
    const inviteData = {
      email: email.value,
      role: role.value,
      full_name: fullName.value,
      license_number: licenseNumber.value,
      organization_id: organizationId.value
    }
    
    console.log('Отправляем данные приглашения:', inviteData)
    
    const { data } = await new Promise((resolve, reject) => {
      authApi.authCreateInviteCodePost(inviteData, (error, data, response) => {
        if (error) {
          console.error('API error:', error)
          reject(error)
        } else {
          console.log('API response:', data)
          resolve({ data, response })
        }
      })
    })

    inviteResult.value = data
  } catch (err) {
    console.error('Invite error:', err)
    error.value = err.message || 'Ошибка при отправке приглашения'
  } finally {
    loading.value = false
  }
}

const copyInviteLink = () => {
  if (!inviteResult.value) return
  
  navigator.clipboard.writeText(inviteResult.value.url)
    .then(() => {
      copySuccess.value = 'Ссылка скопирована в буфер обмена!'
      setTimeout(() => {
        copySuccess.value = ''
      }, 3000)
    })
    .catch(err => {
      console.error('Не удалось скопировать ссылку:', err)
    })
}

const resetForm = () => {
  email.value = ''
  role.value = ''
  fullName.value = ''
  licenseNumber.value = ''
  organizationId.value = ''
  inviteResult.value = null
  error.value = null
  copySuccess.value = ''
}
</script> 