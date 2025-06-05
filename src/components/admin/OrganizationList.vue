<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <svg class="h-6 w-6 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Список организаций
        </h3>
        <button
          @click="showCreateForm = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
        >
          <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Добавить организацию
        </button>
      </div>
      <div class="mt-2 text-sm text-gray-600">
        <p>Управление спортивными школами и центрами спортивной подготовки</p>
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

      <!-- Список организаций -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <svg class="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <div v-else-if="organizations.length === 0" class="text-center py-8">
        <p class="text-gray-500">Нет доступных организаций</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Название
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Тип
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Адрес
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Контакты
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="org in organizations" :key="org.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ org.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getOrganizationType(org.type) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ org.address }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ org.phone }}</div>
                <div class="text-gray-500">{{ org.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="editOrganization(org)"
                  class="text-primary-600 hover:text-primary-900 mr-4 transition-colors duration-200"
                >
                  Редактировать
                </button>
                <button
                  @click="deleteOrganization(org)"
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
  </div>

  <!-- Модальное окно для создания/редактирования -->
  <div v-if="showCreateForm || editingOrganization" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <OrganizationForm
        :organization="editingOrganization"
        @close="closeForm"
        @saved="handleOrganizationSaved"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import OrganizationForm from './OrganizationForm.vue'

const loading = ref(false)
const error = ref(null)
const organizations = ref([])
const showCreateForm = ref(false)
const editingOrganization = ref(null)

const getOrganizationType = (type) => {
  const types = {
    sports_school: 'Спортивная школа',
    training_center: 'Центр спортивной подготовки'
  }
  return types[type] || type
}

const loadOrganizations = async () => {
  loading.value = true
  error.value = null

  try {
    organizations.value = [
      {
        id: 1,
        name: 'СДЮСШОР №1',
        type: 'sports_school',
        address: 'ул. Спортивная, д. 1',
        phone: '+7 (999) 123-45-67',
        email: 'info@sport-school.ru',
        description: 'Спортивная школа олимпийского резерва'
      },
      {
        id: 2,
        name: 'ЦСП "Олимп"',
        type: 'training_center',
        address: 'пр. Победы, д. 10',
        phone: '+7 (999) 765-43-21',
        email: 'info@olymp.ru',
        description: 'Центр спортивной подготовки'
      }
    ]
  } catch (err) {
    console.error('Ошибка при загрузке организаций:', err)
    error.value = err.message || 'Не удалось загрузить список организаций'
  } finally {
    loading.value = false
  }
}

const editOrganization = (org) => {
  editingOrganization.value = { ...org }
}

const deleteOrganization = async (org) => {
  if (!confirm(`Вы уверены, что хотите удалить организацию "${org.name}"?`)) {
    return
  }

  loading.value = true
  error.value = null

  try {
    console.log('Удаление организации:', org)
    await loadOrganizations() // Перезагружаем список после удаления
  } catch (err) {
    console.error('Ошибка при удалении организации:', err)
    error.value = err.message || 'Не удалось удалить организацию'
  } finally {
    loading.value = false
  }
}

const closeForm = () => {
  showCreateForm.value = false
  editingOrganization.value = null
}

const handleOrganizationSaved = async () => {
  closeForm()
  await loadOrganizations()
}

onMounted(() => {
  loadOrganizations()
})
</script> 