<template>
  <main>
    <div class="main-content">
      <div>
        <h1>Мои заметки</h1>
        <h3>Не забывай о важном, храни его в облаке.</h3>
      </div>
      <img
          src="../assets/images/main_image.svg"
          alt="main image"
          class="main-image" />
    </div>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
.main-content {
  display: flex;
  align-items: center;
}

h1 {
  color: #ffffff;
  font-size: 104px;
  font-weight: bold;
}

h3 {
  color: #9DA5AF;
  font-size: 32px;
  line-height: 48px;
  font-weight: bold;
}

.main-image {
  width: 60%;
}
</style>