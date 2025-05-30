import axios from 'axios'

axios.defaults.baseURL = "http://localhost:5000/api"

axios.defaults.headers.common['Content-Type'] = 'application/json'

interface RequestOptions {
  method: string
  route: string
  body?: any
}

export const request = async <T = any>({ method, route, body }: RequestOptions): Promise<T | { error: true; message: string }> => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    const response = await axios.request<T>({
      method,
      url: route,
      data: body,
    })

    return response.data
  } catch (error: any) {
    return {
      error: true,
      message: error.response?.data?.message || error.message || 'Unknown error'
    }
  }
}
