<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <svg class="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Планы тренировок
        </h3>
        <button 
          @click="showCreatePlanModal = true" 
          class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Создать план
        </button>
      </div>
      <div class="mt-2 text-sm text-gray-600">
        <p>Управление планами тренировок для команд</p>
      </div>
    </div>
    
    <div class="px-4 py-4 bg-gray-50 border-b border-gray-200">
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center">
          <label class="text-sm text-gray-600 mr-2">Поиск:</label>
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Поиск планов"
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
            <option v-for="team in teams" :key="team.id" :value="team.name">{{ team.name }}</option>
          </select>
        </div>
        <div class="flex items-center">
          <label class="text-sm text-gray-600 mr-2">Статус:</label>
          <select 
            v-model="statusFilter" 
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm bg-white"
          >
            <option value="">Все статусы</option>
            <option value="active">Активные</option>
            <option value="completed">Завершённые</option>
            <option value="draft">Черновики</option>
          </select>
        </div>
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
              <p class="text-sm text-gray-500 mt-1">{{ plan.team_name }}</p>
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
        <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-primary-100">
          <div class="bg-gradient-to-r from-primary-50 to-primary-100 px-6 pt-6 pb-4 border-b border-primary-200">
            <div class="flex items-center gap-3 mb-2">
              <svg class="h-7 w-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 class="text-2xl leading-7 font-bold text-gray-900">Создание нового плана тренировок</h3>
            </div>
            <div class="text-sm text-gray-600">Заполните все обязательные поля для создания плана</div>
          </div>
          <div class="bg-white px-6 pt-6 pb-4">
            <div class="space-y-5">
              <div>
                <label for="plan-title" class="block text-sm font-medium text-gray-700 mb-1">Название плана <span class="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="plan-title" 
                  v-model="newPlan.title" 
                  class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Введите название плана"
                />
              </div>
              <div>
                <label for="plan-team" class="block text-sm font-medium text-gray-700 mb-1">Команда <span class="text-red-500">*</span></label>
                <select 
                  id="plan-team" 
                  v-model="newPlan.team_id"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="" disabled selected>Выберите команду</option>
                  <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
                </select>
              </div>
              <div>
                <label for="plan-period" class="block text-sm font-medium text-gray-700 mb-1">Период подготовки <span class="text-red-500">*</span></label>
                <select
                  id="plan-period"
                  v-model="newPlan.period"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="" disabled selected>Выберите период</option>
                  <option value="1">Предсезонка</option>
                  <option value="2">Соревновательный</option>
                  <option value="3">Восстановительный</option>
                  <option value="4">Сборы</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="plan-start-date" class="block text-sm font-medium text-gray-700 mb-1">Дата начала <span class="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    id="plan-start-date" 
                    v-model="newPlan.start_date" 
                    class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label for="plan-end-date" class="block text-sm font-medium text-gray-700 mb-1">Дата окончания <span class="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    id="plan-end-date" 
                    v-model="newPlan.end_date" 
                    class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label for="plan-description" class="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea 
                  id="plan-description" 
                  v-model="newPlan.description" 
                  rows="3" 
                  class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Введите описание плана тренировок"
                ></textarea>
              </div>
              <div>
                <label for="plan-status" class="block text-sm font-medium text-gray-700 mb-1">Статус</label>
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
            <div class="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
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
                class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showEditPlanModal && planToEdit" class="fixed inset-0 z-20 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeEditPlanModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Редактирование плана: {{ planToEdit.title }}</h3>
            <div class="mb-4">
              <div class="font-medium mb-2">Календарь плана</div>
              <div class="mb-2 grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
                <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
              </div>
              <div class="grid grid-cols-7 gap-1">
                <template v-for="(week, wIdx) in getCalendarMatrix(planToEdit.start_date, planToEdit.end_date)" :key="wIdx">
                  <template v-for="(date, dIdx) in week" :key="dIdx + '-' + wIdx">
                    <div v-if="date" class="flex justify-center">
                      <button
                        class="w-10 h-10 rounded-full focus:outline-none"
                        :class="[
                          'border',
                          'transition',
                          'duration-150',
                          isWorkoutDay(date, planToEdit) ? 'bg-blue-200 border-blue-400 text-blue-900' : 'bg-blue-100 border-blue-200 text-blue-700',
                        ]"
                        @click="openWorkoutModal(date.toISOString().slice(0,10))"
                      >
                        {{ date.getDate() }}
                      </button>
                    </div>
                    <div v-else class="w-10 h-10"></div>
                  </template>
                </template>
              </div>
            </div>
            <div v-if="planToEdit.workouts && planToEdit.workouts.length" class="mt-4">
              <div>
                <div v-for="(workouts, date) in groupedWorkouts" :key="date" class="mb-2">
                  <div class="font-semibold text-sm text-blue-900 mb-1">{{ formatDate(date) }}</div>
                  <ul class="ml-4 list-disc">
                    <li v-for="(w, idx) in workouts" :key="w.time + w.sessionType + w.formatType + w.value + idx">
                      <span v-if="w.time" class="text-gray-700">{{ w.time }}, </span>
                      <span v-if="w.sessionType" class="text-gray-700">{{ w.sessionType }}, </span>
                      <span v-if="w.formatType" class="text-gray-700">{{ w.formatType }}, </span>
                      <span v-if="w.value" class="text-gray-700">{{ w.value }}, </span>
                      <span v-if="w.description" class="text-gray-500 italic">{{ w.description }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button @click="closeEditPlanModal" class="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showWorkoutModal" class="fixed inset-0 z-30 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeWorkoutModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div class="bg-white px-8 pt-8 pb-6 sm:p-10 sm:pb-6">
            <div class="flex items-center mb-6">
              <svg class="h-8 w-8 mr-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 class="text-2xl leading-7 font-bold text-gray-900">Тренировки на {{ formatDate(selectedCalendarDate) }}</h3>
            </div>
            <div v-if="getWorkoutsForDate(selectedCalendarDate).length" class="mb-8">
              <div class="flex flex-col gap-4">
                <div v-for="(w, idx) in getWorkoutsForDate(selectedCalendarDate)" :key="w.time + w.sessionType + w.formatType + w.value + idx" class="flex items-stretch bg-white border border-gray-200 rounded-2xl shadow group hover:shadow-lg transition overflow-hidden">
                  <!-- Цветная полоса -->
                  <div class="w-2 bg-blue-400"></div>
                  <!-- Контент -->
                  <div class="flex-1 flex flex-col justify-between p-4">
                    <div class="flex flex-row items-center justify-between gap-4">
                      <div class="flex flex-col min-w-[120px]">
                        <span class="text-xl font-bold text-blue-900 leading-tight">{{ w.time || '—' }}</span>
                        <span v-if="w.sessionType" class="text-base font-semibold text-blue-700 mt-1">{{ w.sessionType }}</span>
                      </div>
                      <div class="flex flex-row flex-wrap gap-2 items-center">
                        <span v-if="w.formatType" class="bg-blue-100 text-blue-800 rounded px-3 py-1 text-base font-medium">{{ w.formatType }}</span>
                        <span v-if="w.value" class="bg-blue-100 text-blue-800 rounded px-3 py-1 text-base font-medium">{{ w.value }}</span>
                      </div>
                      <div class="flex gap-3 ml-auto">
                        <button @click="editWorkout(idx)" class="text-blue-600 hover:text-blue-800 font-medium transition">Редактировать</button>
                        <button @click="deleteWorkout(idx)" class="text-red-500 hover:text-red-700 font-medium transition">Удалить</button>
                      </div>
                    </div>
                    <div v-if="w.description" class="text-gray-500 italic mt-3">{{ w.description }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="border-t border-gray-200 pt-6 mt-6">
              <div class="font-semibold text-lg mb-4">{{ editingWorkoutIdx !== null ? 'Редактировать тренировку' : 'Добавить тренировку' }}</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Время</label>
                  <input type="time" v-model="newWorkout.time" class="block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Тип тренировки</label>
                  <select v-model="newWorkout.sessionType" class="block w-full border border-gray-300 rounded-md p-2">
                    <option value="" disabled>Выберите тип</option>
                    <option v-for="type in trainingSessionTypes" :key="type" :value="type">{{ type }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Формат тренировки</label>
                  <select v-model="newWorkout.formatType" class="block w-full border border-gray-300 rounded-md p-2">
                    <option value="" disabled>Выберите формат</option>
                    <option v-for="type in trainingFormatTypes" :key="type" :value="type">{{ type }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Значение</label>
                  <input type="text" v-model="newWorkout.value" class="block w-full border border-gray-300 rounded-md p-2" placeholder="Например: 1:30, 10 км, 5 кругов..." />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
                  <textarea v-model="newWorkout.description" rows="2" class="block w-full border border-gray-300 rounded-md p-2"></textarea>
                </div>
              </div>
              <div class="mt-6 flex justify-end gap-3">
                <button @click="saveWorkout" class="px-6 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 font-semibold transition-colors duration-150">Сохранить</button>
                <button @click="closeWorkoutModal" class="px-6 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors duration-150">Отмена</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
// Импортируем API
import ApiClient from '@/api_athlet_monitoring/src/ApiClient'
import TrainingApi from '@/api_athlet_monitoring/src/api/TrainingApi'
import TrainingPlanCreate from '@/api_athlet_monitoring/src/models/TrainingPlanCreate'
import TeamsApi from '@/api_athlet_monitoring/src/api/TeamsApi'

const router = useRouter()

const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'
apiClient.enableCookies = true
const trainingApi = new TrainingApi(apiClient)
const teamsApi = new TeamsApi(apiClient)

const loadingPlans = ref(false)
const errorPlans = ref('')

const teams = ref([])
const loadingTeams = ref(false)
const errorTeams = ref('')

const showCreatePlanModal = ref(false)

async function fetchTeams() {
  loadingTeams.value = true
  errorTeams.value = ''
  await new Promise((resolve) => {
    teamsApi.teamsGet((error, data) => {
      if (error) {
        errorTeams.value = 'Ошибка загрузки команд'
        teams.value = []
      } else if (data && data.teams) {
        teams.value = data.teams.map(team => ({
          id: team.team_id || team.id || team.team_name,
          name: team.team_name || team.name
        }))
      }
      loadingTeams.value = false
      resolve()
    })
  })
}

watch(showCreatePlanModal, (val) => {
  if (val) fetchTeams()
})

const trainingPlans = ref([])

async function fetchTrainingPlans() {
  loadingPlans.value = true
  errorPlans.value = ''
  await new Promise((resolve) => {
    trainingApi.getTrainingPlansPost((error, data) => {
      if (error) {
        errorPlans.value = 'Ошибка загрузки планов'
        trainingPlans.value = []
      } else if (data && data.plans) {
        trainingPlans.value = data.plans.map(plan => ({
          id: plan.plan_id,
          title: plan.title,
          team_id: plan.team_id || plan.teamId || plan.team_id, // на всякий случай
          team_name: plan.team_name,
          description: plan.description,
          start_date: plan.start_date ? (typeof plan.start_date === 'string' ? plan.start_date.slice(0, 10) : new Date(plan.start_date).toISOString().slice(0, 10)) : '',
          end_date: plan.end_date ? (typeof plan.end_date === 'string' ? plan.end_date.slice(0, 10) : new Date(plan.end_date).toISOString().slice(0, 10)) : '',
          status: plan.status
        }))
      }

      console.log(data)
      loadingPlans.value = false
      resolve()
    })
  })
}

onMounted(() => {
  fetchTrainingPlans()
  fetchTeams()
})

const searchQuery = ref('')
const teamFilter = ref('')
const statusFilter = ref('')

const newPlan = ref({
  title: '',
  team_id: '',
  period: '',
  description: '',
  start_date: '',
  end_date: '',
  status: 'draft'
})

const showEditPlanModal = ref(false)
const planToEdit = ref(null)
const selectedCalendarDate = ref(null)
const showWorkoutModal = ref(false)
const newWorkout = ref({
  time: '',
  sessionType: '',
  formatType: '',
  value: '',
  description: ''
})

const editingWorkoutIdx = ref(null)

const trainingSessionTypes = [
  'зарядка', 'кросс', 'велосипед', 'плавание', 'гребля', 'лыжи', 'ходьба', 'силовая', 'отдых', 'контрольный старт', 'сбор', 'растяжка', 'заминка', 'разминка', 'триатлон', 'другое'
]
const trainingFormatTypes = [
  'время', 'дистанция', 'интервалы', 'круги', 'пульс', 'RPE', 'нагрузка', 'нет', 'другое'
]

const filteredPlans = computed(() => {
  return trainingPlans.value.filter(plan => {
    const matchesSearch = searchQuery.value === '' || 
      plan.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (plan.description && plan.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesTeam = teamFilter.value === '' || plan.team_name === teamFilter.value
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

const createPlan = async () => {
  if (!newPlan.value.title || !newPlan.value.team_id || !newPlan.value.start_date || !newPlan.value.end_date || !newPlan.value.period) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }
  const planObj = {
    title: newPlan.value.title,
    team_id: parseInt(newPlan.value.team_id),
    description: newPlan.value.description,
    start_date: newPlan.value.start_date,
    end_date: newPlan.value.end_date,
    status: newPlan.value.status,
    period_type_id: parseInt(newPlan.value.period)
  }
  await new Promise((resolve) => {
    trainingApi.trainingPlansPost(planObj, (error, data) => {
      if (error) {
        alert('Ошибка при создании плана')
      } else {
        showCreatePlanModal.value = false
        fetchTrainingPlans()
      }
      resolve()
    })
  })
  newPlan.value = {
    title: '',
    team_id: '',
    period: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'draft'
  }
}

const editPlan = (plan) => {
  planToEdit.value = plan
  showEditPlanModal.value = true
}

const viewPlan = (plan) => {
  console.log('Просмотр плана:', plan)
}

function getCalendarMatrix(start, end) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const matrix = []
  let week = []
  let dayOfWeek = (startDate.getDay() + 6) % 7
  for (let i = 0; i < dayOfWeek; i++) week.push(null)
  let current = new Date(startDate)
  while (current <= endDate) {
    week.push(new Date(current))
    if (week.length === 7) {
      matrix.push(week)
      week = []
    }
    current.setDate(current.getDate() + 1)
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null)
    matrix.push(week)
  }
  return matrix
}

function isWorkoutDay(date, plan) {
  if (!plan.workouts) return false
  return plan.workouts.some(w => w.date === date.toISOString().slice(0,10))
}

function closeEditPlanModal() {
  showEditPlanModal.value = false
  planToEdit.value = null
}

function editWorkout(idx) {
  const workouts = getWorkoutsForDate(selectedCalendarDate.value)
  const w = workouts[idx]
  newWorkout.value = {
    time: w.time,
    sessionType: w.sessionType,
    formatType: w.formatType,
    value: w.value,
    description: w.description
  }
  editingWorkoutIdx.value = idx
}

function saveWorkout() {
  if (!planToEdit.value.workouts) planToEdit.value.workouts = []
  if (editingWorkoutIdx.value !== null) {
    const date = selectedCalendarDate.value
    let count = -1
    for (let i = 0; i < planToEdit.value.workouts.length; i++) {
      if (planToEdit.value.workouts[i].date === date) {
        count++
        if (count === editingWorkoutIdx.value) {
          planToEdit.value.workouts[i] = {
            date,
            time: newWorkout.value.time,
            sessionType: newWorkout.value.sessionType,
            formatType: newWorkout.value.formatType,
            value: newWorkout.value.value,
            description: newWorkout.value.description
          }
          break
        }
      }
    }
    editingWorkoutIdx.value = null
  } else {
    planToEdit.value.workouts.push({
      date: selectedCalendarDate.value,
      time: newWorkout.value.time,
      sessionType: newWorkout.value.sessionType,
      formatType: newWorkout.value.formatType,
      value: newWorkout.value.value,
      description: newWorkout.value.description
    })
  }
  newWorkout.value = { time: '', sessionType: '', formatType: '', value: '', description: '' }
  closeWorkoutModal()
}

function openWorkoutModal(date) {
  selectedCalendarDate.value = date
  newWorkout.value = { time: '', sessionType: '', formatType: '', value: '', description: '' }
  editingWorkoutIdx.value = null
  showWorkoutModal.value = true
}

function closeWorkoutModal() {
  showWorkoutModal.value = false
  selectedCalendarDate.value = null
  editingWorkoutIdx.value = null
}

function getWorkoutsForDate(date) {
  if (!planToEdit.value || !planToEdit.value.workouts) return []
  return planToEdit.value.workouts.filter(w => w.date === date)
}

function deleteWorkout(idx) {
  if (!planToEdit.value || !planToEdit.value.workouts) return
  const date = selectedCalendarDate.value
  const all = planToEdit.value.workouts
  let count = -1
  for (let i = 0; i < all.length; i++) {
    if (all[i].date === date) {
      count++
      if (count === idx) {
        all.splice(i, 1)
        break
      }
    }
  }
}
</script> 