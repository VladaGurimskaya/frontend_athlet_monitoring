<template>
  <div>
    <h2 class="text-2xl mb-4 font-semibold">Список спортсменов</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div
          v-for="athlete in athletes"
          :key="athlete.code"
          @click="selectAthlete(athlete)"
          :class="[
          'p-4 rounded-lg shadow cursor-pointer transition',
          athlete.status === 'warning' ? 'bg-yellow-100' : '',
          athlete.status === 'critical' ? 'bg-red-100' : ''
        ]"
      >
        <div class="font-mono text-lg">{{ athlete.code }}</div>
        <div class="text-sm">Возраст: {{ athlete.age }}</div>
        <div class="text-sm">Вид спорта: {{ athlete.sport }}</div>
      </div>
    </div>

    <!-- Панель выбранного спортсмена -->
    <div v-if="selectedAthlete" class="bg-white rounded-lg p-6 shadow">
      <h3 class="text-xl font-semibold mb-2">Информация о спортсмене</h3>
      <div class="mb-2">Шифр: <span class="font-mono">{{ selectedAthlete.code }}</span></div>
      <div class="mb-2">Возраст: {{ selectedAthlete.age }}</div>
      <div class="mb-2">Вид спорта: {{ selectedAthlete.sport }}</div>
      <div class="mb-6">
        <button
            class="mb-2 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
            @click="showAssignmentModal = true"
        >
          Создать назначение
        </button>
        <!-- Модальное окно создания назначения -->
        <div v-if="showAssignmentModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div class="bg-white p-6 rounded shadow w-96">
            <textarea v-model="newAssignment" class="w-full border rounded p-2 mb-2" rows="3" placeholder="Введите назначение"></textarea>
            <div class="flex justify-end gap-2">
              <button @click="assign" class="bg-green-500 text-white px-3 py-1 rounded">Назначить</button>
              <button @click="showAssignmentModal = false" class="bg-gray-300 px-3 py-1 rounded">Отмена</button>
            </div>
          </div>
        </div>
      </div>
      <h4 class="font-semibold mt-4 mb-1">Назначения</h4>
      <ul>
        <li v-for="order in selectedAthlete.assignments" :key="order.id" class="mb-1">
          <div class="text-sm"><b>Дата:</b> {{ order.date }} <span :class="order.status === 'назначено' ? 'text-green-600' : 'text-gray-400'">({{ order.status }})</span></div>
          <div class="text-xs text-gray-700">Причина: {{ order.reason }}</div>
        </li>
      </ul>
      <h4 class="font-semibold mt-4 mb-1">Аналитика</h4>
      <!-- Аналитика как у тренера (можно добавить графики/таблицы, если есть данные) -->
      <div>
        <p class="text-gray-500">Аналитика спортсмена...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Демоданные, замени на реальные из API
const athletes = ref([
  { code: 'XJ92V', age: 23, sport: 'Лыжные гонки', status: 'warning', assignments: [
      { id: 1, date: '2025-05-20', reason: 'Перетренированность', status: 'назначено' },
      { id: 2, date: '2025-04-18', reason: 'Плановый осмотр', status: 'выполнено' }
    ]},
  { code: 'GQ47B', age: 19, sport: 'Легкая атлетика', status: 'critical', assignments: [
      { id: 3, date: '2025-05-12', reason: 'Травма голеностопа', status: 'назначено' }
    ]}
])

const selectedAthlete = ref(null)
const showAssignmentModal = ref(false)
const newAssignment = ref('')

function selectAthlete(athlete) {
  selectedAthlete.value = athlete
}

function assign() {
  if (newAssignment.value.trim()) {
    selectedAthlete.value.assignments.unshift({
      id: Date.now(),
      date: new Date().toISOString().slice(0,10),
      reason: newAssignment.value,
      status: 'назначено'
    })
    // Можно также обновить статус
    selectedAthlete.value.status = 'warning' // Или другое правило
    newAssignment.value = ''
    showAssignmentModal.value = false
  }
}
</script>