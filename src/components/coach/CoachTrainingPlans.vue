<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">Планы тренировок</h3>
      <button 
        @click="showCreatePlanModal = true" 
        class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Создать план
      </button>
    </div>
    
    <div class="px-4 py-4 bg-gray-50 border-b border-gray-200">
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative flex-grow md:max-w-xs">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Поиск планов"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <select 
          v-model="teamFilter" 
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
        >
          <option value="">Все команды</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
        </select>
        <select 
          v-model="statusFilter" 
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
        >
          <option value="">Все статусы</option>
          <option value="active">Активные</option>
          <option value="completed">Завершённые</option>
          <option value="draft">Черновики</option>
        </select>
      </div>
    </div>
    
    <div class="px-4 py-5 sm:p-6">
      <div v-if="filteredPlans.length === 0" class="text-center py-8">
        <p class="text-gray-500">Планы тренировок не найдены</p>
        <button 
          @click="showCreatePlanModal = true" 
          class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Создать новый план
        </button>
      </div>
      
      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="plan in filteredPlans" 
          :key="plan.id" 
          class="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-lg font-medium text-gray-900">{{ plan.title }}</h4>
              <p class="text-sm text-gray-500 mt-1">{{ getTeamName(plan.team_id) }}</p>
            </div>
            <span 
              :class="[
                plan.status === 'active' ? 'bg-green-100 text-green-800' : 
                plan.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                'bg-gray-100 text-gray-800',
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
              ]"
            >
              {{ getStatusText(plan.status) }}
            </span>
          </div>
          
          <p class="text-sm text-gray-500 mt-3 line-clamp-2">{{ plan.description }}</p>
          
          <div class="mt-3 flex items-center text-sm text-gray-500">
            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            <span>{{ formatDate(plan.start_date) }} - {{ formatDate(plan.end_date) }}</span>
          </div>
          
          <div class="mt-4 flex justify-end">
            <div class="flex space-x-2">
              <button 
                @click="editPlan(plan)" 
                class="inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Ред.
              </button>
              <button 
                @click="viewPlan(plan)" 
                class="inline-flex items-center px-2 py-1 border border-primary-300 text-sm font-medium rounded text-primary-700 bg-primary-50 hover:bg-primary-100"
              >
                <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                Просмотр
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showCreatePlanModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showCreatePlanModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Создание нового плана тренировок
                </h3>
                <div class="mt-4 space-y-4">
                  <div>
                    <label for="plan-title" class="block text-sm font-medium text-gray-700">Название плана</label>
                    <input 
                      type="text" 
                      id="plan-title" 
                      v-model="newPlan.title" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Введите название плана"
                    />
                  </div>
                  <div>
                    <label for="plan-team" class="block text-sm font-medium text-gray-700">Команда</label>
                    <select 
                      id="plan-team" 
                      v-model="newPlan.team_id"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option value="" disabled selected>Выберите команду</option>
                      <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
                    </select>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="plan-start-date" class="block text-sm font-medium text-gray-700">Дата начала</label>
                      <input 
                        type="date" 
                        id="plan-start-date" 
                        v-model="newPlan.start_date" 
                        class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label for="plan-end-date" class="block text-sm font-medium text-gray-700">Дата окончания</label>
                      <input 
                        type="date" 
                        id="plan-end-date" 
                        v-model="newPlan.end_date" 
                        class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label for="plan-description" class="block text-sm font-medium text-gray-700">Описание</label>
                    <textarea 
                      id="plan-description" 
                      v-model="newPlan.description" 
                      rows="3" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Введите описание плана тренировок"
                    ></textarea>
                  </div>
                  <div>
                    <label for="plan-status" class="block text-sm font-medium text-gray-700">Статус</label>
                    <select 
                      id="plan-status" 
                      v-model="newPlan.status"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option value="draft">Черновик</option>
                      <option value="active">Активный</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              @click="createPlan"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Создать
            </button>
            <button 
              type="button" 
              @click="showCreatePlanModal = false"
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
import { useRouter } from 'vue-router'

const router = useRouter()

const teams = ref([
  { id: 1, name: 'Легкоатлетический клуб "Спринт"' },
  { id: 2, name: 'Лыжная команда "Снежинка"' },
  { id: 3, name: 'Велоклуб "Колесо"' }
])

const trainingPlans = ref([
  { 
    id: 1, 
    title: 'Подготовка к весеннему марафону', 
    team_id: 1, 
    description: 'План тренировок для бегунов на длинные дистанции с акцентом на выносливость и аэробную работу.',
    start_date: '2023-07-01',
    end_date: '2023-08-15',
    status: 'active'
  },
  { 
    id: 2, 
    title: 'Скоростно-силовая подготовка спринтеров', 
    team_id: 1, 
    description: 'Комплекс тренировок для развития взрывной силы и скоростных качеств у легкоатлетов.',
    start_date: '2023-08-20',
    end_date: '2023-09-30',
    status: 'draft'
  },
  { 
    id: 3, 
    title: 'Предсезонная подготовка лыжников', 
    team_id: 2, 
    description: 'Интенсивные тренировки в бесснежный период для подготовки к зимнему сезону.',
    start_date: '2023-06-15',
    end_date: '2023-10-15',
    status: 'completed'
  },
  { 
    id: 4, 
    title: 'Подготовка к велогонкам на выносливость', 
    team_id: 3, 
    description: 'План тренировок для шоссейных велогонщиков с акцентом на длительную работу в различных зонах мощности.',
    start_date: '2023-09-01',
    end_date: '2023-11-15',
    status: 'active'
  }
])

const searchQuery = ref('')
const teamFilter = ref('')
const statusFilter = ref('')
const showCreatePlanModal = ref(false)

const newPlan = ref({
  title: '',
  team_id: '',
  description: '',
  start_date: '',
  end_date: '',
  status: 'draft'
})

const filteredPlans = computed(() => {
  return trainingPlans.value.filter(plan => {
    const matchesSearch = searchQuery.value === '' || 
      plan.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesTeam = teamFilter.value === '' || plan.team_id === parseInt(teamFilter.value)
    const matchesStatus = statusFilter.value === '' || plan.status === statusFilter.value
    
    return matchesSearch && matchesTeam && matchesStatus
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
    case 'active': return 'Активный'
    case 'completed': return 'Завершён'
    case 'draft': return 'Черновик'
    default: return status
  }
}

const createPlan = () => {
  if (!newPlan.value.title || !newPlan.value.team_id || !newPlan.value.start_date || !newPlan.value.end_date) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }
  
  const newPlanObj = {
    id: trainingPlans.value.length + 1,
    ...newPlan.value
  }
  
  trainingPlans.value.push(newPlanObj)
  
  newPlan.value = {
    title: '',
    team_id: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'draft'
  }
  showCreatePlanModal.value = false
}

const editPlan = (plan) => {
  console.log('Редактирование плана:', plan)
}

const viewPlan = (plan) => {
  console.log('Просмотр плана:', plan)
}
</script> 