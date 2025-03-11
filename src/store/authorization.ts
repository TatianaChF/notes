import {defineStore} from "pinia";
import {reactive} from "vue";

interface AuthorizationData {
    email: string;
    password: string;
}

interface AuthErrors {
    email?: string;
    password?: string;
}

export const useAuthorizationStore = defineStore('authorizationData', () => {
    const authorizationData: AuthorizationData = reactive<AuthorizationData>({
        email: "",
        password: ""
    });
    const errors: AuthErrors = reactive({});

    return {authorizationData, errors}
})