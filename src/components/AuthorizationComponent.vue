<template>
  <div class="container-reg">
    <button
        class="btn-close"
        @click="changeShowForm">
      <img src="../assets/images/close.svg" />
    </button>
    <form @submit.prevent="authorizationStore.handleSubmit" class="container">
      <h2>Вход в ваш аккаунт</h2>
      <div class="input-container">
        <div class="input-field">
          <label for="email">
            Email
          </label>
          <input
              v-model="authorizationStore.authorizationData.email"
              name="email"
              type="email"
              placeholder="Введите Email"
              @blur="authorizationStore.validateEmail" />
          <span
              v-show="authorizationStore.errors.email"
              class="error">
            {{authorizationStore.errors.email}}
          </span>
        </div>
        <div class="input-field">
          <label for="password">
            Пароль
          </label>
          <input
              v-model="authorizationStore.authorizationData.password"
              name="password"
              type="password"
              placeholder="Введите пароль"
              @blur="authorizationStore.validatePassword" />
          <span
              v-show="authorizationStore.errors.password"
              class="error">
            {{authorizationStore.errors.password}}
          </span>
        </div>
      </div>
      <div class="link-container">
        <div class="link">
          <p>У вас нет аккаунта?</p>
          <a href="#">Зарегистрируйтесь</a>
        </div>
        <button type="submit">
          Зарегистрироваться
        </button>
      </div>
    </form>
  </div>
</template>

<script lang='ts' setup>
import {useAuthorizationStore} from "../store/authorization.ts";

const authorizationStore = useAuthorizationStore();
const emits = defineEmits([
  "closeForm"
]);

const changeShowForm = () => {
  emits("closeForm");
}
</script>