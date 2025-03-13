import {defineStore} from "pinia";
import {reactive} from "vue";

interface Note {
    title?: string;
    content?: string;
}

export const usePersonalStore = defineStore('personalData', () => {
    let notes: Array<Note> = reactive([]);

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
                    Authorization: `Bearer ${token}`,
                }
            });

            notes = await response.json();
            console.log(response.json());
        } catch (error) {
            console.error(error);
        }
    }

    return {getNotes, notes}
})