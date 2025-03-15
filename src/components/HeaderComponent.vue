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
          @click="logoutUser">
        Выйти
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useAuthorizationStore} from "../store/authorization.ts";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const isOpenLogout = ref<boolean>(false);
const authorizationStore = useAuthorizationStore();
const {email} = storeToRefs(authorizationStore);
const router = useRouter();
const emits = defineEmits([
  "showForm"
]);

onMounted(() => {
  authorizationStore.getUser();
})

const changeShowForm = () => {
  emits("showForm");
}
const logoutUser = () => {
  authorizationStore.logout();
  isOpenLogout.value = false;
  router.push({name: "Main"});
}
</script>