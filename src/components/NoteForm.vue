<template>
  <div class="container-reg">
    <button
        class="btn-close-note"
        @click="closeForm">
      <img src="../assets/images/close.svg" alt="close" />
    </button>
    <div class="container">
      <h2>Добавление заметки</h2>
      <div class="input-container">
        <div class="input-field">
          <label for="title">
            Название заметки
          </label>
          <input
              v-model="note.title"
              name="title"
              type="text"
              placeholder="Введите название"/>
        </div>
        <div class="input-field">
          <label for="text">
            Текст заметки
          </label>
          <textarea
              v-model="note.content"
              name="text"
              placeholder="Введите текст" />
        </div>
      </div>
      <div class="btn-note">
        <button
            type="submit"
            @click="addNote(note)">
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {type Note, usePersonalStore} from "../store/personal.ts";
import {ref} from "vue";

const note = ref({
  title: "",
  content: ""
});
const emits = defineEmits(["closeForm"]);
const personalStore = usePersonalStore();

const closeForm = () => {
  emits("closeForm");
}

const addNote = (note: Note) => {
  personalStore.addNote(note);
  emits("closeForm");
}
</script>