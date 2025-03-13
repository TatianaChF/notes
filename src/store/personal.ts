import {defineStore} from "pinia";
import {reactive} from "vue";

interface PersonalData {
    token?: string;
    email?: string;
}

export const usePersonalStore = defineStore('personalData', () => {
    let personalData = reactive<PersonalData>({
        email: "",
    });
    const personalLocalStorage = localStorage.getItem("personal");

    if (personalLocalStorage) {
        personalData = JSON.parse(personalLocalStorage);
    }

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