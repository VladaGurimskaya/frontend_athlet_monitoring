<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
      <h3 class="text-lg font-medium text-gray-900 flex items-center">
        <svg class="h-6 w-6 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Список приглашений
      </h3>
      <div class="mt-2 text-sm text-gray-600">
        <p>Просмотр и управление приглашениями для регистрации в системе.</p>
      </div>
    </div>

    <div class="px-4 py-5 sm:p-6">
      <!-- Сообщения об ошибках -->
      <div v-if="error" class="rounded-md bg-red-50 p-4 border border-red-200 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
          </div>
        </div>
      </div>

      <!-- Сообщение об успехе -->
      <div v-if="successMessage" class="rounded-md bg-green-50 p-4 border border-green-200 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">{{ successMessage }}</h3>
          </div>
        </div>
      </div>

      <!-- Список приглашений -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <svg class="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <div v-else-if="invites.length === 0" class="text-center py-8">
        <p class="text-gray-500">Нет активных приглашений</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Роль
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Номер лицензии
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID организации
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Код приглашения
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="invite in invites" :key="invite.invite_code">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ invite.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getRoleName(invite.role) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ invite.license_number }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ invite.organization_id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                {{ invite.invite_code }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    invite.is_used
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ invite.is_used ? 'Использовано' : 'Активно' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  v-if="!invite.is_used"
                  @click="cancelInvite(invite)"
                  :disabled="loading"
                  class="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Отменить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ApiClient, AuthApi, InviteCancelRequest } from '../../api_athlet_monitoring/src'

const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'
apiClient.enableCookies = true

const authApi = new AuthApi(apiClient)

const loading = ref(false)
const error = ref(null)
const invites = ref([])
const successMessage = ref(null)

const getRoleName = (role) => {
  const roles = {
    coach: 'Тренер',
    medical: 'Медицинский персонал'
  }
  return roles[role] || role
}

const loadInvites = async () => {
  loading.value = true
  error.value = null

  try {
    const { data } = await new Promise((resolve, reject) => {
      authApi.authGetAllInvitesGet((error, data, response) => {
        if (error) {
          reject(error)
        } else {
          resolve({ data, response })
        }
      })
    })

    console.log(data)
    invites.value = data.invites || []
  } catch (err) {
    console.error('Ошибка при загрузке приглашений:', err)
    error.value = err.message || 'Не удалось загрузить список приглашений'
  } finally {
    loading.value = false
  }
}

const cancelInvite = async (invite) => {
  if (!confirm('Вы уверены, что хотите отменить это приглашение?')) {
    return
  }

  loading.value = true
  error.value = null
  successMessage.value = null

  try {
    const request = new InviteCancelRequest()
    request.invite_id = invite.invite_id

    await new Promise((resolve, reject) => {
      authApi.authCancelInvitePost(request, (error, data, response) => {
        if (error) {
          reject(error)
        } else {
          resolve({ data, response })
        }
      })
    })

    successMessage.value = 'Приглашение успешно отменено'
    setTimeout(() => {
      successMessage.value = null
    }, 3000)

    await loadInvites() // Перезагружаем список после отмены
  } catch (err) {
    console.error('Ошибка при отмене приглашения:', err)
    error.value = err.message || 'Не удалось отменить приглашение'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadInvites()
})
</script> 