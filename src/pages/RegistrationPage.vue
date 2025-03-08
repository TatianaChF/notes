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
              placeholder="Введите Email" />
          <span v-show="errors.email">{{errors.email}}</span>
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
          />
          <span v-show="errors.password">{{errors.password}}</span>
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
          />
          <span v-show="errors.confirmPassword">{{errors.confirmPassword}}</span>
        </div>
      </div>
      <div class="link-container">
        <div class="link">
          <p>У вас есть аккаунт?</p>
          <a href="#">Войдите</a>
        </div>
        <button type="submit" :disabled="!isFormValid">Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive} from "vue";

interface FormData {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface FormErrors {
  name?: string;
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

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = "Email обязателен";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Некорректный email";
  } else delete errors.email;
};

const validatePassword = () => {
  if (!formData.password) {
    errors.password = "Пароль обязателен";
  } else if (formData.password.length < 3) {
    errors.password = "Пароль должен содержать минимум 3 символа";
  } else delete errors.password;
};

const validateConfirmPassword = () => {
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Подтверждение пароля обязательно";
  } else if (formData.password != formData.confirmPassword) {
    errors.confirmPassword = "Пароли не совпадают";
  } else delete errors.confirmPassword;
};

const isFormValid = computed(() => {
  return Object.keys(errors).length === 0 &&
      formData.email &&
      formData.password &&
      formData.confirmPassword;
});

const handleSubmit = () => {
  validateEmail();
  validatePassword();
  validateConfirmPassword();

  if (isFormValid.value) {
    console.log(formData);
    Object.assign(formData, {
      email: "",
      password: "",
      confirmPassword: ""
    });
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

button {
  padding: 10px 24px;
  background-color: #B1C909;
  border-radius: 32px;
  border: none;
  font-size: 20px;
  color: #fff;
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
</style>