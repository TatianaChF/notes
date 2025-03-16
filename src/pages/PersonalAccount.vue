<template>
  <div class="notes-container">
    <article
        v-for="note in notes"
        :key="note.id"
        class="note">
      <h4>{{note.title}}</h4>
      <hr class="note-divider" />
      <p>{{note.content}}</p>
      <div
          class="note-delete"
          @click="personalStore.removeNote(note);">
        <img src="../assets/images/close.svg" alt="delete" />
        <p>Удалить</p>
      </div>
    </article>
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
import NoteForm from "../components/NoteForm.vue";
import {storeToRefs} from "pinia";

const personalStore = usePersonalStore();
const isOpenForm = ref(false);
const { notes } = storeToRefs(personalStore);

onMounted(() => {
  personalStore.getNotes();
})
</script>