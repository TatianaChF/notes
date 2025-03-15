<template>
  <header class="header">
    <img src="../assets/images/logo.svg" alt="logo" />
    <div v-if="email != ''">
      <div
          class="user-container">
        <p>{{email}}</p>
        <button
            class="btn-user"
            @click="isOpenLogout = !isOpenLogout">
          <img
              src="../assets/images/user.svg"
              alt="user" />
        </button>
      </div>
      <div
          v-show="isOpenLogout"
          class="container-logout">
        <a href="#">Выйти</a>
      </div>
    </div>
    <button
        v-else
        class="login-btn"
        @click="changeShowForm">
        <img src="../assets/images/login.svg" alt="login" />
        Вход
    </button>
  </header>
</template>

<script setup lang="ts">
import {ref} from "vue";

const user = localStorage.getItem("user");
const email = ref<string>("");
const isOpenLogout = ref<boolean>(false);

if (user) {
  email.value = JSON.parse(user).email;
}

const emits = defineEmits([
    "showForm"
]);
const changeShowForm = () => {
  emits("showForm")
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