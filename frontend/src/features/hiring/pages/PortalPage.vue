<template>
    <div class="portal">
      <div class="header-row">
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
  
  <script setup lang="ts">
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  
  .header-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
    width: 100%;
    max-width: 100%;
  }
  
  .header-row select {
    width: 140px;
    padding: 6px 10px;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  
  .grid {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    width: 100%;
  }
  
  .error-message {
    text-align: center;
    margin-top: 50px;
    font-weight: 600;
    color: #c53030;
    font-size: 18px;
  }
  
  /* Responsive tweaks */
  @media (max-width: 600px) {
    .portal {
      padding: 16px 12px;
    }
    .header-row select {
      width: 100px;
      font-size: 13px;
    }
    .grid {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
    }
  }
  </style>
  