import { ref } from 'vue';
import { useAuthStore } from '../store/auth.store';

interface Credentials {
  identifier: string;
  password: string;
}

export function useAuth() {
  const authStore = useAuthStore();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (credentials: Credentials): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await authStore.login(credentials);
    } catch (e: any) {
      error.value = e.message || 'Login failed';
    } finally {
      loading.value = false;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    if (!email) return;
    await authStore.resetPassword(email);
  };

  return { loading, error, login, resetPassword };
}
