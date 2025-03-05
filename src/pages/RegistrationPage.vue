<template>
  <div class="container-reg">
    <button class="btn-close">
      <img src="../assets/images/close.svg" />
    </button>
    <div class="container">
      <h2>Регистрация</h2>
      <div class="input-container">
        <div class="input-field">
          <label for="email">
            Email
          </label>
          <input
              name="email"
              type="email"
              placeholder="Введите Email" />
        </div>
        <div class="input-field">
          <label for="password">
            Пароль
          </label>
          <input
              name="password"
              type="password"
              placeholder="Введите пароль"
          />
        </div>
        <div class="input-field">
          <label for="passTwo">
            Пароль еще раз
          </label>
          <input
              name="passTwo"
              type="password"
              placeholder="Повторите пароль"
          />
        </div>
      </div>
      <div class="link-container">
        <div class="link">
          <p>У вас есть аккаунт?</p>
          <a href="#">Войдите</a>
        </div>
        <button>Зарегистрироваться</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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