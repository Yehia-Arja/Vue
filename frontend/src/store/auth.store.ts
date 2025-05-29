import { defineStore } from 'pinia'
import authApi from '../api/auth.api'

interface User {
  [key: string]: any;
}

interface Credentials {
  identifier: string;
  password: string;
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
        this.loading = true;
        this.error = null;

        const userData = await authApi.login(credentials);
        this.user = userData;

        console.log('Login successful', userData);
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async resetPassword(email: string): Promise<any> {
      try {
        this.loading = true;
        this.error = null;

        const response = await authApi.resetPassword(email);
        console.log('Password reset email sent', response);
        return response;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
})
