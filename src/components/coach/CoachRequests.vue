<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <svg class="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Заявки на вступление
        </h3>
      </div>
      <div class="mt-2 text-sm text-gray-600">
        <p>Управление заявками спортсменов на вступление в команды</p>
      </div>
    </div>

    <div class="px-4 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex space-x-4">
        <div class="flex items-center">
          <label class="text-sm text-gray-600 mr-2">Статус:</label>
          <select 
            v-model="statusFilter" 
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm bg-white"
          >
            <option value="">Все заявки</option>
            <option value="pending">Ожидающие</option>
            <option value="approved">Принятые</option>
            <option value="rejected">Отклоненные</option>
          </select>
        </div>
        <div class="flex items-center">
          <label class="text-sm text-gray-600 mr-2">Команда:</label>
          <select 
            v-model="teamFilter" 
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm bg-white"
          >
            <option value="">Все команды</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="px-4 py-5 sm:p-6">
      <div v-if="filteredRequests.length === 0" class="text-center py-8">
        <p class="text-gray-500">Заявки не найдены</p>
      </div>
      
      <div v-else>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Спортсмен
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Команда
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата заявки
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="request in filteredRequests" :key="request.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span class="font-medium text-gray-600">{{ request.athlete.first_name[0] }}{{ request.athlete.last_name[0] }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ request.athlete.last_name }} {{ request.athlete.first_name }} {{ request.athlete.middle_name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ request.athlete.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ request.team_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(request.request_date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    request.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800',
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
                  ]"
                >
                  {{ getStatusText(request.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div v-if="request.status === 'pending'" class="flex space-x-2">
                  <button 
                    @click="acceptRequest(request)" 
                    class="text-green-600 hover:text-green-900 px-2 py-1 border border-green-300 rounded-md hover:bg-green-50"
                  >
                    Принять
                  </button>
                  <button 
                    @click="rejectRequest(request)" 
                    class="text-red-600 hover:text-red-900 px-2 py-1 border border-red-300 rounded-md hover:bg-red-50"
                  >
                    Отклонить
                  </button>
                </div>
                <button v-else @click="viewAthleteProfile(request.athlete)" class="text-primary-600 hover:text-primary-900">
                  Просмотр спортсмена
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div v-if="showConfirmationModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showConfirmationModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg v-if="confirmAction === 'approve'" class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ confirmAction === 'approve' ? 'Принять заявку' : 'Отклонить заявку' }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Вы уверены, что хотите {{ confirmAction === 'approve' ? 'принять' : 'отклонить' }} заявку от спортсмена
                    <span class="font-semibold">{{ selectedRequest?.athlete.last_name }} {{ selectedRequest?.athlete.first_name }}</span> 
                    в команду <span class="font-semibold">{{ selectedRequest?.team_name }}</span>?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              @click="confirmRequestAction"
              :class="[
                confirmAction === 'approve' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
                'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
              ]"
            >
              {{ confirmAction === 'approve' ? 'Принять' : 'Отклонить' }}
            </button>
            <button 
              type="button" 
              @click="showConfirmationModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="selectedAthlete" class="fixed inset-0 z-30 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="selectedAthlete = null"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Профиль спортсмена
                </h3>
                <div class="mt-4">
                  <div class="flex justify-center mb-4">
                    <div class="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <span class="text-xl font-medium text-gray-600">{{ selectedAthlete.first_name[0] }}{{ selectedAthlete.last_name[0] }}</span>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-1 gap-y-3">
                    <div>
                      <h4 class="text-sm font-medium text-gray-500">ФИО</h4>
                      <p class="text-sm text-gray-900">{{ selectedAthlete.full_name }}</p>
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-500">Email</h4>
                      <p class="text-sm text-gray-900">{{ selectedAthlete.email }}</p>
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-500">Команда</h4>
                      <p class="text-sm text-gray-900">{{ selectedAthlete.team_name }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              @click="selectedAthlete = null"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ApiClient, TeamsApi } from '../../api_athlet_monitoring/src'

// Создаем экземпляр API клиента
const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'
apiClient.enableCookies = true

const teamsApi = new TeamsApi(apiClient)

const teams = ref([])
const requests = ref([])
const loading = ref(false)
const error = ref(null)

const statusFilter = ref('')
const teamFilter = ref('')
const showConfirmationModal = ref(false)
const selectedRequest = ref(null)
const confirmAction = ref('')
const selectedAthlete = ref(null)

// Загрузка списка команд
const loadTeams = async () => {
  try {
    const { data } = await new Promise((resolve, reject) => {
      teamsApi.teamsGet((error, data, response) => {
        if (error) reject(error)
        else resolve({ data, response })
      })
    })

    if (data && data.teams && Array.isArray(data.teams)) {
      teams.value = data.teams.map(team => ({
        id: team.team_name,
        name: team.team_name
      }))
    }
  } catch (err) {
    console.error('Ошибка при загрузке команд:', err)
    error.value = 'Не удалось загрузить список команд'
  }
}

// Загрузка заявок
const loadRequests = async () => {
  try {
    loading.value = true
    error.value = null

    const { data } = await new Promise((resolve, reject) => {
      teamsApi.teamsJoinsListGet((error, data, response) => {
        if (error) reject(error)
        else resolve({ data, response })
      })
    })

    console.log(data)

    if (data && data.joins && Array.isArray(data.joins)) {
      requests.value = data.joins.map(request => ({
        id: request.request_id,
        athlete: {
          id: request.athlete_id,
          first_name: request.first_name,
          last_name: request.second_name,
          middle_name: request.middle_name,
          email: request.email,
          team_name: request.team_name
        },
        team_id: request.team_id,
        team_name: request.team_name,
        request_date: request.request_date,
        status: request.status
      }))
    }
  } catch (err) {
    console.error('Ошибка при загрузке заявок:', err)
    error.value = 'Не удалось загрузить список заявок'
  } finally {
    loading.value = false
  }
}

const filteredRequests = computed(() => {
  return requests.value.filter(request => {
    const matchesStatus = statusFilter.value === '' || request.status === statusFilter.value
    const matchesTeam = teamFilter.value === '' || request.team_name === teamFilter.value
    
    return matchesStatus && matchesTeam
  })
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}

const getStatusText = (status) => {
  switch (status) {
    case 'pending': return 'Ожидание'
    case 'approved': return 'Принята'
    case 'rejected': return 'Отклонена'
    default: return status
  }
}

const acceptRequest = (request) => {
  selectedRequest.value = request
  confirmAction.value = 'approve'
  showConfirmationModal.value = true
}

const rejectRequest = (request) => {
  selectedRequest.value = request
  confirmAction.value = 'reject'
  showConfirmationModal.value = true
}

const confirmRequestAction = async () => {
  if (!selectedRequest.value) return
  
  try {
    if (confirmAction.value === 'approve') {
      await new Promise((resolve, reject) => {
        teamsApi.teamsJoinRequestIdApprovePost(selectedRequest.value.id, (error, data, response) => {
          if (error) reject(error)
          else resolve({ data, response })
        })
      })
    } else {
      await new Promise((resolve, reject) => {
        teamsApi.teamsJoinRequestIdRejectPost(selectedRequest.value.id, (error, data, response) => {
          if (error) reject(error)
          else resolve({ data, response })
        })
      })
    }
    
    // Обновляем статус заявки в локальном состоянии
    const requestIndex = requests.value.findIndex(r => r.id === selectedRequest.value.id)
    if (requestIndex !== -1) {
      requests.value[requestIndex].status = confirmAction.value === 'approve' ? 'approved' : 'rejected'
    }
    
    showConfirmationModal.value = false
    selectedRequest.value = null
  } catch (err) {
    console.error('Ошибка при обработке заявки:', err)
    error.value = 'Не удалось обработать заявку'
  }
}

const calculateAge = (birthDate) => {
  if (!birthDate) return null
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

const viewAthleteProfile = (athlete) => {
  selectedAthlete.value = {
    ...athlete,
    full_name: `${athlete.last_name} ${athlete.first_name} ${athlete.middle_name}`.trim(),
    team_name: athlete.team_name || 'Нет команды'
  }
}

onMounted(() => {
  loadTeams()
  loadRequests()
})
</script> 