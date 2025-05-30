<template>
  <div class="card" @click="handleClick">
    <img :src="student.coverImage" alt="Cover" class="cover" />
    <div class="info">
      <h2 class="app-name">{{ student.appName }}</h2>
      <div class="spacer"></div>
      <p class="student-name">By {{ student.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Student } from '../store/student.store'

defineProps<{ student: Student }>()

const handleClick = () => {
  // Placeholder
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 420px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.cover {
  width: 100%;
  height: 320px;
  object-fit: cover;
  background-color: #f0f0f0;
  display: block;
}

.info {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.app-name {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #2c3e50;
}

.spacer {
  flex-grow: 1;
}

.student-name {
  text-align: right;
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}
</style>
