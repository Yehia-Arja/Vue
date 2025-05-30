import { defineStore } from 'pinia'
import { fetchStudents } from '../services/student.service'

export interface Student {
  id: number
  name: string
  appName: string
  coverImage: string
}

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [] as Student[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async loadStudents(filter?: string) {
      this.loading = true
      this.error = null
      try {
        const data = await fetchStudents(filter)
        if (!data || !Array.isArray(data)) {
            throw new Error('Invalid student data format')
        }
        this.students = data
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch students'
        this.students = []
      } finally {
        this.loading = false
      }
    }
  }
})
