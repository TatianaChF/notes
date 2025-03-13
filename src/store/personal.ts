import {defineStore} from "pinia";
import {reactive} from "vue";

interface PersonalData {
    id?: number;
    email: string;
    notes: Array<string>;
}

export const usePersonalStore = defineStore('personalData', () => {
    const personalData = reactive<PersonalData>({
        email: "",
        notes: []
    })

    const getNotes = async () => {
        try {
            const response = await fetch("https://dist.nd.ru/api/notes", {
                method: "GET"
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return {personalData, getNotes}
})