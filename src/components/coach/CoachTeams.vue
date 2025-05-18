<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <svg class="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7a4 4 0 11-8 0 4 4 0 018 0zM5 7a4 4 0 108 0 4 4 0 00-8 0z" />
          </svg>
          Мои команды
        </h3>
        <button
          @click="showCreateTeamModal = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          :disabled="loading"
        >
          <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Создать команду
        </button>
      </div>
      <div class="mt-2 text-sm text-gray-600">
        <p>Управление вашими спортивными командами и их составом</p>
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

      <!-- Список команд -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <svg class="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <div v-else-if="teams.length === 0" class="text-center py-8">
        <p class="text-gray-500">У вас пока нет созданных команд</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Название
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Вид спорта
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Кол-во спортсменов
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="team in teams" :key="team.team_id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ team.team_name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ team.sport_type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ team.count_athletes }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="viewTeam(team)"
                  class="text-primary-600 hover:text-primary-900 mr-4 transition-colors duration-200"
                >
                  Просмотр
                </button>
                <button
                  @click="confirmDeleteTeam(team)"
                  class="text-red-600 hover:text-red-900 transition-colors duration-200"
                >
                  Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Модальное окно создания команды (оставляю современным, как было до этого) -->
    <div v-if="showCreateTeamModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showCreateTeamModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200 flex items-center">
            <svg class="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7a4 4 0 11-8 0 4 4 0 018 0zM5 7a4 4 0 108 0 4 4 0 00-8 0z" />
            </svg>
            <span class="text-lg font-medium text-gray-900">Создание новой команды</span>
          </div>
          <div class="bg-white px-6 pt-6 pb-4">
            <div class="space-y-6">
              <div>
                <label for="team-name" class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg class="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
                  </svg>
                  Название команды
                </label>
                <input 
                  type="text" 
                  id="team-name" 
                  v-model="newTeam.name" 
                  class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2.5 px-4 bg-gray-50"
                  placeholder="Введите название команды"
                />
              </div>
              <div>
                <label for="team-sport" class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg class="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" />
                  </svg>
                  Вид спорта
                </label>
                <select 
                  id="team-sport" 
                  v-model="newTeam.sport_type_id"
                  class="mt-1 block w-full py-2.5 px-4 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="" disabled selected>Выберите вид спорта</option>
                  <option :value="1">Легкая атлетика</option>
                  <option :value="2">Лыжные гонки</option>
                  <option :value="3">Велоспорт</option>
                  <option :value="4">Плавание</option>
                  <option :value="5">Триатлон</option>
                </select>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
            <button 
              type="button" 
              @click="showCreateTeamModal = false"
              class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Отмена
            </button>
            <button 
              type="button" 
              @click="createTeam"
              class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Создать
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
                    Вы уверены, что хотите удалить команду "{{ teamToDelete?.team_name }}"? Это действие нельзя будет отменить.
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
    
    <!-- Модальное окно просмотра команды -->
    <div v-if="selectedTeam" class="fixed inset-0 z-20 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="selectedTeam = null"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
          <!-- Шапка -->
          <div class="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div class="flex items-center">
              <svg class="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7a4 4 0 11-8 0 4 4 0 018 0zM5 7a4 4 0 108 0 4 4 0 00-8 0z" />
              </svg>
              <span class="text-lg font-medium text-gray-900">{{ selectedTeam.team_name }}</span>
            </div>
            <button @click="selectedTeam = null" class="text-gray-400 hover:text-gray-600 focus:outline-none">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div v-if="teamModalLoading" class="flex justify-center items-center py-12">
            <svg class="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div v-else class="bg-white px-6 pt-6 pb-4">
            <div class="mb-6">
              <div class="flex items-center mb-2">
                <svg class="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4m4 6h8" />
                </svg>
                <span class="text-gray-700 font-medium">Вид спорта: <span class="font-medium">{{ selectedTeam.sport_type }}</span></span>
              </div>
            </div>
            <!-- Список спортсменов -->
            <div class="mb-8">
              <div class="flex items-center mb-2">
                <svg class="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7a4 4 0 11-8 0 4 4 0 018 0zM5 7a4 4 0 108 0 4 4 0 00-8 0z" />
                </svg>
                <span class="text-gray-700 font-medium">Состав команды</span>
              </div>
              <div v-if="selectedTeam.athletes && selectedTeam.athletes.length" class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ФИО</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата рождения</th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="athlete in selectedTeam.athletes" :key="athlete.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ athlete.full_name }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ athlete.email }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatDate(athlete.birth_date) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button @click="viewAthleteProfile(athlete)" class="text-primary-600 hover:text-primary-900 mr-4 transition-colors duration-200" title="Профиль спортсмена">
                          <svg class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button @click="removeAthlete(athlete)" class="text-red-600 hover:text-red-900 transition-colors duration-200">Удалить</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="text-gray-500 text-sm">В команде пока нет спортсменов</div>
            </div>
            <!-- Управление заявками -->
            <div>
              <div class="flex items-center mb-2">
                <svg class="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4m4 6h8" />
                </svg>
                <span class="text-gray-700 font-medium">Заявки на вступление</span>
              </div>
              <div v-if="selectedTeam.requests && selectedTeam.requests.length" class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ФИО</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="req in selectedTeam.requests" :key="req.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ req.full_name }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ req.email }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button @click="acceptRequest(req)" class="text-green-600 hover:text-green-900 mr-3 transition-colors duration-200">Принять</button>
                        <button @click="declineRequest(req)" class="text-red-600 hover:text-red-900 transition-colors duration-200">Отклонить</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="text-gray-500 text-sm">Нет новых заявок</div>
            </div>
            <!-- Блок тренеров -->
            <div class="mb-8">
              <div class="flex items-center mb-2">
                <svg class="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M15 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span class="text-gray-700 font-medium">Тренеры команды</span>
              </div>
              <div v-if="selectedTeam.coaches && selectedTeam.coaches.length" class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ФИО</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Роль</th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="coach in selectedTeam.coaches" :key="coach.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ coach.full_name }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ coach.email }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ getCoachRole(coach.role) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button v-if="coach.role !== 'first_coach'" @click="removeCoach(coach)" class="text-red-600 hover:text-red-900 transition-colors duration-200">Удалить</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="text-gray-500 text-sm ml-7">Тренеры не назначены</div>
              <div v-if="!selectedTeam.coaches || selectedTeam.coaches.length < 2" class="mt-2 ml-7">
                <button @click="addSecondCoach" class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Добавить второго тренера
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно профиля спортсмена -->
    <div v-if="athleteProfile" class="fixed inset-0 z-30 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="athleteProfile = null"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full">
          <div class="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div class="flex items-center">
              <svg class="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-lg font-medium text-gray-900">Профиль спортсмена</span>
            </div>
            <button @click="athleteProfile = null" class="text-gray-400 hover:text-gray-600 focus:outline-none">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="bg-white px-6 pt-6 pb-4">
            <div class="mb-4">
              <div class="text-gray-700 font-medium mb-1">ФИО:</div>
              <div class="text-gray-900">{{ athleteProfile.full_name }}</div>
            </div>
            <div class="mb-4">
              <div class="text-gray-700 font-medium mb-1">Email:</div>
              <div class="text-gray-900">{{ athleteProfile.email }}</div>
            </div>
            <div class="mb-4">
              <div class="text-gray-700 font-medium mb-1">Дата рождения:</div>
              <div class="text-gray-900">{{ formatDate(athleteProfile.birth_date) }}</div>
            </div>
            <div class="mb-4">
              <div class="text-gray-700 font-medium mb-1">Телефон:</div>
              <div class="text-gray-900">{{ athleteProfile.phone || '—' }}</div>
            </div>
            <div class="mb-4">
              <div class="text-gray-700 font-medium mb-1">Статус:</div>
              <div class="text-gray-900">{{ athleteProfile.status || 'Активен' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ApiClient, TeamsApi, TeamCreateRequest, TeamRequest, AthleteProfileRequest } from '../../api_athlet_monitoring/src'

const router = useRouter()

const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'
apiClient.withCredentials = true
apiClient.enableCookies = true

const teamsApi = new TeamsApi(apiClient)

const teams = ref([])
const loading = ref(false)
const error = ref(null)

// Загрузка списка команд
const loadTeams = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await new Promise((resolve, reject) => {
      teamsApi.teamsGet((error, data, response) => {
        if (error) reject(error)
        else resolve({ data, response })
      })
    })

    console.log(response)
    
    teams.value = response.data.teams || []
  } catch (err) {
    console.error('Ошибка при загрузке команд:', err)
    error.value = err.message || 'Не удалось загрузить список команд'
  } finally {
    loading.value = false
  }
}

