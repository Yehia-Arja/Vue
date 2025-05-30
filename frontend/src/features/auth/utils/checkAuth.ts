import { request } from '../../../utils/remote/axios'
import { requestMethods } from '../../../utils/enum/request-methods'

export const checkAuth = async (): Promise<boolean> => {
  try {
    const res = await request({
      method: requestMethods.GET,
      route: '/auth/verify-token',
    })
    return res?.success === true
  } catch {
    return false
  }
}
