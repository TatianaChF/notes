import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import type ApiResponse from "./registration.ts";

interface AuthorizationData {
    email: string;
    password: string;
}

interface User {
    token: string;
    email: string | undefined;
}

export const useAuthorizationStore = defineStore('authorizationData', () => {
    const authorizationData: AuthorizationData = reactive<AuthorizationData>({
        email: "",
        password: ""
    });
    const errors = ref<string | undefined>(undefined);
    let userData = ref<User>({
        token: "",
        email: ""
    });
    let email = ref<string | undefined>();
    let userLocalStorage = localStorage.getItem("user");

    if (userLocalStorage) {
        userData.value = JSON.parse(userLocalStorage);
        email.value = JSON.parse(userLocalStorage).email;
    }

    const resetForm = () => {
        authorizationData.email = "";
        authorizationData.password = "";
        errors.value = undefined;
    }

    const getUser = async () => {
        try {
            let token : string = "";

            if (userLocalStorage) {
                token = JSON.parse(userLocalStorage).token;
            }

            const response = await fetch('https://dist.nd.ru/api/auth', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            const data = await response.json();
            userData.value.email = data.email;
            email.value = data.email;
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://dist.nd.ru/api/auth', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: authorizationData.email,
                    password: authorizationData.password,
                })
            });
            const data: ApiResponse = await response.json();

            if (data.accessToken) {
                userData.value.token = data.accessToken;
                userData.value.email = authorizationData.email;
                email.value = authorizationData.email;
                console.log(errors.value);
                localStorage.setItem("user", JSON.stringify(userData.value));
                resetForm();
            } else {
                if (typeof data.message === "object") {
                    errors.value = data.message[0];
                } else errors.value = data.message;

            }
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        try {
            let token : string = "";

            if (userLocalStorage) {
                token = JSON.parse(userLocalStorage).token;
            }

            const response = await fetch('https://dist.nd.ru/api/auth', {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            const data = await response.json();
            userData.value.email = undefined;
            email.value = undefined;
            userData.value.token = "";
            localStorage.removeItem("user");
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return {authorizationData, errors, userData,
        handleSubmit, logout, getUser,
        email}
})