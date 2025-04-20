<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">Мои команды</h3>
      <button 
        @click="showCreateTeamModal = true" 
        class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Создать команду
      </button>
    </div>
    
    <div class="px-4 py-5 sm:p-6">
      <div v-if="teams.length === 0" class="text-center py-8">
        <p class="text-gray-500">У вас пока нет созданных команд</p>
        <button 
          @click="showCreateTeamModal = true" 
          class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Создать первую команду
        </button>
      </div>
      
      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="team in teams" 
          :key="team.id" 
          class="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex justify-between">
            <h4 class="text-lg font-medium text-gray-900">{{ team.name }}</h4>
            <div class="dropdown relative">
              <button class="text-gray-500 hover:text-gray-700">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              <div class="dropdown-menu hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                <a href="#" @click.prevent="viewTeam(team)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Просмотр</a>
                <a href="#" @click.prevent="editTeam(team)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Редактировать</a>
                <a href="#" @click.prevent="confirmDeleteTeam(team)" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Удалить</a>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-1">Вид спорта: {{ team.sport_type }}</p>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            <span>{{ team.athletes_count }} спортсменов</span>
          </div>
          <div class="mt-4 flex justify-end space-x-3">
            <button 
              @click="viewTeam(team)" 
              class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Просмотр
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showCreateTeamModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showCreateTeamModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Создание новой команды
                </h3>
                <div class="mt-4 space-y-4">
                  <div>
                    <label for="team-name" class="block text-sm font-medium text-gray-700">Название команды</label>
                    <input 
                      type="text" 
                      id="team-name" 
                      v-model="newTeam.name" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Введите название команды"
                    />
                  </div>
                  <div>
                    <label for="team-sport" class="block text-sm font-medium text-gray-700">Вид спорта</label>
                    <select 
                      id="team-sport" 
                      v-model="newTeam.sport_type_id"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option value="" disabled selected>Выберите вид спорта</option>
                      <option :value="1">Легкая атлетика</option>
                      <option :value="2">Лыжные гонки</option>
                      <option :value="3">Велоспорт</option>
                      <option :value="4">Плавание</option>
                      <option :value="5">Триатлон</option>
                    </select>
                  </div>
                  <div>
                    <label for="team-description" class="block text-sm font-medium text-gray-700">Описание</label>
                    <textarea 
                      id="team-description" 
                      v-model="newTeam.description" 
                      rows="3" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Введите описание команды"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              @click="createTeam"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Создать
            </button>
            <button 
              type="button" 
              @click="showCreateTeamModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showDeleteConfirmation" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showDeleteConfirmation = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Удаление команды
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Вы уверены, что хотите удалить команду "{{ teamToDelete?.name }}"? Это действие нельзя будет отменить.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              @click="deleteTeam"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Удалить
            </button>
            <button 
              type="button" 
              @click="showDeleteConfirmation = false"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const teams = ref([
  { 
    id: 1, 
    name: 'Легкоатлетический клуб "Спринт"', 
    sport_type: 'Легкая атлетика', 
    sport_type_id: 1, 
    description: 'Легкоатлетический клуб для спортсменов различных дисциплин',
    athletes_count: 22 
  },
  { 
    id: 2, 
    name: 'Лыжная команда "Снежинка"', 
    sport_type: 'Лыжные гонки', 
    sport_type_id: 2, 
    description: 'Сборная команда по лыжным гонкам',
    athletes_count: 15 
  },
  { 
    id: 3, 
    name: 'Велоклуб "Колесо"', 
    sport_type: 'Велоспорт', 
    sport_type_id: 3, 
    description: 'Клуб шоссейного и трекового велоспорта',
    athletes_count: 18 
  }
])

const showCreateTeamModal = ref(false)
const newTeam = ref({
  name: '',
  sport_type_id: '',
  description: ''
})

const showDeleteConfirmation = ref(false)
const teamToDelete = ref(null)

const createTeam = () => {
  if (newTeam.value.name && newTeam.value.sport_type_id) {
    const sportTypes = {
      1: 'Легкая атлетика',
      2: 'Лыжные гонки',
      3: 'Велоспорт',
      4: 'Плавание',
      5: 'Триатлон'
    }
    
    const newTeamObj = {
      id: teams.value.length + 1,
      name: newTeam.value.name,
      sport_type: sportTypes[newTeam.value.sport_type_id],
      sport_type_id: newTeam.value.sport_type_id,
      description: newTeam.value.description,
      athletes_count: 0
    }
    
    teams.value.push(newTeamObj)
    
    newTeam.value = { name: '', sport_type_id: '', description: '' }
    showCreateTeamModal.value = false
  }
}

const viewTeam = (team) => {
  console.log('Просмотр команды:', team)
}

const editTeam = (team) => {
  console.log('Редактирование команды:', team)
}

const confirmDeleteTeam = (team) => {
  teamToDelete.value = team
  showDeleteConfirmation.value = true
}

const deleteTeam = () => {
  if (teamToDelete.value) {
    teams.value = teams.value.filter(t => t.id !== teamToDelete.value.id)
    showDeleteConfirmation.value = false
    teamToDelete.value = null
  }
}
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style> 