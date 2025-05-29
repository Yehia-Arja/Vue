import { defineStore } from 'pinia'
import authApi from '../api/auth.api'
import { decodeUserFromToken } from '../utils/jwt'
import type { User } from '../utils/jwt'
import type { Credentials } from '../types/auth.types'

interface LoginResponse {
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async login(credentials: Credentials): Promise<void> {
      this.loading = true
      this.error = null
      try {
        const response: LoginResponse = await authApi.login(credentials)
        if (!response || !response.token) {
          throw new Error('Invalid login response')
        }
        localStorage.setItem('token', response.token)
        this.user = decodeUserFromToken(response.token)
      } catch (error: any) {
        this.error = error.message || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    logout(): void {
      this.user = null
      localStorage.removeItem('token')
    },

    async resetPassword(email: string): Promise<void> {
      this.loading = true
      this.error = null
      try {
        await authApi.resetPassword(email)
      } catch (error: any) {
        this.error = error.message || 'Reset failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    loadUserFromToken(): void {
      const token = localStorage.getItem('token')
      if (token) {
        const user = decodeUserFromToken(token)
        if (user) this.user = user
      }
    }
  }
})
