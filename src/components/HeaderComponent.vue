<template>
  <header class="header">
    <img src="../assets/images/logo.svg" alt="logo" />
    <button
        class="login-btn"
        @click="changeShowForm">
        <img src="../assets/images/login.svg" alt="login" />
        Вход
    </button>
  </header>
</template>

<script setup lang="ts">
const emits = defineEmits([
    "showForm"
]);

const changeShowForm = () => {
  emits("showForm", true)
}
</script>

<style scoped>
.header {
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
  cursor: pointer;
}
</style>