<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100 rounded-t-lg -m-6 mb-6">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <svg class="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 8v.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
          </svg>
          Аналитика спортсменов
        </h3>
      </div>
      <div class="mt-2 text-sm text-gray-600">
        <p>Мониторинг состояния и показателей спортсменов</p>
      </div>
    </div>
    <div class="flex gap-4 border-b border-gray-200 mb-6">
      <button
        v-for="tab in analyticsTabs"
        :key="tab.value"
        @click="analyticsActiveTab = tab.value"
        :class="[
          analyticsActiveTab === tab.value
            ? 'border-primary-500 text-primary-700 bg-primary-50'
            : 'border-transparent text-gray-500 hover:text-primary-700 hover:bg-primary-50',
          'px-4 py-2 border-b-2 font-semibold rounded-t transition'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>
    <div v-if="teams.length">
      <div class="mb-4 flex items-center gap-3">
        <label class="text-sm text-gray-700">Фильтр по команде:</label>
        <select v-model="teamFilter" class="px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option value="">Все команды</option>
          <option v-for="team in teams" :key="team" :value="team">{{ team }}</option>
        </select>
      </div>
    </div>
    <div v-if="analyticsActiveTab === 'critical'">
      <div class="text-lg font-bold text-red-600 mb-4">Критические показатели</div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="athlete in filteredCriticalAthletes" :key="athlete.id"
          :class="[
            'rounded-xl p-5 flex flex-col shadow hover:shadow-lg transition',
            'bg-red-50 border-l-4 border-red-500',
            selectedAthletes.includes(athlete.id) ? 'border-2 border-primary-500 bg-primary-50' : '',
            athlete.status === 'ожидает назначений врача' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
          ]"
          @click="athlete.status !== 'ожидает назначений врача' && toggleAthleteSelection(athlete.id)"
        >
          <div class="flex items-center gap-3 mb-2">
            <input type="checkbox" class="mr-2" :checked="selectedAthletes.includes(athlete.id)" @change.stop="toggleAthleteSelection(athlete.id)" @click.stop :disabled="athlete.status === 'ожидает назначений врача'" />
            <svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9l-6 6m0-6l6 6" />
            </svg>
            <span class="font-bold text-lg text-red-800">{{ athlete.fullName }}</span>
          </div>
          <div class="text-sm text-gray-700 mb-1"><span class="font-medium">Команда:</span> {{ athlete.team }}</div>
          <div class="text-sm text-gray-700 mb-2"><span class="font-medium">Период подготовки:</span> <span class="inline-block bg-red-100 text-red-700 rounded px-2 py-0.5">{{ athlete.period }}</span></div>
          <div v-if="athlete.status" class="text-xs text-orange-600 font-semibold mt-2">Статус: {{ athlete.status }}</div>
          <button class="mt-auto self-end px-4 py-1.5 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition" @click="openAthleteModal(athlete)">Аналитика</button>
        </div>
      </div>
    </div>
    <div v-else-if="analyticsActiveTab === 'warning'">
      <div class="text-lg font-bold text-yellow-600 mb-4">Тревожные показатели</div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="athlete in filteredWarningAthletes" :key="athlete.id"
          :class="[
            'rounded-xl p-5 flex flex-col shadow hover:shadow-lg transition',
            'bg-yellow-50 border-l-4 border-yellow-500',
            selectedAthletes.includes(athlete.id) ? 'border-2 border-primary-500 bg-primary-50' : '',
            athlete.status === 'ожидает назначений врача' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
          ]"
          @click="athlete.status !== 'ожидает назначений врача' && toggleAthleteSelection(athlete.id)"
        >
          <div class="flex items-center gap-3 mb-2">
            <input type="checkbox" class="mr-2" :checked="selectedAthletes.includes(athlete.id)" @change.stop="toggleAthleteSelection(athlete.id)" @click.stop :disabled="athlete.status === 'ожидает назначений врача'" />
            <svg class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01" />
            </svg>
            <span class="font-bold text-lg text-yellow-800">{{ athlete.fullName }}</span>
          </div>
          <div class="text-sm text-gray-700 mb-1"><span class="font-medium">Команда:</span> {{ athlete.team }}</div>
          <div class="text-sm text-gray-700 mb-2"><span class="font-medium">Период подготовки:</span> <span class="inline-block bg-yellow-100 text-yellow-700 rounded px-2 py-0.5">{{ athlete.period }}</span></div>
          <div v-if="athlete.status" class="text-xs text-orange-600 font-semibold mt-2">Статус: {{ athlete.status }}</div>
          <button class="mt-auto self-end px-4 py-1.5 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition" @click="openAthleteModal(athlete)">Аналитика</button>
        </div>
      </div>
    </div>
    <div v-else-if="analyticsActiveTab === 'teams'">
      <div class="text-lg font-bold text-primary-700 mb-2">Мои команды</div>
      <div class="text-gray-500">Здесь будет список ваших команд с аналитикой по спортсменам.</div>
    </div>

    <!-- Модальное окно аналитики спортсмена -->
    <div v-if="showAthleteModal" class="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-5xl mx-auto p-8 relative max-h-screen md:max-h-[90vh] overflow-y-auto">
        <button @click="closeAthleteModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div class="text-2xl font-bold text-gray-900 mb-1">{{ selectedAthlete.fullName }}</div>
            <div class="text-gray-700 text-sm mb-1">Команда: <span class="font-medium">{{ selectedAthlete.team }}</span></div>
            <div class="text-gray-700 text-sm">Период подготовки: <span class="inline-block bg-blue-100 text-blue-700 rounded px-2 py-0.5">{{ selectedAthlete.period }}</span></div>
          </div>
        </div>
        <div class="mb-4 flex flex-wrap gap-4 items-center">
          <div class="font-semibold">Показатели:</div>
          <label v-for="param in chartParams" :key="param.key" class="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" v-model="param.enabled" />
            <span :style="{ color: param.color }">{{ param.label }}</span>
          </label>
        </div>
        <div class="mb-8">
          <Line :data="chartData" :options="chartOptions" style="height: 300px;" />
          <div class="mt-2 text-xs text-gray-500 flex flex-wrap gap-4">
            <span v-for="param in enabledParams" :key="param.key">
              <span :style="{ color: chartLimits[param.key].color }">Допустимо: {{ chartLimits[param.key].min }} - {{ chartLimits[param.key].max }}</span>
            </span>
          </div>
        </div>
        <div class="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div class="font-semibold mb-2">Назначения врача</div>
          <ul>
            <li v-for="app in mockAppointments" :key="app.id" class="mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-3 rounded border border-gray-100 bg-white">
              <div>
                <div class="font-medium text-gray-800">{{ app.reason }}</div>
                <div class="text-xs text-gray-500">{{ app.date }} — {{ app.doctor }}</div>
              </div>
              <div>
                <span :class="app.status === 'выполнено' ? 'bg-green-100 text-green-800' : app.status === 'отменено' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ app.status }}
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div class="font-semibold mb-2">Последние тренировки (7 дней)</div>
            <ul>
              <li v-for="t in mockTrainings" :key="t.date" class="mb-1 flex justify-between items-center">
                <span>{{ t.date }} — {{ t.name }}</span>
                <span class="text-xs text-gray-500">{{ t.duration }}, {{ t.intensity }}</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div class="font-semibold mb-2">Тренировочные планы</div>
            <ul>
              <li v-for="p in mockPlans" :key="p.name" class="mb-1 flex justify-between items-center">
                <span>{{ p.name }} ({{ p.period }})</span>
                <span class="text-xs text-gray-500">{{ p.status }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedAthletes.length" class="fixed right-8 bottom-8 z-50">
      <button @click="openDoctorModal" class="px-6 py-3 rounded-lg bg-primary-600 text-white font-bold shadow-lg hover:bg-primary-700 transition text-lg flex items-center gap-2">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Направить к врачу
      </button>
    </div>

    <!-- Модальное окно выбора врача -->
    <div v-if="showDoctorModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 relative">
        <button @click="closeDoctorModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <div class="mb-6">
          <div class="text-xl font-bold text-gray-900 mb-2">Выберите врача</div>
          <ul class="space-y-2">
            <li v-for="doc in doctors" :key="doc.id" class="flex items-center gap-2">
              <input type="radio" :id="'doc-' + doc.id" :value="doc.id" v-model="selectedDoctor" />
              <label :for="'doc-' + doc.id" class="cursor-pointer">{{ doc.name }}</label>
            </li>
          </ul>
        </div>
        <button :disabled="!selectedDoctor" @click="sendToDoctor" class="w-full py-2 rounded bg-primary-600 text-white font-semibold hover:bg-primary-700 transition disabled:opacity-50">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import TeamsApi from '@/api_athlet_monitoring/src/api/TeamsApi'
import ApiClient from '@/api_athlet_monitoring/src/ApiClient'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const analyticsTabs = [
  { value: 'critical', label: 'Критические показатели' },
  { value: 'warning', label: 'Тревожные показатели' }
]
const analyticsActiveTab = ref('critical')

const criticalAthletes = ref([
  {
    id: 1,
    fullName: 'Иванов Иван Иванович',
    team: 'Легкоатлетический клуб "Спринт"',
    period: 'соревновательный',
    status: 'Снижение веса и ВСР',
  },
  {
    id: 2,
    fullName: 'Петров Петр Петрович',
    team: 'Велоклуб "Колесо"',
    period: 'базовая подготовка',
    status: 'Снижение веса и ВСР',
  },
  {
    id: 3,
    fullName: 'Сидорова Анна Сергеевна',
    team: 'Лыжная команда "Снежинка"',
    period: 'восстановительный',
    status: 'Снижение веса и ВСР',
  },
])

const warningAthletes = ref([
  {
    id: 4,
    fullName: 'Кузнецов Алексей Михайлович',
    team: 'Триатлон-клуб "Триумф"',
    period: 'подготовительный',
    status: 'Снижение веса и ВСР',
  },
  {
    id: 5,
    fullName: 'Маркова Ольга Дмитриевна',
    team: 'Плавательный клуб "Дельфин"',
    period: 'соревновательный',
    status: 'Снижение веса и ВСР',
  },
  {
    id: 6,
    fullName: 'Смирнов Дмитрий Сергеевич',
    team: 'Футбольная команда "Виктория"',
    period: 'базовая подготовка',
    status: 'Снижение веса и ВСР',
  },
])

const selectedAthletes = ref([])
const showDoctorModal = ref(false)
const selectedDoctor = ref(null)

const doctors = [
  { id: 1, name: 'Др. Сидоров Алексей' },
  { id: 2, name: 'Др. Иванова Мария' },
  { id: 3, name: 'Др. Петров Дмитрий' },
]

function toggleAthleteSelection(id) {
  if (selectedAthletes.value.includes(id)) {
    selectedAthletes.value = selectedAthletes.value.filter(aid => aid !== id)
  } else {
    selectedAthletes.value.push(id)
  }
}

function openDoctorModal() {
  showDoctorModal.value = true
  selectedDoctor.value = null
}
function closeDoctorModal() {
  showDoctorModal.value = false
  selectedDoctor.value = null
}
function sendToDoctor() {
  const all = analyticsActiveTab.value === 'critical' ? criticalAthletes.value : warningAthletes.value
  all.forEach(a => {
    if (selectedAthletes.value.includes(a.id)) {
      a.status = 'ожидает назначений врача'
    }
  })
  selectedAthletes.value = []
  closeDoctorModal()
}

const showAthleteModal = ref(false)
const selectedAthlete = ref({})

function openAthleteModal(athlete) {
  selectedAthlete.value = athlete
  showAthleteModal.value = true
}
function closeAthleteModal() {
  showAthleteModal.value = false
  selectedAthlete.value = {}
}

const chartParams = ref([
  { key: 'wsr', label: 'ВСР', color: '#3b82f6', enabled: true },
  { key: 'pulse_morning', label: 'Пульс утренний', color: '#f59e42', enabled: true },
  { key: 'pulse_evening', label: 'Пульс вечерний', color: '#ef4444', enabled: true },
  { key: 'weight', label: 'Вес', color: '#10b981', enabled: true },
])

const chartLabels = [
  'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
]

const chartMockData = {
  wsr: [65, 68, 70, 66, 67, 69, 71],
  pulse_morning: [55, 57, 56, 54, 58, 59, 56],
  pulse_evening: [62, 64, 63, 61, 65, 66, 63],
  weight: [72.5, 72.3, 72.4, 72.2, 72.1, 72.0, 71.9],
}

const chartLimits = {
  wsr: { min: 60, max: 75, color: '#3b82f6' },
  pulse_morning: { min: 50, max: 60, color: '#f59e42' },
  pulse_evening: { min: 60, max: 68, color: '#ef4444' },
  weight: { min: 71.5, max: 73, color: '#10b981' },
}

const enabledParams = computed(() => chartParams.value.filter(p => p.enabled))

const chartData = computed(() => {
  return {
    labels: chartLabels,
    datasets: enabledParams.value.map(param => ({
      label: param.label,
      data: chartMockData[param.key],
      borderColor: param.color,
      backgroundColor: param.color + '33',
      tension: 0.4,
      pointRadius: 4,
      fill: false,
      yAxisID: param.key === 'weight' ? 'y2' : 'y',
    }))
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: false },
    tooltip: { mode: 'index', intersect: false },
  },
  interaction: { mode: 'nearest', axis: 'x', intersect: false },
  scales: {
    y: {
      type: 'linear',
      position: 'left',
      min: 40,
      max: 80,
      grid: { color: '#f3f4f6' },
      title: { display: true, text: 'ВСР / Пульс' },
    },
    y2: {
      type: 'linear',
      position: 'right',
      min: 70,
      max: 75,
      grid: { drawOnChartArea: false },
      title: { display: true, text: 'Вес' },
    },
  },
}))