// Загружаем команды
loadTeams()

const showCreateTeamModal = ref(false)
const newTeam = ref({
  name: '',
  sport_type_id: ''
})

const showDeleteConfirmation = ref(false)
const teamToDelete = ref(null)

const createTeam = async () => {
  if (!newTeam.value.name || !newTeam.value.sport_type_id) {
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    const teamRequest = new TeamCreateRequest()
    teamRequest.team_name = newTeam.value.name
    teamRequest.sport_type_id = parseInt(newTeam.value.sport_type_id)

    await new Promise((resolve, reject) => {
      teamsApi.teamsCreatePost(teamRequest, (error, data, response) => {
        if (error) reject(error)
        else resolve({ data, response })
      })
    })
    
    // Перезагружаем список команд
    await loadTeams()
    
    // Очищаем форму и закрываем модальное окно
    newTeam.value = { name: '', sport_type_id: '' }
    showCreateTeamModal.value = false
  } catch (err) {
    console.error('Ошибка при создании команды:', err)
    error.value = err.message || 'Не удалось создать команду'
  } finally {
    loading.value = false
  }
}

const selectedTeam = ref(null)
const teamModalLoading = ref(false)

const viewTeam = async (team) => {
  selectedTeam.value = null
  teamModalLoading.value = true
  let requests = [
    { id: 3, full_name: 'Сидоров Сидор', email: 'sidorov@mail.ru' }
  ]
  try {
    const req = new TeamRequest()
    req.team_id = team.team_id
    // Загрузка спортсменов
    const { data: athletesData } = await new Promise((resolve, reject) => {
      teamsApi.teamsAthletesPost(req, (error, data, response) => {
        if (error) reject(error)
        else resolve({ data, response })
      })
    })
    // Загрузка тренеров
    const { data: coachesData } = await new Promise((resolve, reject) => {
      teamsApi.teamsCoachesPost(req, (error, data, response) => {
        if (error) reject(error)
        else resolve({ data, response })
      })
    })
    selectedTeam.value = {
      ...team,
      coaches: (coachesData.coaches || []).map(c => ({
        id: c.coach_id,
        full_name: [c.last_name, c.first_name, c.middle_name].filter(Boolean).join(' '),
        email: c.email,
        phone: c.phone,
        role: c.role_in_team,
        license_number: c.license_number,
        experience_level: c.experience_level,
        sport_type: c.sport_type
      })),
      requests,
      athletes: (athletesData.athletes || []).map(a => ({
        id: a.athlete_id,
        full_name: [a.last_name, a.first_name, a.middle_name].filter(Boolean).join(' '),
        email: a.email,
        birth_date: a.date_of_birth,
        phone: a.phone,
        status: 'Активен'
      }))
    }
  } catch (err) {
    selectedTeam.value = {
      ...team,
      coaches: [],
      requests,
      athletes: []
    }
  } finally {
    teamModalLoading.value = false
  }
}

