<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <svg class="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7a4 4 0 11-8 0 4 4 0 018 0zM5 7a4 4 0 108 0 4 4 0 00-8 0z" />
          </svg>
          Мои спортсмены
        </h3>
      </div>
      <div class="mt-2 text-sm text-gray-600">
        <p>Управление спортсменами и их профилями</p>
      </div>
    </div>

    <div class="px-4 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex space-x-4">
        <div class="flex items-center">
          <label class="text-sm text-gray-600 mr-2">Поиск:</label>
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Поиск спортсменов"
              class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm bg-white w-64"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <label class="text-sm text-gray-600 mr-2">Команда:</label>
          <select 
            v-model="teamFilter" 
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm bg-white"
          >
            <option value="">Все команды</option>
            <option v-for="team in teams" :key="team.name" :value="team.name">{{ team.name }}</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="px-4 py-5 sm:p-6">
      <div v-if="filteredAthletes.length === 0" class="text-center py-8">
        <p class="text-gray-500">Спортсмены не найдены</p>
      </div>
      
      <div v-else>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ФИО
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Возраст
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Команда
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата присоединения
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="athlete in filteredAthletes" :key="athlete.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span class="font-medium text-gray-600">{{ athlete.first_name[0] }}{{ athlete.last_name[0] }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ athlete.last_name }} {{ athlete.first_name }} {{ athlete.middle_name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ athlete.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ athlete.age }} лет</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ athlete.team_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(athlete.join_date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="viewAthleteProfile(athlete)" class="text-primary-600 hover:text-primary-900 mr-3">
                  Просмотр
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div v-if="selectedAthlete" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                      <p class="text-sm text-gray-900">{{ selectedAthlete.last_name }} {{ selectedAthlete.first_name }} {{ selectedAthlete.middle_name }}</p>
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-500">Email</h4>
                      <p class="text-sm text-gray-900">{{ selectedAthlete.email }}</p>
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-500">Возраст</h4>
                      <p class="text-sm text-gray-900">{{ selectedAthlete.age }} лет</p>
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-500">Дата рождения</h4>
                      <p class="text-sm text-gray-900">{{ formatDate(selectedAthlete.birth_date) }}</p>
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-500">Команда</h4>
                      <p class="text-sm text-gray-900">{{ selectedAthlete.team_name }}</p>
                    </div>
                    <div v-if="selectedAthlete.medical_info">
                      <h4 class="text-sm font-medium text-gray-500">Медицинская информация</h4>
                      <p class="text-sm text-gray-900">{{ selectedAthlete.medical_info }}</p>
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
import { TeamsApi, ApiClient } from '../../api_athlet_monitoring/src'

const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'
apiClient.enableCookies = true

const teamsApi = new TeamsApi(apiClient)

const teams = ref([])
const athletes = ref([])
const searchQuery = ref('')
const teamFilter = ref('')
const selectedAthlete = ref(null)
const loading = ref(false)
const error = ref(null)

const loadTeams = async () => {
  try {
    loading.value = true
    error.value = null

    const { data } = await new Promise((resolve, reject) => {
      teamsApi.teamsGet((error, data, response) => {
        if (error) reject(error)
        else resolve({ data, response })
      })
    })

    if (data && data.teams && Array.isArray(data.teams)) {
      teams.value = data.teams.map(team => ({
        id: team.team_id,
        name: team.team_name
      }))
    }
  } catch (err) {
    console.error('Ошибка при загрузке списка команд:', err)
    error.value = 'Не удалось загрузить список команд'
  } finally {
    loading.value = false
  }
}

const loadAthletes = async () => {
  try {
    loading.value = true
    error.value = null

    const { data } = await new Promise((resolve, reject) => {
      teamsApi.teamsAllAthletesGet((error, data, response) => {
        if (error) reject(error)
        else resolve({ data, response })
      })
    })

    console.log(data)

    if (data && data.athletes && Array.isArray(data.athletes)) {
      athletes.value = data.athletes.map(athlete => ({
        id: athlete.athlete_id,
        first_name: athlete.first_name,
        last_name: athlete.last_name,
        middle_name: athlete.middle_name,
        email: athlete.email,
        age: calculateAge(athlete.date_of_birth),
        birth_date: athlete.date_of_birth,
        team_name: athlete.team_name,
        status: athlete.status || 'active',
        join_date: athlete.team_signed_date
      }))
    }
  } catch (err) {
    console.error('Ошибка при загрузке списка спортсменов:', err)
    error.value = 'Не удалось загрузить список спортсменов'
  } finally {
    loading.value = false
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

onMounted(() => {
  loadTeams()
  loadAthletes()
})

const filteredAthletes = computed(() => {
  return athletes.value.filter(athlete => {
    const matchesSearch = searchQuery.value === '' || 
      athlete.last_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      athlete.first_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      athlete.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesTeam = teamFilter.value === '' || athlete.team_name === teamFilter.value
    
    return matchesSearch && matchesTeam
  })
})

const getTeamName = (teamId) => {
  const team = teams.value.find(t => t.id === teamId)
  return team ? team.name : 'Нет команды'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}

const getStatusText = (status) => {
  switch (status) {
    case 'active': return 'Активен'
    case 'inactive': return 'Неактивен'
    case 'pending': return 'В ожидании'
    default: return status
  }
}

const viewAthleteProfile = (athlete) => {
  selectedAthlete.value = athlete
}
</script> 