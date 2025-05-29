import { defineStore } from 'pinia'
import authApi from '../api/auth.api'

interface User {
  username: string
  email: string
}

interface Credentials {
  identifier: string
  password: string
}

interface LoginResponse {
  token: string
  user: User
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

        // Save token
        localStorage.setItem('token', response.token)

        // Set user
        this.user = {
          username: response.user.username,
          email: response.user.email
        }

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
    }
  }
})
