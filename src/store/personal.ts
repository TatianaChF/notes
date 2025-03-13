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

    return {personalData}
})