<template>
  <div class="space-y-6">
    <!-- Блок профиля -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <!-- Заголовок профиля -->
      <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <svg class="h-6 w-6 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Мой профиль
        </h3>
      </div>

      <div class="px-4 py-5 sm:p-6">
        <!-- Информация о профиле -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 class="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Личная информация
            </h4>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-500">ФИО</label>
                <p class="mt-1 text-sm text-gray-900">{{ userProfile.full_name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Email</label>
                <p class="mt-1 text-sm text-gray-900">{{ userProfile.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Дата рождения</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(userProfile.birth_date) }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 class="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Информация о команде
            </h4>
            <div class="space-y-3">
              <div v-if="userProfile.team">
                <label class="block text-sm font-medium text-gray-500">Название команды</label>
                <p class="mt-1 text-sm text-gray-900">{{ userProfile.team.team_name }}</p>
              </div>
              <div v-if="userProfile.team">
                <label class="block text-sm font-medium text-gray-500">Вид спорта</label>
                <p class="mt-1 text-sm text-gray-900">{{ userProfile.team.sport_type }}</p>
              </div>
              <div v-if="!userProfile.team">
                <p class="text-sm text-gray-500">Вы не состоите в команде</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Форма подачи заявки -->
    <div v-if="!userProfile.team && !loading" class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <svg class="h-6 w-6 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Подать заявку на вступление в команду
        </h3>
        <div class="mt-2 text-sm text-gray-600">
          <p>Выберите команду и напишите сообщение тренеру, чтобы присоединиться к команде.</p>
        </div>
      </div>
      
      <div class="px-4 py-5 sm:p-6">
        <!-- Статус заявки -->
        <div v-if="teamRequestStatus" class="mb-6">
          <div :class="[
            'rounded-md p-4',
            teamRequestStatus === 'pending' ? 'bg-yellow-50 border border-yellow-200' :
            teamRequestStatus === 'approved' ? 'bg-green-50 border border-green-200' :
            'bg-red-50 border border-red-200'
          ]">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg v-if="teamRequestStatus === 'pending'" class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <svg v-else-if="teamRequestStatus === 'approved'" class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium" :class="[
                  teamRequestStatus === 'pending' ? 'text-yellow-800' :
                  teamRequestStatus === 'approved' ? 'text-green-800' :
                  'text-red-800'
                ]">
                  {{ 
                    teamRequestStatus === 'pending' ? 'Заявка на рассмотрении' :
                    teamRequestStatus === 'approved' ? 'Заявка принята' :
                    'Заявка отклонена'
                  }}
                </h3>
                <p class="mt-1 text-sm" :class="[
                  teamRequestStatus === 'pending' ? 'text-yellow-700' :
                  teamRequestStatus === 'approved' ? 'text-green-700' :
                  'text-red-700'
                ]">
                  {{ 
                    teamRequestStatus === 'pending' ? 'Ожидайте решения тренера' :
                    teamRequestStatus === 'approved' ? 'Вы можете присоединиться к команде' :
                    'Вы можете подать новую заявку'
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form v-if="!teamRequestStatus" @submit.prevent="submitTeamRequest" class="space-y-6">
          <div v-if="error" class="rounded-md bg-red-50 p-4 border border-red-200">
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

          <div v-if="success" class="rounded-md bg-green-50 p-4 border border-green-200">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">{{ success }}</h3>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label for="team" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Выберите команду
              </label>
              <select
                id="team"
                v-model="selectedTeam"
                required
                :disabled="loading"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
              >
                <option value="" disabled>Выберите команду</option>
                <option v-for="team in availableTeams" :key="team.id" :value="team.id">
                  {{ team.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex justify-end pt-4 border-t border-gray-200">
            <button
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
              {{ loading ? 'Отправка заявки...' : 'Отправить заявку' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Форма изменения пароля -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <svg class="h-6 w-6 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          Изменение пароля
        </h3>
        <div class="mt-2 text-sm text-gray-600">
          <p>Измените пароль для входа в систему.</p>
        </div>
      </div>
      
      <div class="px-4 py-5 sm:p-6">
        <form @submit.prevent="changePassword" class="space-y-6">
          <div v-if="passwordError" class="rounded-md bg-red-50 p-4 border border-red-200">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">{{ passwordError }}</h3>
              </div>
            </div>
          </div>

          <div v-if="passwordSuccess" class="rounded-md bg-green-50 p-4 border border-green-200">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">{{ passwordSuccess }}</h3>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Текущий пароль
              </label>
              <input
                type="password"
                id="currentPassword"
                v-model="currentPassword"
                required
                :disabled="passwordLoading"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
                placeholder="Введите текущий пароль"
              />
            </div>

            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Новый пароль
              </label>
              <input
                type="password"
                id="newPassword"
                v-model="newPassword"
                required
                :disabled="passwordLoading"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
                placeholder="Введите новый пароль"
              />
            </div>

            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Подтверждение пароля
              </label>
              <input
                type="password"
                id="confirmPassword"
                v-model="confirmPassword"
                required
                :disabled="passwordLoading"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
                placeholder="Повторите новый пароль"
              />
            </div>
          </div>

          <div class="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              :disabled="passwordLoading"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg v-if="passwordLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              {{ passwordLoading ? 'Изменение пароля...' : 'Изменить пароль' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { AuthApi, ApiClient, AthleteProfileRequest, TeamsApi, TeamJoinRequest } from '../../api_athlet_monitoring/src'

// Создаем экземпляр API клиента
const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'
apiClient.enableCookies = true

const authApi = new AuthApi(apiClient)
const teamsApi = new TeamsApi(apiClient)

const userProfile = ref({
  full_name: '',
  email: '',
  birth_date: '',
  team: null
})
const availableTeams = ref([])
const selectedTeam = ref('')
const message = ref('')
const loading = ref(false)
const error = ref(null)
const success = ref(null)
const teamRequestStatus = ref(null)

// Состояние для формы изменения пароля
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordLoading = ref(false)
const passwordError = ref(null)
const passwordSuccess = ref(null)

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('ru-RU')
}

const loadUserProfile = async () => {
  try {
    loading.value = true
    error.value = null

    const request = new AthleteProfileRequest()
    request.athlete_id = 0

    const { data } = await new Promise((resolve, reject) => {
      authApi.authAthleteProfilePost(request, (error, data, response) => {
        if (error) {
          reject(error)
        } else {
          resolve({ data, response })
        }
      })
    })

    // Загружаем информацию о команде
    const teamRequest = new AthleteProfileRequest()
    teamRequest.athlete_id = 0

    try {
      const teamData = await new Promise((resolve, reject) => {
        authApi.authAthleteTeamPost(teamRequest, (error, data, response) => {
          if (error) {
            reject(error)
          } else {
            resolve({ data, response })
          }
        })
      })

      userProfile.value = {
        full_name: `${data.last_name} ${data.first_name} ${data.middle_name}`,
        email: data.email,
        birth_date: data.date_of_birth,
        team: teamData.data
      }
    } catch (teamErr) {
      // Если нет команды, проверяем статус заявки
      userProfile.value = {
        full_name: `${data.last_name} ${data.first_name} ${data.middle_name}`,
        email: data.email,
        birth_date: data.date_of_birth,
        team: null
      }

      try {
        const statusData = await new Promise((resolve, reject) => {
          teamsApi.teamAthleteTeamStatusGet((error, data, response) => {
            if (error) {
              reject(error)
            } else {
              resolve({ data, response })
            }
          })
        })
        teamRequestStatus.value = statusData.data.status
      } catch (statusErr) {
        teamRequestStatus.value = null
      }
    }
  } catch (err) {
    console.error('Ошибка при загрузке профиля:', err)
    error.value = 'Не удалось загрузить данные профиля'
  } finally {
    loading.value = false
  }
}

const loadAvailableTeams = async () => {
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
      availableTeams.value = data.teams.map(team => ({
        id: team.team_id,
        name: team.team_name
      }))
    } else {
      console.error('Неожиданная структура данных:', data)
      availableTeams.value = []
    }
  } catch (err) {
    console.error('Ошибка при загрузке списка команд:', err)
    error.value = 'Не удалось загрузить список команд'
    availableTeams.value = []
  } finally {
    loading.value = false
  }
}

const submitTeamRequest = async () => {
  loading.value = true
  error.value = null
  success.value = null

  try {
    const request = new TeamJoinRequest()
    request.team_id = parseInt(selectedTeam.value)

    await new Promise((resolve, reject) => {
      teamsApi.teamsJoinPost(request, (error, data, response) => {
        if (error) reject(error)
        else resolve({ data, response })
      })
    })
    
    success.value = 'Заявка успешно отправлена'
    selectedTeam.value = ''
    message.value = ''
    
    // Обновляем статус заявки сразу после отправки
    try {
      const statusData = await new Promise((resolve, reject) => {
        teamsApi.teamAthleteTeamStatusGet((error, data, response) => {
          if (error) {
            reject(error)
          } else {
            resolve({ data, response })
          }
        })
      })
      teamRequestStatus.value = statusData.data.status
    } catch (statusErr) {
      console.error('Ошибка при получении статуса заявки:', statusErr)
    }
  } catch (err) {
    console.error('Ошибка при отправке заявки:', err)
    error.value = err.message || 'Не удалось отправить заявку'
  } finally {
    loading.value = false
  }
}

const changePassword = async () => {
  passwordLoading.value = true
  passwordError.value = null
  passwordSuccess.value = null

  try {
    // Валидация паролей
    if (newPassword.value !== confirmPassword.value) {
      throw new Error('Пароли не совпадают')
    }

    if (newPassword.value.length < 8) {
      throw new Error('Новый пароль должен содержать минимум 8 символов')
    }

    // Создаем экземпляр API клиента
    const apiClient = new ApiClient()
    // Включаем отправку куки
    apiClient.enableCookies = true
    const authApi = new AuthApi(apiClient)

    // Создаем запрос на смену пароля
    const request = {
      old_password: currentPassword.value,
      new_password: newPassword.value
    }

    // Отправляем запрос
    await new Promise((resolve, reject) => {
      authApi.authChangePasswordPost(request, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
    
    // Очищаем поля после успешной смены пароля
    passwordSuccess.value = 'Пароль успешно изменен'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    console.error('Ошибка при изменении пароля:', err)
    passwordError.value = err.message || 'Не удалось изменить пароль'
  } finally {
    passwordLoading.value = false
  }
}

onMounted(() => {
  loadUserProfile()
  loadAvailableTeams()
})
</script> 