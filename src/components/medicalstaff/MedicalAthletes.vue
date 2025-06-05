<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
      <h3 class="text-lg font-medium text-gray-900 flex items-center">
        <svg class="h-6 w-6 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6m8-2a8 8 0 11-16 0 8 8 0 0116 0z" />
        </svg>
        Панель врача: спортсмены
      </h3>
      <div class="mt-2 text-sm text-gray-600">Все спортсмены (статус цветом, имена обезличены)</div>
    </div>

    <!-- Ошибки и загрузка -->
    <div v-if="loading" class="text-gray-500 text-center py-6">Загрузка...</div>
    <div v-if="error" class="text-red-500 text-center py-6">{{ error }}</div>

    <!-- Таблица спортсменов -->
    <div class="px-4 py-5 sm:p-6" v-if="!loading && !error">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Код спортсмена</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Возраст</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Вид спорта</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
          <th class="px-6 py-3"></th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="athlete in athletes" :key="athlete.code || athlete.generated_code">
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ athlete.code || athlete.generated_code }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ athlete.age }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ athlete.sport }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <span
                class=" py-4 whitespace-nowrap text-sm"
            >
              {{ getStatusText(athlete.status) }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
            <button
                class="text-primary-600 hover:text-primary-900 transition-colors duration-200"
                @click="selectAthlete(athlete)"
            >
              Подробнее
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Модалка информации о спортсмене -->
    <div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-5xl mx-auto p-8 relative max-h-screen md:max-h-[90vh] overflow-y-auto">
        <button @click="selected = null" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div class="text-2xl font-bold text-gray-900 mb-1">{{ selected.code || selected.generated_code }} <span v-if="selected.sport">— {{ selected.sport }}</span><span v-if="selected.age">, {{ selected.age }} лет</span></div>
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
        <div class="mb-4 flex justify-end">
          <button
            class="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-semibold shadow hover:bg-primary-700 transition"
            @click="showAssignModal = true"
          >
            Создать назначение
          </button>
        </div>
        <div class="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div class="font-semibold mb-2">История назначений:</div>
          <ul>
            <li v-for="app in mockAppointments" :key="app.id" class="mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-3 rounded border border-gray-100 bg-white">
              <div>
                <div class="font-medium text-gray-800">{{ app.reason }}</div>
                <div class="text-xs text-gray-500">{{ app.date }}</div>
              </div>
              <div>
                <span :class="app.status === 'выполнено' ? 'bg-green-100 text-green-800' : app.status === 'отменено' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ app.status }}
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div class="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div class="mt-3 text-base font-medium text-gray-700 flex items-center">
            Аналитика спортсмена:
          </div>
          <div class="mt-1 text-gray-500 text-sm">
            <div>Последний пульс: 67 уд/мин</div>
            <div>Средний сон: 7.2 ч</div>
            <div>Тренировки: 4 за неделю</div>
          </div>
        </div>
        <!-- Модалка создания назначения -->
        <div v-if="showAssignModal" class="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button @click="showAssignModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Новое назначение</h3>
            <textarea
              v-model="newReason"
              class="block w-full border border-gray-300 rounded-md p-3 mb-4"
              placeholder="Опишите причину назначения"
              rows="3"
            ></textarea>
            <button
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 w-full"
              @click="assign"
            >
              Назначить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue'
import {ApiClient, TeamsApi} from '../../api_athlet_monitoring/src'
import {Line} from 'vue-chartjs'
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

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'
apiClient.enableCookies = true
const teamsApi = new TeamsApi(apiClient)

const athletes = ref([])
const selected = ref(null)
const showAssignModal = ref(false)
const newReason = ref('')
const loading = ref(false)
const error = ref('')
const medicalId = ref(1)

const chartParams = ref([
  {key: 'wsr', label: 'ВСР', color: '#3b82f6', enabled: true},
  {key: 'pulse_morning', label: 'Пульс утренний', color: '#f59e42', enabled: true},
  {key: 'pulse_evening', label: 'Пульс вечерний', color: '#ef4444', enabled: true},
  {key: 'weight', label: 'Вес', color: '#10b981', enabled: true},
])
const enabledParams = computed(() => chartParams.value.filter(p => p.enabled))

const chartLabels = computed(() => {
  if (!selected.value?.indicators) return []
  return [...selected.value.indicators].reverse().map(i => {
    const date = new Date(i.date)
    return date.toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit'})
  })
})
const chartIndicators = computed(() => {
  const inds = selected.value?.indicators
  if (!inds) return {wsr: [], pulse_morning: [], pulse_evening: [], weight: []}
  const arr = [...inds].reverse()
  return {
    wsr: arr.map(i => i.hrv),
    pulse_morning: arr.map(i => i.morning_pulse),
    pulse_evening: arr.map(i => i.evening_pulse),
    weight: arr.map(i => i.weight),
  }
})
const chartLimits = computed(() => {
  if (!selected.value?.limits) return {
    wsr: {min: 60, max: 75, color: '#3b82f6'},
    pulse_morning: {min: 50, max: 60, color: '#f59e42'},
    pulse_evening: {min: 60, max: 68, color: '#ef4444'},
    weight: {min: 71.5, max: 73, color: '#10b981'},
  }
  return {
    wsr: {
      min: selected.value.limits.hrv?.min,
      max: selected.value.limits.hrv?.max,
      color: '#3b82f6',
    },
    pulse_morning: {
      min: selected.value.limits.morning_pulse?.min,
      max: selected.value.limits.morning_pulse?.max,
      color: '#f59e42',
    },
    pulse_evening: {
      min: selected.value.limits.evening_pulse?.min,
      max: selected.value.limits.evening_pulse?.max,
      color: '#ef4444',
    },
    weight: {
      min: selected.value.limits.weight?.min,
      max: selected.value.limits.weight?.max,
      color: '#10b981',
    },
  }
})
const chartData = computed(() => ({
  labels: chartLabels.value,
  datasets: enabledParams.value.map(param => ({
    label: param.label,
    data: chartIndicators.value[param.key],
    borderColor: param.color,
    backgroundColor: param.color + '33',
    tension: 0.4,
    pointRadius: 4,
    fill: false,
    yAxisID: param.key === 'weight' ? 'y2' : 'y',
  }))
}))
const chartOptions = computed(() => {
  const weights = chartIndicators.value.weight || []
  const minWeight = weights.length ? Math.floor(Math.min(...weights)) - 1 : 50
  const maxWeight = weights.length ? Math.ceil(Math.max(...weights)) + 1 : 75

  return {
    responsive: true,
    plugins: {
      legend: {position: 'top'},
      title: {display: false},
      tooltip: {mode: 'index', intersect: false},
    },
    interaction: {mode: 'nearest', axis: 'x', intersect: false},
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        min: 40,
        max: 80,
        grid: {color: '#f3f4f6'},
        title: {display: true, text: 'ВСР / Пульс'},
      },
      y2: {
        type: 'linear',
        position: 'right',
        min: minWeight,
        max: maxWeight,
        grid: {drawOnChartArea: false},
        title: {display: true, text: 'Вес'},
      },
    },
  }
})