const mockTrainings = [
  { date: '2024-06-01', name: 'Бег 10 км', duration: '50 мин', intensity: 'Средняя' },
  { date: '2024-06-02', name: 'Велотренировка', duration: '1 ч 20 мин', intensity: 'Высокая' },
  { date: '2024-06-03', name: 'Силовая', duration: '40 мин', intensity: 'Средняя' },
  { date: '2024-06-04', name: 'Отдых', duration: '-', intensity: '-' },
  { date: '2024-06-05', name: 'Бег 5 км', duration: '25 мин', intensity: 'Лёгкая' },
  { date: '2024-06-06', name: 'Плавание', duration: '30 мин', intensity: 'Средняя' },
  { date: '2024-06-07', name: 'Велотренировка', duration: '1 ч', intensity: 'Высокая' },
]

const mockPlans = [
  { name: 'Подготовка к марафону', period: '01.06-30.06', status: 'В процессе' },
  { name: 'Восстановление', period: '15.05-31.05', status: 'Завершён' },
]

const mockAppointments = [
  {
    id: 1,
    date: '2024-05-20',
    reason: 'Повышенный пульс утром',
    status: 'выполнено',
    doctor: 'Др. Сидоров Алексей',
  },
  {
    id: 2,
    date: '2024-05-28',
    reason: 'Жалобы на усталость',
    status: 'отменено',
    doctor: 'Др. Иванова Мария',
  },
  {
    id: 3,
    date: '2024-06-02',
    reason: 'Снижение ВСР',
    status: 'выполнено',
    doctor: 'Др. Петров Дмитрий',
  },
]

const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'
apiClient.enableCookies = true
const teamsApi = new TeamsApi(apiClient)

const teamFilter = ref('')
const teams = ref([])
const loadingTeams = ref(false)

async function fetchTeams() {
  loadingTeams.value = true
  await new Promise((resolve) => {
    teamsApi.teamsGet((error, data) => {
      if (!error && data && data.teams) {
        teams.value = data.teams.map(team => team.team_name)
      }
      loadingTeams.value = false
      resolve()
    })
  })
}

onMounted(() => {
  fetchTeams()
})

const filteredCriticalAthletes = computed(() => {
  if (!teamFilter.value) return criticalAthletes.value
  return criticalAthletes.value.filter(a => a.team === teamFilter.value)
})
const filteredWarningAthletes = computed(() => {
  if (!teamFilter.value) return warningAthletes.value
  return warningAthletes.value.filter(a => a.team === teamFilter.value)
})
</script> 