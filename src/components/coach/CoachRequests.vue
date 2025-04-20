<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">Заявки на вступление</h3>
      <div class="flex space-x-2">
        <select 
          v-model="statusFilter" 
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
        >
          <option value="">Все заявки</option>
          <option value="pending">Ожидающие</option>
          <option value="accepted">Принятые</option>
          <option value="rejected">Отклоненные</option>
        </select>
        <select 
          v-model="teamFilter" 
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
        >
          <option value="">Все команды</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
        </select>
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
                <div class="text-sm text-gray-900">{{ getTeamName(request.team_id) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(request.request_date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    request.status === 'accepted' ? 'bg-green-100 text-green-800' : 
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
                <svg v-if="confirmAction === 'accept'" class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ confirmAction === 'accept' ? 'Принять заявку' : 'Отклонить заявку' }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Вы уверены, что хотите {{ confirmAction === 'accept' ? 'принять' : 'отклонить' }} заявку от спортсмена 
                    <span class="font-semibold">{{ selectedRequest?.athlete.last_name }} {{ selectedRequest?.athlete.first_name }}</span> 
                    в команду <span class="font-semibold">{{ getTeamName(selectedRequest?.team_id) }}</span>?
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
                confirmAction === 'accept' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
                'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
              ]"
            >
              {{ confirmAction === 'accept' ? 'Принять' : 'Отклонить' }}
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
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const teams = ref([
  { id: 1, name: 'Легкоатлетический клуб "Спринт"' },
  { id: 2, name: 'Лыжная команда "Снежинка"' },
  { id: 3, name: 'Велоклуб "Колесо"' }
])

const athletes = [
  { 
    id: 1, 
    first_name: 'Иван', 
    last_name: 'Иванов', 
    middle_name: 'Иванович', 
    email: 'ivanov@example.com', 
    age: 18 
  },
  { 
    id: 2, 
    first_name: 'Петр', 
    last_name: 'Петров', 
    middle_name: 'Петрович', 
    email: 'petrov@example.com', 
    age: 17 
  },
  { 
    id: 3, 
    first_name: 'Анна', 
    last_name: 'Смирнова', 
    middle_name: 'Сергеевна', 
    email: 'smirnova@example.com', 
    age: 16 
  },
  { 
    id: 4, 
    first_name: 'Сергей', 
    last_name: 'Кузнецов', 
    middle_name: 'Андреевич', 
    email: 'kuznetsov@example.com', 
    age: 19 
  },
  { 
    id: 5, 
    first_name: 'Мария', 
    last_name: 'Козлова', 
    middle_name: 'Дмитриевна', 
    email: 'kozlova@example.com', 
    age: 17 
  }
]

const requests = ref([
  { 
    id: 1, 
    athlete: athletes[0], 
    team_id: 1, 
    request_date: '2023-06-15', 
    status: 'pending' 
  },
  { 
    id: 2, 
    athlete: athletes[1], 
    team_id: 1, 
    request_date: '2023-06-18', 
    status: 'accepted' 
  },
  { 
    id: 3, 
    athlete: athletes[2], 
    team_id: 3, 
    request_date: '2023-06-20', 
    status: 'pending' 
  },
  { 
    id: 4, 
    athlete: athletes[3], 
    team_id: 2, 
    request_date: '2023-06-10', 
    status: 'rejected' 
  },
  { 
    id: 5, 
    athlete: athletes[4], 
    team_id: 3, 
    request_date: '2023-06-22', 
    status: 'pending' 
  }
])

const statusFilter = ref('')
const teamFilter = ref('')
const showConfirmationModal = ref(false)
const selectedRequest = ref(null)
const confirmAction = ref('')

const filteredRequests = computed(() => {
  return requests.value.filter(request => {
    const matchesStatus = statusFilter.value === '' || request.status === statusFilter.value
    const matchesTeam = teamFilter.value === '' || request.team_id === parseInt(teamFilter.value)
    
    return matchesStatus && matchesTeam
  })
})

const getTeamName = (teamId) => {
  const team = teams.value.find(t => t.id === teamId)
  return team ? team.name : 'Неизвестная команда'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}

const getStatusText = (status) => {
  switch (status) {
    case 'pending': return 'Ожидание'
    case 'accepted': return 'Принята'
    case 'rejected': return 'Отклонена'
    default: return status
  }
}

const acceptRequest = (request) => {
  selectedRequest.value = request
  confirmAction.value = 'accept'
  showConfirmationModal.value = true
}

const rejectRequest = (request) => {
  selectedRequest.value = request
  confirmAction.value = 'reject'
  showConfirmationModal.value = true
}

const confirmRequestAction = () => {
  if (selectedRequest.value) {
    const index = requests.value.findIndex(r => r.id === selectedRequest.value.id)
    if (index !== -1) {
      requests.value[index].status = confirmAction.value === 'accept' ? 'accepted' : 'rejected'
    }
    
    showConfirmationModal.value = false
    selectedRequest.value = null
  }
}

const viewAthleteProfile = (athlete) => {
  console.log('Просмотр профиля спортсмена:', athlete)
}
</script> 