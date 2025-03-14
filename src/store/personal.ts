import {defineStore} from "pinia";
import {reactive} from "vue";

interface Note {
    title?: string;
    content?: string;
}

interface noteErrors {
    title?: string;
    content?: string;
}

export const usePersonalStore = defineStore('personalData', () => {
    let notes: Array<Note> = reactive([]);
    const errors = reactive<noteErrors>({});

    const getNotes = async () => {
        const user = localStorage.getItem("user");
        let token : string = "";

        if (user) {
            token = JSON.parse(user).token;
        }

        try {
            const response = await fetch("https://dist.nd.ru/api/notes", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const data = await response.json();

            console.log(data);

            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const newNote: Note = {
                        title: data[i].title,
                        content: data[i].content,
                    };
                    notes.push(newNote);
                }
            }
            console.log(notes);
        } catch (error) {
            console.error(error);
        }
    }

    const validateTitle = (note: Note) => {
        if (!note.title) {
            errors.title = "Название для заметки обязательно"
        } else if (note.title.length > 100) {
            errors.title = "Слишком большое название"
        } else errors.title = undefined;
    }

    const validateContent = (note: Note) => {
        if (!note.content) {
            errors.content = "Добавьте описание для заметки";
        } else if (note.content.length > 500) {
            errors.content = "Слишком большое описание"
        } else errors.content = undefined;
    }

    const addNote = async (note: Note) => {
        try {
            const user = localStorage.getItem("user");
            let token : string = "";

            if (user) {
                token = JSON.parse(user).token;
            }

            validateTitle(note);
            validateContent(note);

            if (errors.title === undefined && errors.content === undefined) {
                const response = await fetch("https://dist.nd.ru/api/notes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: note.title,
                        content: note.content,
                    })
                });
                const data = await response.json();
                console.log(data);
                notes.push(note);
                console.log(note);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {getNotes, addNote, notes}
})