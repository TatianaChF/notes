<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <header-component />
  <router-view />
</template>
