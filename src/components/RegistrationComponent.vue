<template>
  <div class="container-reg">
    <button
        class="btn-close"
        @click="emits('closeForm')">
      <img src="../assets/images/close.svg" alt="close" />
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
              :type="showPassword ? 'text' : 'password'"
              placeholder="Введите пароль"
              @blur="registrationStore.validatePassword"/>
          <button
              v-if="showPassword"
              class="toggle-pass-reg"
              @click="showPassword = !showPassword">
            <img src="../assets/images/openPass.svg" alt="openEye" />
          </button>
          <button
              v-else
              class="toggle-pass-reg"
              @click="showPassword = !showPassword">
            <img src="../assets/images/closePas.svg" alt="closeEye" />
          </button>
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
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Повторите пароль"
              @blur="registrationStore.validateConfirmPassword"/>
          <button
              v-if="showConfirmPassword"
              class="toggle-pass-conf"
              @click="showConfirmPassword = !showConfirmPassword">
            <img src="../assets/images/openPass.svg" alt="openEye" />
          </button>
          <button
              v-else
              class="toggle-pass-conf"
              @click="showConfirmPassword = !showConfirmPassword">
            <img src="../assets/images/closePas.svg" alt="closeEye" />
          </button>
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
          <a
              href="#"
              @click="emits('changeForm')">
            Войдите
          </a>
        </div>
        <button
            type="submit"
            :class="isDisabled"
            :disabled="!isFormValid">
          Зарегистрироваться
        </button>
      </div>
      <p v-show="message">{{message}}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useRegistrationStore} from "../store/registration.ts";
import {storeToRefs} from "pinia";

const showPassword = ref<boolean>(false);
const showConfirmPassword = ref<boolean>(false);
const registrationStore = useRegistrationStore();
const emits = defineEmits([
    "closeForm", "changeForm"
]);
const {message} = storeToRefs(registrationStore);

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