<template>
  <header class="header">
    <img src="../assets/images/logo.svg" alt="logo" />
    <div v-if="email != undefined">
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
    </div>
    <button
        v-else-if="email === undefined"
        class="login-btn"
        @click="changeShowForm">
        <img src="../assets/images/login.svg" alt="login" />
        Вход
    </button>
  </header>
  <div class="logout">
    <div
        v-show="isOpenLogout"
        class="container-logout">
      <a
          href="#"
          @click="authorizationStore.logout">
        Выйти
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useAuthorizationStore} from "../store/authorization.ts";
import {storeToRefs} from "pinia";

const user = localStorage.getItem("user");
const isOpenLogout = ref<boolean>(false);
const authorizationStore = useAuthorizationStore();
const {email} = storeToRefs(authorizationStore);
console.log(email.value);

onMounted(() => {
  authorizationStore.getUser();
})

if (user) {
  email.value = JSON.parse(user).email;
}

const emits = defineEmits([
    "showForm"
]);
const changeShowForm = () => {
  emits("showForm");
}
</script>