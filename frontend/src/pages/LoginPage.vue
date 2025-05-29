<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '../components/LoginForm.vue'

export default defineComponent({
  name: 'LoginPage',
  components: { LoginForm }
})
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
