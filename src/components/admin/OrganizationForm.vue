<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <svg class="h-6 w-6 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {{ isEditing ? 'Редактирование организации' : 'Создание организации' }}
        </h3>
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-2 text-sm text-gray-600">
        <p>{{ isEditing ? 'Редактирование информации о спортивной организации' : 'Создание новой спортивной организации' }}</p>
      </div>
    </div>

    <div class="px-4 py-5 sm:p-6">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Сообщения об ошибках -->
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

        <!-- Сообщение об успехе -->
        <div v-if="successMessage" class="rounded-md bg-green-50 p-4 border border-green-200">
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Название организации -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Название организации
            </label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              required
              :disabled="loading"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
              placeholder="Например: СДЮСШОР №1"
            />
          </div>

          <!-- Тип организации -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="type" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Тип организации
            </label>
            <select
              id="type"
              v-model="formData.type"
              required
              :disabled="loading"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
            >
              <option value="" disabled>Выберите тип организации</option>
              <option value="sports_school">Спортивная школа</option>
              <option value="training_center">Центр спортивной подготовки</option>
            </select>
          </div>

          <!-- Адрес -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="address" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Адрес
            </label>
            <input
              type="text"
              id="address"
              v-model="formData.address"
              required
              :disabled="loading"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
              placeholder="Например: ул. Спортивная, д. 1"
            />
          </div>

          <!-- Телефон -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              required
              :disabled="loading"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
              placeholder="Например: +7 (999) 123-45-67"
            />
          </div>

          <!-- Email -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              :disabled="loading"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
              placeholder="Например: info@sport-school.ru"
            />
          </div>

          <!-- Описание -->
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 md:col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Описание
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="4"
              :disabled="loading"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 bg-white pl-12"
              placeholder="Опишите организацию, её историю, достижения и особенности"
            ></textarea>
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ loading ? 'Сохранение...' : (isEditing ? 'Сохранить изменения' : 'Создать организацию') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  organization: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'saved'])

const isEditing = computed(() => !!props.organization.id)

const formData = ref({
  name: props.organization.name || '',
  type: props.organization.type || '',
  address: props.organization.address || '',
  phone: props.organization.phone || '',
  email: props.organization.email || '',
  description: props.organization.description || ''
})

const loading = ref(false)
const error = ref(null)
const successMessage = ref(null)

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  successMessage.value = null

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    successMessage.value = isEditing.value 
      ? 'Организация успешно обновлена'
      : 'Организация успешно создана'
    
    setTimeout(() => {
      successMessage.value = null
      emit('saved')
    }, 1000)
  } catch (err) {
    console.error('Ошибка при сохранении организации:', err)
    error.value = err.message || 'Не удалось сохранить организацию'
  } finally {
    loading.value = false
  }
}
</script> 