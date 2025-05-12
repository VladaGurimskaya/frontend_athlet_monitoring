<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
      <h3 class="text-lg font-medium text-gray-900 flex items-center">
        <svg class="h-6 w-6 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Пригласить нового пользователя
      </h3>
      <div class="mt-2 text-sm text-gray-600">
        <p>Отправьте приглашение тренеру или медицинскому персоналу для регистрации в системе.</p>
      </div>
    </div>
    
    <div class="px-4 py-5 sm:p-6">
      <form @submit.prevent="handleInvite" class="space-y-8">
        <div v-if="error" class="rounded-md bg-red-50 p-4 border border-red-200">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ error }}
              </h3>
            </div>
          </div>
        </div>
        
        <!-- Результат успешного приглашения -->
        <div v-if="inviteResult" class="rounded-md bg-green-50 p-4 border border-green-200">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
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
                    class="block w-full pr-10 py-2.5 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md bg-white"
                    :value="inviteResult.url"
                  />
                  <button 
                    type="button" 
                    @click="copyInviteLink"
                    class="absolute inset-y-0 right-0 px-3 flex items-center hover:text-primary-600 transition-colors duration-200"
                  >
                    <span class="h-5 w-5 text-gray-400 hover:text-primary-600">
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
        
        <div v-if="!inviteResult" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              required
              :disabled="loading"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
              placeholder="Например: coach@example.com"
            />
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="role" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Роль
            </label>
            <select
              id="role"
              name="role"
              v-model="role"
              required
              :disabled="loading"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
            >
              <option value="" disabled>Выберите роль пользователя</option>
              <option value="coach">Тренер</option>
              <option value="medical">Медицинский персонал</option>
            </select>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="full_name" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              ФИО полностью
            </label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              v-model="fullName"
              required
              :disabled="loading"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
              placeholder="Например: Иванов Иван Иванович"
            />
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="license_number" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Номер лицензии
            </label>
            <input
              type="text"
              name="license_number"
              id="license_number"
              v-model="licenseNumber"
              required
              :disabled="loading"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
              placeholder="Например: Л123456789"
            />
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="organization_id" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              ID организации
            </label>
            <input
              type="number"
              name="organization_id"
              id="organization_id"
              v-model.number="organizationId"
              required
              :disabled="loading"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
              placeholder="Например: 1"
            />
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-gray-200">
          <button
            v-if="!inviteResult"
            type="submit"
            :disabled="loading"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ loading ? 'Отправка приглашения...' : 'Отправить приглашение' }}
          </button>
          <button
            v-else
            type="button"
            @click="resetForm"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Создать новое приглашение
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Список приглашений -->
  <div class="mt-6">
    <InviteList />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ApiClient, AuthApi } from '../../api_athlet_monitoring/src'
import InviteList from './InviteList.vue'

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