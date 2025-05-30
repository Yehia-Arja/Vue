import { computed } from 'vue'
import { useAuthStore } from '../store/auth.store'

export function useAuth() {
  const authStore = useAuthStore()

  return {
    user: computed(() => authStore.user),
    loading: computed(() => authStore.loading),
    error: computed(() => authStore.error),
    login: authStore.login,
    logout: authStore.logout,
    resetPassword: authStore.resetPassword,
    loadUserFromToken: authStore.loadUserFromToken,
  }
}
