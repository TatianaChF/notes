<template>
  {{authorizationStore.userData.email}}
<button class="btn-plus">
  <img
      src="../assets/images/plus.svg"
      alt="plus" />
</button>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {usePersonalStore} from "../store/personal.ts";
import {useAuthorizationStore} from "../store/authorization.ts";

const personalStore = usePersonalStore();
const authorizationStore = useAuthorizationStore();

onMounted(() => {
  personalStore.getNotes();
})

</script>