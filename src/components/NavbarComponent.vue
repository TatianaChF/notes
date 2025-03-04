<template>
  <nav class="navbar">
    <img src="../assets/images/logo.svg" alt="logo" />
    <button class="login-btn">
        <img src="../assets/images/login.svg" alt="login" />
        Вход
    </button>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}

.login-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 144px;
  height: 56px;
  background-color: #B1C909;
  border-radius: 32px;
  border: none;
  font-size: 20px;
  color: #fff;
}
</style>