import { defineStore } from 'pinia'
import authApi from '../api/auth.api'
import { decodeUserFromToken } from '../utils/jwt'
import type { User } from '../utils/jwt' 

interface Credentials {
  identifier: string
  password: string
}

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
      try {
        this.loading = true
        this.error = null

        const response: LoginResponse = await authApi.login(credentials)
        localStorage.setItem('token', response.token)

        this.user = decodeUserFromToken(response.token)
        console.log('Login successful', this.user)
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
      try {
        this.loading = true
        this.error = null

        await authApi.resetPassword(email)
        console.log('Password reset email sent')
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