const removeAthlete = async (athlete) => {
  if (!selectedTeam.value) return
  if (!confirm(`Удалить спортсмена «${athlete.full_name}» из команды?`)) return
  try {
    const req = new AthleteProfileRequest()
    req.athlete_id = athlete.id
    await new Promise((resolve, reject) => {
      teamsApi.teamAthleteRemovePost(req, (error, data, response) => {
        if (error) reject(error)
        else resolve({ data, response })
      })
    })
    // После удаления — обновляю
    await viewTeam(selectedTeam.value)
  } catch (err) {
    alert('Ошибка при удалении спортсмена')
  }
}

const acceptRequest = (req) => {
  // Реализовать принятие заявки через API
  selectedTeam.value.requests = selectedTeam.value.requests.filter(r => r.id !== req.id)
  selectedTeam.value.athletes.push({ id: req.id, full_name: req.full_name, email: req.email })
}

const declineRequest = (req) => {
  // Реализовать отклонение заявки через API
  selectedTeam.value.requests = selectedTeam.value.requests.filter(r => r.id !== req.id)
}

const confirmDeleteTeam = (team) => {
  teamToDelete.value = team
  showDeleteConfirmation.value = true
}

const deleteTeam = async () => {
  if (!teamToDelete.value) return
  
  loading.value = true
  error.value = null
  
  try {
    await new Promise((resolve, reject) => {
      teamsApi.teamsTeamIdDelete(teamToDelete.value.team_id, (error, data, response) => {
        if (error) reject(error)
        else resolve({ data, response })
      })
    })
    
    // Перезагружаем список команд
    await loadTeams()
    
    showDeleteConfirmation.value = false
    teamToDelete.value = null
  } catch (err) {
    console.error('Ошибка при удалении команды:', err)
    error.value = err.message || 'Не удалось удалить команду'
  } finally {
    loading.value = false
  }
}

const athleteProfile = ref(null)

const viewAthleteProfile = (athlete) => {
  // Подгрузить профиль из API, если нужно
  athleteProfile.value = { ...athlete }
}

const addSecondCoach = () => {
  // Реализовать добавление второго тренера через API/модалку выбора
  if (!selectedTeam.value.coaches) selectedTeam.value.coaches = []
  selectedTeam.value.coaches.push({ id: 99, full_name: 'Новый тренер', email: 'newcoach@mail.ru', role: 'assistant' })
}

const removeCoach = (coach) => {
  // Реализовать удаление второго тренера через API
  selectedTeam.value.coaches = selectedTeam.value.coaches.filter(c => c.id !== coach.id)
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  if (isNaN(d)) return dateStr
  return d.toLocaleDateString('ru-RU')
}

function getCoachRole(role) {
  if (role === 'first_coach') return 'Первый тренер'
  if (role === 'second_coach') return 'Второй тренер'
  return role || '—'
}
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style> 