<template>
  <div>
    <h2>Регистрация</h2>
    <div>
      <label for="email">Email</label>
      <input name="email" type="email" />
      <label for="password">Пароль</label>
      <input name="password" type="password" />
      <label for="passTwo">Пароль еще раз</label>
      <input name="passTwo" type="password" />
    </div>
    <div>
      <div>
        <p>У вас есть аккаунт?</p>
        <a href="#">Войдите</a>
      </div>
      <button>Зарегистрироваться</button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>