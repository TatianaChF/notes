<template>
<button class="btn-plus">
  <img
      src="../assets/images/plus.svg"
      alt="plus" />
</button>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {usePersonalStore} from "../store/personal.ts";

const personalStore = usePersonalStore();

onMounted(() => {
  personalStore.getNotes();
})
</script>