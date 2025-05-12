<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-12 w-auto" src="../assets/logo_main.png" alt="VitalForSport" />
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <!-- Общие вкладки для всех пользователей -->
              <a
                href="#" 
                @click.prevent="activeTab = 'dashboard'"
                :class="[
                  activeTab === 'dashboard' ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                ]"
              >
                Главная
              </a>
              <!-- Вкладки только для администратора -->
              <a 
                v-if="authStore.isAdmin" 
                href="#" 
                @click.prevent="activeTab = 'invite'"
                :class="[
                  activeTab === 'invite' ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                ]"
              >
                Управление приглашениями
              </a>
              <a 
                v-if="authStore.isAdmin" 
                href="#" 
                @click.prevent="activeTab = 'organizations'"
                :class="[
                  activeTab === 'organizations' ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                ]"
              >
                Управление организациями
              </a>
              <!-- Вкладки для тренера -->
              <a 
                v-if="authStore.isCoach" 
                href="#" 
                @click.prevent="activeTab = 'teams'"
                :class="[
                  activeTab === 'teams' ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                ]"
              >
                Мои команды
              </a>
              <a 
                v-if="authStore.isCoach" 
                href="#" 
                @click.prevent="activeTab = 'athletes'"
                :class="[
                  activeTab === 'athletes' ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                ]"
              >
                Спортсмены
              </a>
              <a 
                v-if="authStore.isCoach" 
                href="#" 
                @click.prevent="activeTab = 'training-plans'"
                :class="[
                  activeTab === 'training-plans' ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                ]"
              >
                Планы тренировок
              </a>
              <a 
                v-if="authStore.isCoach" 
                href="#" 
                @click.prevent="activeTab = 'requests'"
                :class="[
                  activeTab === 'requests' ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                ]"
              >
                Заявки
              </a>
              <!-- Вкладки для медицинского персонала -->
              <a 
                v-if="authStore.isMedical" 
                href="#" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Медицинские записи
              </a>
              <!-- Вкладки для спортсмена -->
              <a
                v-if="authStore.isAthlete"
                href="#"
                @click.prevent="activeTab = 'biometrics'"
                :class="[
                  activeTab === 'biometrics' ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                ]"
              >
                Биометрические данные
              </a>
              <a
                v-if="authStore.isAthlete"
                href="#"
                @click.prevent="activeTab = 'profile'"
                :class="[
                  activeTab === 'profile' ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                ]"
              >
                Профиль
              </a>
            </div>
          </div>
          <div class="flex items-center">
            <div class="mr-4 text-sm text-gray-600">
              Роль: {{ userRoleText }}
            </div>
            <button
              @click="logout"
              class="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            {{ pageTitle }}
          </h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Содержимое в зависимости от выбранной вкладки -->
          <div v-if="activeTab === 'invite' && authStore.isAdmin" class="px-4 py-5 sm:px-0">
            <InviteUserForm />
          </div>
          <div v-else-if="activeTab === 'organizations' && authStore.isAdmin" class="px-4 py-5 sm:px-0">
            <OrganizationList />
          </div>
          <!-- Вкладки тренера -->
          <div v-else-if="activeTab === 'teams' && authStore.isCoach" class="px-4 py-5 sm:px-0">
            <CoachTeams />
          </div>
          <div v-else-if="activeTab === 'athletes' && authStore.isCoach" class="px-4 py-5 sm:px-0">
            <CoachAthletes />
          </div>
          <div v-else-if="activeTab === 'training-plans' && authStore.isCoach" class="px-4 py-5 sm:px-0">
            <CoachTrainingPlans />
          </div>
          <div v-else-if="activeTab === 'requests' && authStore.isCoach" class="px-4 py-5 sm:px-0">
            <CoachRequests />
          </div>
          <!-- Вкладки для спортсмена -->
          <div v-else-if="activeTab === 'biometrics' && authStore.isAthlete" class="px-4 py-5 sm:px-0">
            <AthleteBiometrics />
          </div>
          <div v-else-if="activeTab === 'profile' && authStore.isAthlete" class="px-4 py-5 sm:px-0">
            <AthleteProfile />
          </div>
          <div v-else class="px-4 py-8 sm:px-0">
            <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <p class="text-gray-500">Здесь будет {{ contentPlaceholder }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import InviteUserForm from '../components/admin/InviteUserForm.vue'
import CoachTeams from '../components/coach/CoachTeams.vue'
import CoachAthletes from '../components/coach/CoachAthletes.vue'
import CoachTrainingPlans from '../components/coach/CoachTrainingPlans.vue'
import CoachRequests from '../components/coach/CoachRequests.vue'
import AthleteBiometrics from '../components/athlete/AthleteBiometrics.vue'
import AthleteProfile from '../components/athlete/AthleteProfile.vue'
import OrganizationList from '../components/admin/OrganizationList.vue'

const router = useRouter()
const authStore = useAuthStore()
const activeTab = ref('dashboard')

const userRoleText = computed(() => {
  switch (authStore.role) {
    case 'admin': return 'Администратор'
    case 'coach': return 'Тренер'
    case 'medical': return 'Медицинский персонал'
    case 'athlete': return 'Спортсмен'
    default: return 'Пользователь'
  }
})

const pageTitle = computed(() => {
  if (activeTab.value === 'invite') {
    return 'Управление приглашениями'
  } else if (activeTab.value === 'organizations') {
    return 'Управление организациями'
  } else if (activeTab.value === 'teams') {
    return 'Управление командами'
  } else if (activeTab.value === 'athletes') {
    return 'Спортсмены'
  } else if (activeTab.value === 'training-plans') {
    return 'Планы тренировок'
  } else if (activeTab.value === 'requests') {
    return 'Заявки спортсменов'
  } else if (activeTab.value === 'biometrics') {
    return 'Биометрические данные'
  } else if (activeTab.value === 'profile') {
    return 'Профиль спортсмена'
  }
  return 'Панель управления'
})

const contentPlaceholder = computed(() => {
  if (authStore.isAdmin) {
    return 'основная информация администратора'
  } else if (authStore.isCoach) {
    return 'расписание и список спортсменов'
  } else if (authStore.isMedical) {
    return 'список пациентов и их медицинские данные'
  } else if (authStore.isAthlete) {
    return 'ваша программа тренировок и медицинские показатели'
  }
  return 'основной контент панели управления'
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script> 