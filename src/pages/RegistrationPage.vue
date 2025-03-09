<template>
  <div class="container-reg">
    <button class="btn-close">
      <img src="../assets/images/close.svg" />
    </button>
    <form @submit.prevent="handleSubmit" class="container">
      <h2>Регистрация</h2>
      <div class="input-container">
        <div class="input-field">
          <label for="email">
            Email
          </label>
          <input
              v-model="formData.email"
              name="email"
              type="email"
              placeholder="Введите Email"
              @blur="validateEmail"/>
          <span
              v-show="errors.email"
              class="error">
            {{errors.email}}
          </span>
        </div>
        <div class="input-field">
          <label for="password">
            Пароль
          </label>
          <input
              v-model="formData.password"
              name="password"
              type="password"
              placeholder="Введите пароль"
              @blur="validatePassword"/>
          <span
              v-show="errors.password"
              class="error">
            {{errors.password}}
          </span>
        </div>
        <div class="input-field">
          <label for="passTwo">
            Пароль еще раз
          </label>
          <input
              v-model="formData.confirmPassword"
              name="passTwo"
              type="password"
              placeholder="Повторите пароль"
              @blur="validateConfirmPassword"/>
          <span
              v-show="errors.confirmPassword"
              class="error">
            {{errors.confirmPassword}}
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
import {computed, reactive, ref} from "vue";

interface FormData {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const formData = reactive<FormData>({
  email: "",
  password: "",
  confirmPassword: ""
})

const errors = reactive<FormErrors>({});
const isValid = ref(false);

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = "Email обязателен";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Некорректный email";
  } else errors.email = undefined;
};

const validatePassword = () => {
  if (!formData.password) {
    errors.password = "Пароль обязателен";
  } else if (formData.password.length < 3) {
    errors.password = "Пароль должен содержать минимум 3 символа";
  } else errors.password = undefined;
};

const validateConfirmPassword = () => {
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Подтверждение пароля обязательно";
  } else if (formData.password != formData.confirmPassword) {
    errors.confirmPassword = "Пароли не совпадают";
  } else errors.confirmPassword = undefined;
};

const isFormValid = computed(() => {
  const isAllFieldsValid =
      formData.email?.trim() !== "" &&
      formData.password?.trim() !== "" &&
      formData.confirmPassword?.trim() !== "";

  const hasNoErrors = Object.values(errors).every(
      error => error === undefined
  );

  return isAllFieldsValid && hasNoErrors;
});

const isDisabled = computed(() => {
  return !isFormValid.value &&  "btn-disabled";
});

const resetForm = () => {
  validateEmail();
  validatePassword();
  validateConfirmPassword();

  formData.email = "";
  formData.password = "";
  formData.confirmPassword = "";

  Object.keys(errors).forEach(key => {
    errors[key as keyof FormErrors] = undefined;
  });
}

const handleSubmit = () => {
  if (isFormValid.value) {
    resetForm();
  }
};
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