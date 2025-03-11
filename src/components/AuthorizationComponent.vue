<template>
  <div class="container-reg">
    <button class="btn-close">
      <img src="../assets/images/close.svg" />
    </button>
    <div class="container">
      <h2>Вход в ваш аккаунт</h2>
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
              placeholder="Введите пароль" />
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
    </div>
  </div>
</template>

<script lang='ts' setup></script>