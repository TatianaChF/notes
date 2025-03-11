<template>
  <header-component @show-form="isOpenForm = true" />
  <router-view v-slot="{ Component }">
    <component :is="Component" :class="{'darkened': isOpenForm}" />
  </router-view>/
  <registration-page
      v-show="isOpenForm"
      @close-form="isOpenForm = false" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from "./components/HeaderComponent.vue";
import {ref} from "vue";
import RegistrationPage from "./pages/RegistrationPage.vue";

const isOpenForm = ref<boolean>(false);
</script>

<style scoped>
.darkened {
  filter: brightness(0.5);
  transition: filter 0.3s;
}
</style>