async function fetchAthletes() {
  loading.value = true
  error.value = ''
  try {
    const {data} = await new Promise((resolve, reject) => {
      teamsApi.teamsGetMedicalAssigmentsGet((err, data, resp) => {
        if (err) reject(err)
        else resolve({data, resp})
      })
    })

    athletes.value = (data.athletes || []).map(a => ({
      code: a.athlete_code,
      age: a.age,
      sport: a.sport_type || a.sport || 'Неизвестно',
      status: 'Снижение веса и ВСР',
      appointments: a.appointments || [],
      athlete_id: a.athlete_id,
    }))
  } catch (e) {
    error.value = 'Ошибка загрузки спортсменов'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchAthletes)

watch(selected, async (athlete) => {
  if (!athlete) return
  try {
    const body = {athlete_id: athlete.athlete_id}
    const {data} = await new Promise((resolve, reject) => {
      teamsApi.teamsGetCriticalAthletePost(body, (err, data, resp) => {
        if (err) reject(err)
        else resolve({data, resp})
      })
    })
    selected.value.indicators = data.indicators || []
    selected.value.limits = data.limits || {}
  } catch (e) {
    selected.value.indicators = []
    selected.value.limits = {}
  }
}, {immediate: false})

function selectAthlete(athlete) {
  selected.value = athlete
}

function getStatusText(status) {
  if (status === 'назначено') return 'Назначено'
  if (status === 'опасно') return 'Опасно'
  if (status === 'здоров') return 'Здоров'
  return status
}

function formatDate(dt) {
  const d = new Date(dt)
  return d.toLocaleString('ru-RU')
}

async function assign() {
  if (!newReason.value.trim() || !selected.value) return
  try {
    const body = {
      athlete_id: selected.value.athlete_id,
      reason: newReason.value,
    }
    await new Promise((resolve, reject) => {
      // medicalApi.medicalAssignAthlete(body, (err, data, resp) => {
      //   if (err) reject(err)
      //   else resolve({ data, resp })
      // })
      setTimeout(resolve, 500)
    })

    selected.value.appointments.unshift({
      id: Date.now(),
      reason: newReason.value,
      date: new Date().toISOString(),
      status: 'назначено'
    })
    selected.value.status = 'назначено'
    newReason.value = ''
    showAssignModal.value = false
  } catch (e) {
    alert('Ошибка при создании назначения')
    console.error(e)
  }
}

const mockAppointments = [
  {
    id: 1,
    date: '2024-05-20',
    reason: 'Повышенный пульс утром',
    status: 'выполнено',
  },
  {
    id: 2,
    date: '2024-05-28',
    reason: 'Жалобы на усталость',
    status: 'отменено',
  },
  {
    id: 3,
    date: '2024-06-02',
    reason: 'Снижение ВСР',
    status: 'выполнено',
  },
]
</script>

<style>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: scale(.97) translateY(40px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in .25s cubic-bezier(.35, .75, .6, 1.1) 1;
}
</style>