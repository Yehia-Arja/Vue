import { request } from '../../../utils/remote/axios'
import { requestMethods } from '../../../utils/enum/request-methods'

export const fetchStudents = async (filter?: string) => {
  try {
    const route = filter ? `/students?type=${filter}` : '/students'
    const result = await request({ method: requestMethods.GET, route })

    if ('error' in result) {
      throw new Error(result.message)
    }

    return result
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch students')
  }
}
