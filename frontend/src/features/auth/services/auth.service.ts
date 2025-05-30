import { request } from '../../../utils/remote/axios'
import { requestMethods } from '../../../utils/enum/request-methods'

interface LoginCredentials {
  email: string
  password: string
}

export default {
  async login(credentials: LoginCredentials): Promise<any> {
    try {
      const res = await request({
        method: requestMethods.POST,
        route: '/auth/login',
        body: credentials,
      })

      if ('error' in res) {
        throw new Error(res.message)
      }

      return res
    } catch (error: any) {
      throw new Error(error.message || 'Login failed')
    }
  },

  async resetPassword(email: string): Promise<any> {
    try {
      const res = await request({
        method: requestMethods.POST,
        route: '/auth/reset-password',
        body: { email },
      })

      if ('error' in res) {
        throw new Error(res.message)
      }

      return res
    } catch (error: any) {
      throw new Error(error.message || 'Reset password failed')
    }
  },
}
