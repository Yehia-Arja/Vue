<template>
    <div class="login-wrapper">
      <div class="container">
        <div class="logo">
          <img src="../assets/logo.png" alt="SE Factory Logo" />
        </div>
  
        <div class="content">
          <div class="image-panel"></div>
  
          <div class="login-form">
            <div class="form-header">
              <h1 class="welcome-text">Welcome Back</h1>
              <p class="sub-text">Please enter your login details to continue.</p>
            </div>
  
            <form @submit.prevent="handleSubmit">
              <div class="input-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  type="email"
                  v-model="credentials.identifier"
                  placeholder="example@email.com"
                  required
                />
              </div>
  
              <div class="input-group">
                <label for="password">Password</label>
                <input
                  id="password"
                  type="password"
                  v-model="credentials.password"
                  placeholder="**********"
                  required
                />
              </div>
  
              <div class="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
  
              <button type="submit" :disabled="loading" class="login-btn">
                <span v-if="!loading">LOG IN</span>
                <span v-else>Logging in...</span>
              </button>
  
              <div class="signup-link">
                Don't have an account?
                <a href="#" @click.prevent="signUp">Sign up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import { useAuthStore } from '../store/auth.store'
  
  const authStore = useAuthStore()
  
  const credentials = reactive({
    identifier: '',
    password: ''
  })
  
  const handleSubmit = async () => {
    try {
      await authStore.login(credentials)
    } catch (error) {
      console.error('Login failed', error)
    }
  }
  
  const signUp = () => {
    console.log('Navigate to sign up page')
  }
  
  const loading = authStore.loading
  </script>
  
  <style scoped>
  /* styles same as before */
  .login-wrapper {
    min-height: 100vh;
    background-color: #fefefe;
    display: flex;
    justify-content: center;
  }
  
  .container {
    margin-top: 70px;
    width: 100%;
    max-width: 1120px;
    padding: 0 48px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .logo img {
    height: 50px;
    user-select: none;
    margin-bottom: 30px;
  }
  
  .content {
    display: flex;
    gap: 24px;
  }
  
  .image-panel,
  .login-form {
    width: 500px;
    height: 580px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }
  
  .image-panel {
    background: linear-gradient(rgba(40, 238, 176, 0.7), rgba(40, 238, 176, 0.7)),
      url("../assets/office1.jpg");
    background-size: cover;
    background-position: center;
  }
  
  .login-form {
    background: white;
    padding: 40px;
    border: 1px solid #eaeaea;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .form-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .welcome-text {
    font-size: 32px;
    font-weight: 800;
    color: #28eeb0;
    margin-bottom: 5px;
  }
  
  .sub-text {
    font-size: 14px;
    color: #555;
    margin: 0;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  label {
    font-size: 14px;
    font-weight: 500;
    color: #444;
    display: block;
    margin-bottom: 8px;
  }
  
  input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    transition: border 0.3s ease;
  }
  
  input:focus {
    border-color: #28eeb0;
    outline: none;
    box-shadow: 0 0 0 2px rgba(40, 238, 176, 0.2);
  }
  
  .forgot-password {
    text-align: right;
    margin-bottom: 25px;
  }
  
  .forgot-password a {
    font-size: 13px;
    color: #28eeb0;
    text-decoration: none;
  }
  
  .login-btn {
    width: 100%;
    padding: 14px;
    background-color: #28eeb0;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 25px;
  }
  
  .login-btn:hover:not(:disabled) {
    background-color: #20c79a;
  }
  
  .login-btn:disabled {
    background-color: #9ef1d6;
    cursor: not-allowed;
  }
  
  .signup-link {
    font-size: 14px;
    color: #666;
    text-align: center;
  }
  
  .signup-link a {
    color: #28eeb0;
    font-weight: 600;
    text-decoration: none;
    margin-left: 5px;
  }
  
  .signup-link a:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 1280px) {
    .container {
      padding: 0 64px;
    }
  }
  
  @media (max-width: 1024px) {
    .container {
      padding: 0 40px;
    }
  }
  
  @media (max-width: 900px) {
    .content {
      flex-direction: column;
    }
  
    .image-panel {
      display: none;
    }
  
    .login-form {
      width: 100%;
      height: auto;
      padding: 30px;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 0 20px;
      margin-top: 30px;
    }
  
    .logo img {
      height: 40px;
    }
  
    .login-form {
      padding: 20px;
    }
  
    .welcome-text {
      font-size: 26px;
    }
  }
  </style>
  