import { defineStore } from 'pinia'
import { ApiClient, AuthApi } from '../api_athlet_monitoring/src'

const apiClient = new ApiClient()
apiClient.basePath = 'http://localhost:8000/api/v1'

apiClient.withCredentials = true // Включаем отправку куков с запросами
apiClient.enableCookies = true // Включаем поддержку куков в API клиенте

const authApi = new AuthApi(apiClient)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: !!localStorage.getItem('isAuthenticated'),
    role: localStorage.getItem('userRole'),
    loading: false,
    error: null
  }),

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const response = await new Promise((resolve, reject) => {
          authApi.authLoginPost({
            email,
            password
          }, (error, data, response) => {
            if (error) {
              reject(error)
            } else {
              resolve({ data, response })
            }
          })
        })
        
        const { data } = response
        
        this.role = data.role
        this.isAuthenticated = true
        
        localStorage.setItem('userRole', data.role)
        localStorage.setItem('isAuthenticated', 'true')

        return true
      } catch (error) {
        console.error('Login error:', error)
        this.error = error.message || 'Ошибка при входе'
        return false
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await new Promise((resolve, reject) => {
          authApi.authLogoutPost((error, data, response) => {
            if (error) {
              reject(error)
            } else {
              resolve({ data, response })
            }
          })
        })
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.user = null
        this.isAuthenticated = false
        this.role = null
        
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userRole')
      }
    },

    async checkAuth() {
      try {
        const { data } = await new Promise((resolve, reject) => {
          authApi.authMeGet((error, data, response) => {
            if (error) {
              reject(error)
            } else {
              resolve({ data, response })
            }
          })
        })
        
        this.user = data
        this.role = data.role
        this.isAuthenticated = true
        
        localStorage.setItem('userRole', data.role)
        localStorage.setItem('isAuthenticated', 'true')
      } catch (error) {
        console.error('Auth check error:', error)
        this.logout()
      }
    }
  },

  getters: {
    isAdmin: (state) => state.role === 'admin',
    isCoach: (state) => state.role === 'coach',
    isMedical: (state) => state.role === 'medical',
    isAthlete: (state) => state.role === 'athlete',
    userRole: (state) => state.role,
    getError: (state) => state.error,
    isLoading: (state) => state.loading
  }
}) 