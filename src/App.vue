<template>
  <div class="app">
    <header-component @show-form="isOpenForm = true" />
    <router-view v-slot="{ Component }">
      <component :is="Component" :class="{'darkened': isOpenForm}" />
    </router-view>
    <authorization-component
        v-show="isOpenForm"
        @close-form="isOpenForm = false"
        @change-form="changeForm"/>
    <registration-component
        v-show="isOpenRegistration"
        @close-form="isOpenRegistration = false"
        @change-form="changeForm" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from "./components/HeaderComponent.vue";
import {ref} from "vue";
import AuthorizationComponent from "./components/AuthorizationComponent.vue";
import RegistrationComponent from "./components/RegistrationComponent.vue";

const isOpenForm = ref<boolean>(false);
const isOpenRegistration = ref<boolean>(false);

const changeForm = () => {
  if (isOpenForm.value) {
    isOpenForm.value = false;
    isOpenRegistration.value = true;
  } else {
    isOpenRegistration.value = false;
    isOpenForm.value = true;
  }
}
</script>