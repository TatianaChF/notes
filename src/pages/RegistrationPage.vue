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

<style scoped>
.btn-close {
  border-radius: 32px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -650px;
  margin-top: -50px;
}

.container-reg {
  position: absolute;
  top: 10%;
  left: 20%;
  width: 780px;
  height: 740px;
  background-color: #1B2F46;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 20px;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h2 {
  color: #ffffff;
  font-size: 48px;
}

label, p {
  font-size: 18px;
  color: #ffffff;
}

input {
  width: 678px;
  height: 72px;
  border-radius: 36px;
  border: none;
  padding: 0 16px;
}

a {
  font-size: 18px;
  color: #B1C909;
  font-weight: 700;
  text-decoration: none;
}

button,
.btn-disabled {
  padding: 10px 24px;
  border-radius: 32px;
  border: none;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}

button {
  background-color: #B1C909;
}

.btn-disabled {
  background-color: #9DA5AF;
  cursor: auto;
}

.link-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.link {
  display: flex;
  align-items: center;
  gap: 10px;
}

.error {
  color: #FF7461;
  font-size: 18px;
}
</style>