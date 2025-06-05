<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
      <h3 class="text-lg font-medium text-gray-900 flex items-center">
        <svg class="h-6 w-6 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Мои тренировочные планы
      </h3>
    </div>
    <div class="p-6">
      <div v-if="!selectedDate">
        <div class="mb-6">
          <div class="font-semibold text-lg mb-2">{{ plan.title }}</div>
          <div class="text-sm text-gray-500 mb-1">Период: {{ formatDate(plan.start_date) }} — {{ formatDate(plan.end_date) }}</div>
          <div class="text-sm text-gray-500 mb-1">Команда: {{ plan.team_name }}</div>
          <div class="text-sm text-gray-500 mb-1">Описание: {{ plan.description }}</div>
        </div>
        <div>
          <div class="font-semibold mb-2">Календарь плана</div>
          <div class="mb-2 grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
            <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
          </div>
          <div class="grid grid-cols-7 gap-1">
            <template v-for="(week, wIdx) in calendarMatrix" :key="wIdx">
              <template v-for="(date, dIdx) in week" :key="dIdx + '-' + wIdx">
                <div v-if="date" class="flex justify-center">
                  <button
                    class="w-10 h-10 rounded-full focus:outline-none"
                    :class="[
                      isWorkoutDay(date) ? 'bg-blue-200 border-blue-400 text-blue-900 font-bold' : 'bg-blue-50 border-blue-100 text-blue-700',
                      'border transition duration-150'
                    ]"
                    @click="selectedDate = date.toISOString().slice(0,10)"
                  >
                    {{ date.getDate() }}
                  </button>
                </div>
                <div v-else class="w-10 h-10"></div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div v-else>
        <button @click="selectedDate = null" class="mb-4 flex items-center text-primary-600 hover:underline">
          <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          Назад к календарю
        </button>
        <div class="flex items-center mb-6">
          <svg class="h-8 w-8 mr-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="text-2xl leading-7 font-bold text-gray-900">Тренировки на {{ formatDate(selectedDate) }}</h3>
        </div>
        <div v-if="workoutsForSelectedDate.length" class="mb-8">
          <div class="flex flex-col gap-4">
            <div v-for="(w, idx) in workoutsForSelectedDate" :key="w.time + w.sessionType + w.formatType + w.value + idx" class="flex items-stretch bg-white border border-gray-200 rounded-2xl shadow group hover:shadow-lg transition overflow-hidden">
              <div class="w-2 bg-blue-400"></div>
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
                </div>
                <div v-if="w.description" class="text-gray-500 italic mt-3">{{ w.description }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-400 mb-8">Нет тренировок на этот день</div>

        <!-- Файлы спортсмена за этот день -->
        <div class="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
          <div class="font-semibold mb-2">Файлы и документы за этот день</div>
          <input type="file" multiple @change="onFilesSelected" class="mb-2" />
          <div v-if="selectedFiles.length" class="mb-2">
            <div class="text-xs text-gray-500 mb-1">Выбрано файлов: {{ selectedFiles.length }}</div>
            <ul class="list-disc ml-5 text-sm">
              <li v-for="file in selectedFiles" :key="file.name">{{ file.name }}</li>
            </ul>
            <button @click="uploadFiles" class="mt-2 px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-semibold shadow hover:bg-primary-700 transition">Загрузить</button>
          </div>
          <div v-if="uploadedFiles[selectedDate] && uploadedFiles[selectedDate].length" class="mt-3">
            <div class="text-xs text-gray-500 mb-1">Загруженные файлы:</div>
            <ul class="list-disc ml-5 text-sm">
              <li v-for="file in uploadedFiles[selectedDate]" :key="file.name">{{ file.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const plan = {
  title: 'План подготовки к марафону',
  team_name: 'Легкоатлетический клуб "Спринт"',
  description: 'План для подготовки к марафону на 4 недели. Включает бег, силовые и восстановительные тренировки.',
  start_date: '2024-06-02',
  end_date: '2024-06-08',
  workouts: [
    { date: '2024-06-01', time: '08:00', sessionType: 'Бег', formatType: 'Дистанция', value: '10 км', description: 'Лёгкий бег' },
    { date: '2024-06-02', time: '09:00', sessionType: 'Силовая', formatType: 'Время', value: '40 мин', description: 'Общая физическая подготовка' },
    { date: '2024-06-03', time: '08:30', sessionType: 'Бег', formatType: 'Интервалы', value: '5x1 км', description: 'Интервальный бег' },
    { date: '2024-06-05', time: '08:00', sessionType: 'Бег', formatType: 'Дистанция', value: '12 км', description: '' },
    { date: '2024-06-07', time: '09:00', sessionType: 'Плавание', formatType: 'Время', value: '30 мин', description: '' },
  ]
}

const selectedDate = ref(null)
const selectedFiles = ref([])
const uploadedFiles = ref({})

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

const calendarMatrix = computed(() => getCalendarMatrix(plan.start_date, plan.end_date))

function isWorkoutDay(date) {
  return plan.workouts.some(w => w.date === date.toISOString().slice(0,10))
}

const workoutsForSelectedDate = computed(() => {
  if (!selectedDate.value) return []
  return plan.workouts.filter(w => w.date === selectedDate.value)
})

function formatDate(date) {
  if (!date) return ''
  if (typeof date === 'string') return date.split('-').reverse().join('.')
  return date.toLocaleDateString('ru-RU')
}

function onFilesSelected(e) {
  selectedFiles.value = Array.from(e.target.files)
}

function uploadFiles() {
  if (!selectedDate.value || !selectedFiles.value.length) return
  // Здесь должен быть реальный upload через API
  if (!uploadedFiles.value[selectedDate.value]) uploadedFiles.value[selectedDate.value] = []
  uploadedFiles.value[selectedDate.value].push(...selectedFiles.value.map(f => ({ name: f.name })))
  selectedFiles.value = []
}
</script> 