<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #fefefe;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
