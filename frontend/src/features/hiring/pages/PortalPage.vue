<template>
    <div class="portal">
      <div class="filter">
        <select v-model="selectedFilter" @change="fetch">
          <option value="">All</option>
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>
  
      <div v-if="loading">Loading...</div>
  
      <div v-else-if="error" class="error-message">
        Couldn't get student cards. Try again later.
      </div>
  
      <div v-else class="grid">
        <StudentCard
          v-for="student in students"
          :key="student.id"
          :student="student"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useStudents } from '../composables/useStudents'
  import StudentCard from '../components/StudentCard.vue'
  
  const { students, loadStudents, loading, error } = useStudents()
  const selectedFilter = ref('')
  
  const fetch = () => {
    try {
      loadStudents(selectedFilter.value)
    } catch {
        console.error('Failed to fetch students:', error.value)
    }
  }
  
  onMounted(fetch)
  </script>
  
  <style scoped>
  .portal {
    padding: 24px;
  }
  
  .filter {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }
  
  select {
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 4px;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .error-message {
    text-align: center;
    margin-top: 50px;
    font-weight: 600;
    color: #c53030; /* red */
    font-size: 18px;
  }
  </style>
  