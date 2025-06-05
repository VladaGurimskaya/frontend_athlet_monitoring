<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
      <h3 class="text-lg font-medium text-gray-900 flex items-center">
        <svg class="h-6 w-6 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Ввод биометрических данных
      </h3>
    </div>
    
    <div class="px-4 py-5 sm:p-6">
      <form @submit.prevent="submitBiometrics" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Утренний пульс -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="morning-pulse" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Утренний пульс
            </label>
            <div class="relative">
              <input
                type="number"
                id="morning-pulse"
                v-model="morningPulse"
                class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md pl-16 pr-4 py-2.5 bg-white"
                placeholder="Например: 65"
                min="30"
                max="200"
                required
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm font-medium">уд/мин</span>
              </div>
            </div>
          </div>

          <!-- Вечерний пульс -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="evening-pulse" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Вечерний пульс
            </label>
            <div class="relative">
              <input
                type="number"
                id="evening-pulse"
                v-model="eveningPulse"
                class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md pl-16 pr-4 py-2.5 bg-white"
                placeholder="Например: 72"
                min="30"
                max="200"
                required
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm font-medium">уд/мин</span>
              </div>
            </div>
          </div>

          <!-- Вес -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="weight" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              Вес
            </label>
            <div class="relative">
              <input
                type="number"
                id="weight"
                v-model="weight"
                class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md pl-16 pr-4 py-2.5 bg-white"
                placeholder="Например: 75,5"
                step="0.1"
                min="30"
                max="200"
                required
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm font-medium">кг</span>
              </div>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-700 mb-2">Частота ввода веса</label>
              <select
                v-model="weightFrequency"
                class="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white shadow-sm"
              >
                <option value="daily">Каждый день</option>
                <option value="every3days">Раз в 3 дня</option>
                <option value="weekly">Раз в неделю</option>
              </select>
            </div>
          </div>

          <!-- HRV -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="hrv" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              HRV
            </label>
            <div class="relative">
              <input
                type="number"
                id="hrv"
                v-model="hrv"
                class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md pl-16 pr-4 py-2.5 bg-white"
                placeholder="Например: 85"
                min="0"
                max="200"
                required
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm font-medium">мс</span>
              </div>
            </div>
          </div>

          <!-- Комментарий о самочувствии -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="wellness-comment" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2h2" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3h6m0 0v6m0-6L9 15" />
              </svg>
              Комментарий о самочувствии (необязательно)
            </label>
            <textarea
              id="wellness-comment"
              v-model="wellnessComment"
              rows="3"
              class="block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Опишите ваше самочувствие, усталость, настроение, жалобы и т.д."
            ></textarea>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            :disabled="loading"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ loading ? 'Сохранение...' : 'Сохранить' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ApiClient, BiometricsApi, BiometricInput } from '../../api_athlet_monitoring/src'

const morningPulse = ref('')
const eveningPulse = ref('')
const weight = ref('')
const weightFrequency = ref('daily')
const hrv = ref('')
const wellnessComment = ref('')
const loading = ref(false)

const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'
apiClient.withCredentials = true
apiClient.enableCookies = true

const biometricsApi = new BiometricsApi(apiClient)

const submitBiometrics = async () => {
  loading.value = true
  
  try {
    const biometricData = new BiometricInput()
    biometricData.date = new Date().toISOString()
    biometricData.morning_pulse = parseInt(morningPulse.value)
    biometricData.evening_pulse = parseInt(eveningPulse.value)
    biometricData.hrv = parseInt(hrv.value)
    
    const shouldInputWeight = (
      weightFrequency.value === 'daily' ||
      (weightFrequency.value === 'every3days' && new Date().getDay() % 3 === 0) ||
      (weightFrequency.value === 'weekly' && new Date().getDay() === 1)
    )
    
    if (shouldInputWeight) {
      biometricData.weight = parseFloat(weight.value)
    }
    
    if (wellnessComment.value) {
      biometricData.comment = wellnessComment.value
    }
    
    await new Promise((resolve, reject) => {
      biometricsApi.biometricsPost(biometricData, (error, data, response) => {
        if (error) reject(error)
        else resolve(response)
      })
    })
    
    morningPulse.value = ''
    eveningPulse.value = ''
    weight.value = ''
    hrv.value = ''
    wellnessComment.value = ''
    
    alert('Данные успешно сохранены')
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error)
    alert('Произошла ошибка при сохранении данных')
  } finally {
    loading.value = false
  }
}
</script> 