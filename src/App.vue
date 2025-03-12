<template>
  <div class="app">
    <header-component @show-form="isOpenForm = true" />
    <router-view v-slot="{ Component }">
      <component :is="Component" :class="{'darkened': isOpenForm}" />
    </router-view>
    <authorization-component
        v-show="isOpenForm"
        @close-form="isOpenForm = false" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from "./components/HeaderComponent.vue";
import {ref} from "vue";
import AuthorizationComponent from "./components/AuthorizationComponent.vue";

const isOpenForm = ref<boolean>(false);
</script>