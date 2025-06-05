<template>
  <div class="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-1 flex items-center">
        <svg class="h-7 w-7 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 8v.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
        Калькулятор ЧСС и тренировочных зон
      </h2>
      <div class="text-gray-600 text-sm">Рассчитайте максимальный пульс и зоны тренировок по возрасту спортсмена</div>
    </div>
    <form @submit.prevent class="mb-8">
      <div class="mb-4">
        <label for="age" class="block text-sm font-medium text-gray-700 mb-2">Возраст спортсмена</label>
        <input
          id="age"
          v-model.number="age"
          type="number"
          min="10"
          max="100"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          placeholder="Введите возраст (лет)"
        />
        <div v-if="ageError" class="text-red-500 text-xs mt-1">{{ ageError }}</div>
      </div>
      <div class="mb-4">
        <label for="weight" class="block text-sm font-medium text-gray-700 mb-2">Масса тела (кг)</label>
        <input
          id="weight"
          v-model.number="weight"
          type="number"
          min="30"
          max="200"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          placeholder="Введите массу (кг)"
        />
        <div v-if="weightError" class="text-red-500 text-xs mt-1">{{ weightError }}</div>
      </div>
      <div class="mb-4">
        <label for="lactateHR" class="block text-sm font-medium text-gray-700 mb-2">Пульс при уровне лактата 4 ммоль/л (по тесту, если есть)</label>
        <input
          id="lactateHR"
          v-model.number="lactateHR"
          type="number"
          min="80"
          max="220"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          placeholder="Введите пульс (уд/мин)"
        />
        <div v-if="lactateHRError" class="text-red-500 text-xs mt-1">{{ lactateHRError }}</div>
      </div>
    </form>
    <div v-if="validAge" class="mb-8">
      <div class="mb-2 text-lg font-semibold text-gray-800">Максимальный ЧСС: <span class="text-primary-600">{{ maxHR }}</span> уд/мин</div>
      <div v-if="validLactateHR" class="mb-2 text-base text-gray-700">Пороговая зона (лактат 4 ммоль/л): <span class="text-primary-600">{{ lactateHR }}</span> уд/мин</div>
      <div class="text-gray-500 text-sm mb-4">Формула: <span class="font-mono bg-gray-100 px-2 py-0.5 rounded">240 - возраст</span></div>
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead class="bg-primary-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Зона</th>
              <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">% от макс. ЧСС</th>
              <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Диапазон (уд/мин)</th>
              <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="zone in zones" :key="zone.id" :class="zone.rowClass">
              <td class="px-4 py-2 font-bold">{{ zone.name }}</td>
              <td class="px-4 py-2">{{ zone.percent }}</td>
              <td class="px-4 py-2">{{ zone.range }}</td>
              <td class="px-4 py-2 text-sm text-gray-600">{{ zone.desc }}</td>
            </tr>
            <tr v-if="validLactateHR">
              <td class="px-4 py-2 font-bold bg-yellow-100">Пороговая зона (лактат 4 ммоль/л)</td>
              <td class="px-4 py-2 bg-yellow-100">—</td>
              <td class="px-4 py-2 bg-yellow-100">{{ lactateHR }}</td>
              <td class="px-4 py-2 text-sm text-gray-600 bg-yellow-100">Индивидуальный порог по тесту</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mb-10">
      <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
        <svg class="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6m8-2a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
        Ввод данных лактатного теста
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead class="bg-primary-50">
            <tr>
              <th class="px-3 py-2 text-xs font-semibold text-gray-700">№</th>
              <th class="px-3 py-2 text-xs font-semibold text-gray-700">Скорость (км/ч)</th>
              <th class="px-3 py-2 text-xs font-semibold text-gray-700">Пульс (уд/мин)</th>
              <th class="px-3 py-2 text-xs font-semibold text-gray-700">Лактат (ммоль/л)</th>
              <th class="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(step, idx) in steps" :key="step.id" :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
              <td class="px-3 py-2 text-center font-semibold">{{ idx + 1 }}</td>
              <td class="px-3 py-2">
                <input type="number" v-model.number="step.speed" min="4" max="30" step="0.1" class="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500" placeholder="км/ч" />
              </td>
              <td class="px-3 py-2">
                <input type="number" v-model.number="step.hr" min="60" max="220" class="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500" placeholder="уд/мин" />
              </td>
              <td class="px-3 py-2">
                <input type="number" v-model.number="step.lactate" min="0" max="20" step="0.1" class="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500" placeholder="ммоль/л" />
              </td>
              <td class="px-3 py-2 text-center">
                <button v-if="steps.length > 1" @click="removeStep(idx)" class="text-red-500 hover:text-red-700" title="Удалить ступень">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3 flex justify-end">
        <button @click="addStep" class="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-semibold shadow hover:bg-primary-700 transition flex items-center gap-2">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          Добавить ступень
        </button>
      </div>
    </div>
    <div v-if="stepsForChart.length >= 2" class="mb-10">
      <div class="mb-3 flex gap-2">
        <button
          v-for="tab in chartTabs"
          :key="tab.value"
          @click="activeChartTab = tab.value"
          :class="[
            'px-4 py-2 rounded-t font-semibold transition',
            activeChartTab === tab.value ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-primary-50'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="bg-white border border-gray-200 rounded-b-xl p-4 shadow">
        <Line :data="chartData" :options="chartOptions" style="height:320px;" />
      </div>
    </div>
    <div v-if="panoResult" class="mb-8">
      <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-2">
        <div class="text-base font-semibold text-blue-900 mb-1 flex items-center">
          <svg class="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9" /></svg>
          Порог анаэробного обмена (ПАНО, 4 ммоль/л):
        </div>
        <div class="text-gray-800 text-lg mb-1">Скорость: <span class="font-bold">{{ panoResult.speed.toFixed(2) }}</span> км/ч, Пульс: <span class="font-bold">{{ panoResult.hr.toFixed(0) }}</span> уд/мин</div>
        <div class="text-xs text-gray-500">Рассчитано по формуле: <span class="font-mono bg-gray-100 px-2 py-0.5 rounded">Vₚₐₙₒ = V₁ + (4 - L₁) × (V₂ - V₁) / (L₂ - L₁)</span></div>
      </div>
    </div>
    <div v-else-if="stepsForChart.length >= 2" class="mb-8">
      <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
        Недостаточно данных для определения ПАНО (нужны две ступени по разные стороны от 4 ммоль/л)
      </div>
    </div>
    <div v-if="vo2maxResult" class="mb-8">
      <div class="p-4 bg-green-50 border border-green-200 rounded-lg mb-2">
        <div class="text-base font-semibold text-green-900 mb-1 flex items-center">
          <svg class="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 8v.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
          VO₂max (МПК):
        </div>
        <div class="text-gray-800 text-lg mb-1">VO₂max: <span class="font-bold">{{ vo2maxResult.toFixed(1) }}</span> мл/кг/мин</div>
        <div class="text-xs text-gray-500">Формула: <span class="font-mono bg-gray-100 px-2 py-0.5 rounded">VO₂max = 3.5 × скорость (км/ч) / масса (кг)</span></div>
      </div>
    </div>
    <div v-if="lactateZones.length" class="mb-8">
      <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg mb-2">
        <div class="text-base font-semibold text-purple-900 mb-2 flex items-center">
          <svg class="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6m8-2a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
          Зоны по лактату (автоматически)
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead class="bg-primary-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Зона</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Лактат (ммоль/л)</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Скорость (км/ч)</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Пульс (уд/мин)</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="zone in lactateZones" :key="zone.id" :class="zone.rowClass">
                <td class="px-4 py-2 font-bold">{{ zone.name }}</td>
                <td class="px-4 py-2">{{ zone.lactate }}</td>
                <td class="px-4 py-2">{{ zone.speed }}</td>
                <td class="px-4 py-2">{{ zone.hr }}</td>
                <td class="px-4 py-2 text-sm text-gray-600">{{ zone.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-xs text-gray-500 mt-2">* Диапазоны определяются по точкам 2, 3, 4, 6 ммоль/л (интерполяция по данным теста)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const age = ref('')
const ageError = ref('')
const weight = ref('')
const weightError = ref('')
const lactateHR = ref('')
const lactateHRError = ref('')

const validAge = computed(() => {
  if (!age.value) return false
  if (isNaN(age.value) || age.value < 10 || age.value > 100) {
    ageError.value = 'Введите возраст от 10 до 100 лет'
    return false
  }
  ageError.value = ''
  return true
})

const validWeight = computed(() => {
  if (!weight.value) return false
  if (isNaN(weight.value) || weight.value < 30 || weight.value > 200) {
    weightError.value = 'Введите массу от 30 до 200 кг'
    return false
  }
  weightError.value = ''
  return true
})

const validLactateHR = computed(() => {
  if (!lactateHR.value) return false
  if (isNaN(lactateHR.value) || lactateHR.value < 80 || lactateHR.value > 220) {
    lactateHRError.value = 'Введите значение от 80 до 220 уд/мин'
    return false
  }
  lactateHRError.value = ''
  return true
})

const maxHR = computed(() => validAge.value ? 240 - Number(age.value) : '-')

function zoneRange(minP, maxP) {
  if (!validAge.value) return '-'
  const min = Math.round(maxHR.value * minP)
  const max = Math.round(maxHR.value * maxP)
  return minP === 0 ? `< ${max}` : maxP === 1000 ? `> ${min}` : `${min}–${max}`
}

const zones = computed(() => {
  if (validLactateHR.value) {
    const lhr = Number(lactateHR.value)
    const z3min = lhr - 5
    const z3max = lhr + 5
    return [
      {
        id: 'z1',
        name: 'Z1',
        percent: '< 60%',
        range: `< ${Math.round(maxHR.value * 0.6)}`,
        desc: 'Восстановление',
        rowClass: 'bg-green-50',
      },
      {
        id: 'z2',
        name: 'Z2',
        percent: `60%–${Math.round((z3min / maxHR.value) * 100)}%`,
        range: `${Math.round(maxHR.value * 0.6)}–${z3min}`,
        desc: 'Аэробная база',
        rowClass: 'bg-blue-50',
      },
      {
        id: 'z3',
        name: 'Z3',
        percent: `${Math.round((z3min / maxHR.value) * 100)}%–${Math.round((z3max / maxHR.value) * 100)}%`,
        range: `${z3min}–${z3max}`,
        desc: 'Пороговая (лактат 4 ммоль/л)',
        rowClass: 'bg-yellow-100',
      },
      {
        id: 'z4',
        name: 'Z4',
        percent: `${Math.round((z3max / maxHR.value) * 100)}%–100%`,
        range: `${z3max + 1}–${maxHR.value}`,
        desc: 'VO₂max зона',
        rowClass: 'bg-orange-50',
      },
      {
        id: 'z5',
        name: 'Z5',
        percent: '> 100%',
        range: `> ${maxHR.value}`,
        desc: 'Анаэробная, интервальная работа',
        rowClass: 'bg-red-50',
      },
    ]
  }
  return [
    {
      id: 'z1',
      name: 'Z1',
      percent: '< 60%',
      range: validAge.value ? `< ${Math.round(maxHR.value * 0.6)}` : '-',
      desc: 'Восстановление',
      rowClass: 'bg-green-50',
    },
    {
      id: 'z2',
      name: 'Z2',
      percent: '60–75%',
      range: validAge.value ? `${Math.round(maxHR.value * 0.6)}–${Math.round(maxHR.value * 0.75)}` : '-',
      desc: 'Аэробная база',
      rowClass: 'bg-blue-50',
    },
    {
      id: 'z3',
      name: 'Z3',
      percent: '75–90%',
      range: validAge.value ? `${Math.round(maxHR.value * 0.75)}–${Math.round(maxHR.value * 0.9)}` : '-',
      desc: 'Пороговая (развитие LT1/LT2)',
      rowClass: 'bg-yellow-50',
    },
    {
      id: 'z4',
      name: 'Z4',
      percent: '90–100%',
      range: validAge.value ? `${Math.round(maxHR.value * 0.9)}–${maxHR.value}` : '-',
      desc: 'VO₂max зона',
      rowClass: 'bg-orange-50',
    },
    {
      id: 'z5',
      name: 'Z5',
      percent: '> 100%',
      range: validAge.value ? `> ${maxHR.value}` : '-',
      desc: 'Анаэробная, интервальная работа',
      rowClass: 'bg-red-50',
    },
  ]
})

const steps = ref([
  { id: 1, speed: '', hr: '', lactate: '' },
])

function addStep() {
  steps.value.push({ id: Date.now() + Math.random(), speed: '', hr: '', lactate: '' })
}

function removeStep(idx) {
  if (steps.value.length > 1) steps.value.splice(idx, 1)
}

const chartTabs = [
  { value: 'speed-lactate', label: 'Скорость–Лактат' },
  { value: 'hr-lactate', label: 'Пульс–Лактат' },
]
const activeChartTab = ref('speed-lactate')

const stepsForChart = computed(() => steps.value.filter(s => s.speed && s.lactate && s.hr))

const chartData = computed(() => {
  if (activeChartTab.value === 'speed-lactate') {
    return {
      labels: stepsForChart.value.map(s => s.speed),
      datasets: [
        {
          label: 'Лактат (ммоль/л)',
          data: stepsForChart.value.map(s => s.lactate),
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f655',
          tension: 0.3,
          pointRadius: 5,
          fill: false,
        },
      ],
    }
  } else {
    return {
      labels: stepsForChart.value.map(s => s.hr),
      datasets: [
        {
          label: 'Лактат (ммоль/л)',
          data: stepsForChart.value.map(s => s.lactate),
          borderColor: '#10b981',
          backgroundColor: '#10b98155',
          tension: 0.3,
          pointRadius: 5,
          fill: false,
        },
      ],
    }
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
    x: {
      title: {
        display: true,
        text: activeChartTab.value === 'speed-lactate' ? 'Скорость (км/ч)' : 'Пульс (уд/мин)',
      },
      grid: { color: '#f3f4f6' },
    },
    y: {
      title: { display: true, text: 'Лактат (ммоль/л)' },
      min: 0,
      max: 20,
      grid: { color: '#f3f4f6' },
    },
  },
}))

const panoResult = computed(() => {
  const arr = stepsForChart.value.slice().sort((a, b) => a.lactate - b.lactate)
  for (let i = 1; i < arr.length; i++) {
    const l1 = arr[i - 1].lactate
    const l2 = arr[i].lactate
    if ((l1 < 4 && l2 >= 4) || (l1 > 4 && l2 <= 4)) {
      const v1 = arr[i - 1].speed
      const v2 = arr[i].speed
      const hr1 = arr[i - 1].hr
      const hr2 = arr[i].hr
      const speed = v1 + (4 - l1) * (v2 - v1) / (l2 - l1)
      const hr = hr1 + (4 - l1) * (hr2 - hr1) / (l2 - l1)
      return { speed, hr }
    }
  }
  return null
})

const vo2maxResult = computed(() => {
  if (!validWeight.value || stepsForChart.value.length === 0) return null
  const last = stepsForChart.value[stepsForChart.value.length - 1]
  if (!last.speed) return null
  return 3.5 * last.speed / weight.value
})

function interpolateLactate(target) {
  const arr = stepsForChart.value.slice().sort((a, b) => a.lactate - b.lactate)
  for (let i = 1; i < arr.length; i++) {
    const l1 = arr[i - 1].lactate
    const l2 = arr[i].lactate
    if ((l1 < target && l2 >= target) || (l1 > target && l2 <= target)) {
      const v1 = arr[i - 1].speed
      const v2 = arr[i].speed
      const hr1 = arr[i - 1].hr
      const hr2 = arr[i].hr
      const speed = v1 + (target - l1) * (v2 - v1) / (l2 - l1)
      const hr = hr1 + (target - l1) * (hr2 - hr1) / (l2 - l1)
      return {
        speed: speed.toFixed(2),
        hr: Math.round(hr),
      }
    }
  }
  return null
}

const lactateZones = computed(() => {
  if (stepsForChart.value.length < 2) return []
  const z2 = interpolateLactate(2)
  const z3 = interpolateLactate(3)
  const z4 = interpolateLactate(4)
  const z6 = interpolateLactate(6)
  return [
    {
      id: 'z1',
      name: 'Z1',
      lactate: '< 2',
      speed: z2 ? `< ${z2.speed}` : '-',
      hr: z2 ? `< ${z2.hr}` : '-',
      desc: 'Восстановление',
      rowClass: 'bg-green-50',
    },
    {
      id: 'z2',
      name: 'Z2',
      lactate: '2–3',
      speed: z2 && z3 ? `${z2.speed}–${z3.speed}` : '-',
      hr: z2 && z3 ? `${z2.hr}–${z3.hr}` : '-',
      desc: 'Аэробная база',
      rowClass: 'bg-blue-50',
    },
    {
      id: 'z3',
      name: 'Z3',
      lactate: '3–4',
      speed: z3 && z4 ? `${z3.speed}–${z4.speed}` : '-',
      hr: z3 && z4 ? `${z3.hr}–${z4.hr}` : '-',
      desc: 'Подпороговая',
      rowClass: 'bg-yellow-50',
    },
    {
      id: 'z4',
      name: 'Z4',
      lactate: '~4',
      speed: z4 ? `${z4.speed}` : '-',
      hr: z4 ? `${z4.hr}` : '-',
      desc: 'Пороговая (ПАНО)',
      rowClass: 'bg-yellow-100',
    },
    {
      id: 'z5',
      name: 'Z5',
      lactate: '4–6',
      speed: z4 && z6 ? `${z4.speed}–${z6.speed}` : '-',
      hr: z4 && z6 ? `${z4.hr}–${z6.hr}` : '-',
      desc: 'Надпороговая',
      rowClass: 'bg-orange-50',
    },
    {
      id: 'z6',
      name: 'Z6',
      lactate: '> 6',
      speed: z6 ? `> ${z6.speed}` : '-',
      hr: z6 ? `> ${z6.hr}` : '-',
      desc: 'Максимальная',
      rowClass: 'bg-red-50',
    },
  ]
})
</script> 