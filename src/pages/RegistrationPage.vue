<template>
  <div class="container-reg">
    <button
        class="btn-close"
        @click="changeShowForm">
      <img src="../assets/images/close.svg" />
    </button>
    <form @submit.prevent="registrationStore.handleSubmit" class="container">
      <h2>Регистрация</h2>
      <div class="input-container">
        <div class="input-field">
          <label for="email">
            Email
          </label>
          <input
              v-model="registrationStore.formData.email"
              name="email"
              type="email"
              placeholder="Введите Email"
              @blur="registrationStore.validateEmail"/>
          <span
              v-show="registrationStore.errors.email"
              class="error">
            {{registrationStore.errors.email}}
          </span>
        </div>
        <div class="input-field">
          <label for="password">
            Пароль
          </label>
          <input
              v-model="registrationStore.formData.password"
              name="password"
              type="password"
              placeholder="Введите пароль"
              @blur="registrationStore.validatePassword"/>
          <span
              v-show="registrationStore.errors.password"
              class="error">
            {{registrationStore.errors.password}}
          </span>
        </div>
        <div class="input-field">
          <label for="passTwo">
            Пароль еще раз
          </label>
          <input
              v-model="registrationStore.formData.confirmPassword"
              name="passTwo"
              type="password"
              placeholder="Повторите пароль"
              @blur="registrationStore.validateConfirmPassword"/>
          <span
              v-show="registrationStore.errors.confirmPassword"
              class="error">
            {{registrationStore.errors.confirmPassword}}
          </span>
        </div>
      </div>
      <div class="link-container">
        <div class="link">
          <p>У вас есть аккаунт?</p>
          <a href="#">Войдите</a>
        </div>
        <button
            type="submit"
            :class="isDisabled"
            :disabled="!isFormValid">
          Зарегистрироваться
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useRegistrationStore} from "../store/registration.ts";

const registrationStore = useRegistrationStore();
const emits = defineEmits([
    "closeForm"
]);
const changeShowForm = () => {
  emits("closeForm");
}

const isFormValid = computed(() => {
  const isAllFieldsValid =
      registrationStore.formData.email?.trim() !== "" &&
      registrationStore.formData.password?.trim() !== "" &&
      registrationStore.formData.confirmPassword?.trim() !== "";

  const hasNoErrors = Object.values(registrationStore.errors).every(
      error => error === undefined
  );

  return isAllFieldsValid && hasNoErrors;
});

const isDisabled = computed(() => {
  return !isFormValid.value && "btn-disabled";
});
</script>