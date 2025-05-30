import { computed } from 'vue'
import { useStudentStore } from '../store/student.store'

export function useStudents() {
  const store = useStudentStore()

  const students = computed(() => store.students)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error) 

  const loadStudents = (filter = '') => {
    store.loadStudents(filter)
  }

  return { students, loading, loadStudents, error }
}
