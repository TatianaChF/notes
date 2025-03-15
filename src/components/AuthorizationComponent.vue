<template>
  <div class="container-reg">
    <button
        class="btn-close"
        @click="changeShowForm">
      <img src="../assets/images/close.svg" />
    </button>
    <form
        @submit.prevent="handleSubmit"
        class="container">
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
              placeholder="Введите Email"/>
        </div>
        <div class="input-field">
          <label for="password">
            Пароль
          </label>
          <input
              v-model="authorizationStore.authorizationData.password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Введите пароль"/>
          <button
              v-if="showPassword"
              class="toggle-pass"
              @click="showPassword = !showPassword">
            <img src="../assets/images/openPass.svg" alt="openEye" />
          </button>
          <button
              v-else
              class="toggle-pass"
              @click="showPassword = !showPassword">
            <img src="../assets/images/closePas.svg" alt="closeEye" />
          </button>
        </div>
      </div>
      <div class="link-container">
        <div class="link">
          <p>У вас нет аккаунта?</p>
          <a
              href="#"
              @click="emits('changeForm')">
            Зарегистрируйтесь
          </a>
        </div>
        <button type="submit">
          Войти
        </button>
      </div>
      <span
          v-show="authorizationStore.errors"
          class="error-form">
        {{authorizationStore.errors}}
      </span>
    </form>
  </div>
</template>

<script lang='ts' setup>
import {useAuthorizationStore} from "../store/authorization.ts";
import {useRouter} from "vue-router";
import {ref} from "vue";

const showPassword = ref<boolean>(false);
const authorizationStore = useAuthorizationStore();
const router = useRouter();

const emits = defineEmits([
  "closeForm", "changeForm"
]);
const changeShowForm = () => {
  emits("closeForm");
}

const handleSubmit = async () => {
  try {
    await authorizationStore.handleSubmit();

    if(!authorizationStore.errors){
      emits("closeForm");
      await router.push({name: "PersonalAccount"});
    }
  } catch (error) {
    console.log(error);
  }
}
</script>