import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

interface LoginCredentials {
  identifier: string
  password: string
}

export default {
  async login(credentials: LoginCredentials): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials)
      if (response.status !== 200) {
        throw new Error('Login failed')
      }
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  },

  async resetPassword(email: string): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { email })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed')
    }
  }
}
