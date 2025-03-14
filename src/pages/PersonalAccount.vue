<template>
  {{authorizationStore.userData.email}}
  <div class="notes-container">
    <div
        v-for="note in personalStore.notes"
        :key="note.title"
        class="note">
      <h4>{{note.title}}</h4>
      <hr class="note-divider" />
      <p>{{note.content}}</p>
    </div>
  </div>
  <note-form
      v-show="isOpenForm"
      @close-form="isOpenForm = false"/>
<button
    class="btn-plus"
    @click="isOpenForm = true">
  <img
      src="../assets/images/plus.svg"
      alt="plus" />
</button>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {usePersonalStore} from "../store/personal.ts";
import {useAuthorizationStore} from "../store/authorization.ts";
import NoteForm from "../components/NoteForm.vue";

const personalStore = usePersonalStore();
const authorizationStore = useAuthorizationStore();
const isOpenForm = ref(false);

onMounted(() => {
  personalStore.getNotes();
})

</script>