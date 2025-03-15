import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import type ApiResponse from "./registration.ts";

interface AuthorizationData {
    email: string;
    password: string;
}

interface AuthErrors {
    email?: string;
    password?: string;
    errorForm?: string
}

interface User {
    token: string;
    email: string;
}

export const useAuthorizationStore = defineStore('authorizationData', () => {
    const authorizationData: AuthorizationData = reactive<AuthorizationData>({
        email: "",
        password: ""
    });
    const errors: AuthErrors = reactive({});
    let userData = ref<User>({
        token: "",
        email: ""
    });
    let email = ref<string | undefined>(undefined);
    let userLocalStorage = localStorage.getItem("user");

    if (userLocalStorage) {
        userData.value = JSON.parse(userLocalStorage);
        email.value = JSON.parse(userLocalStorage).email;
    }

    const validateEmail = () => {
        if (!authorizationData.email) {
            errors.email = "Email обязателен для входа";
        } else errors.email = undefined;
    };

    const validatePassword = () => {
        if (!authorizationData.password) {
            errors.password = "Пароль обязателен для входа";
        } else errors.password = undefined;
    };

    const resetForm = () => {
        authorizationData.email = "";
        authorizationData.password = "";

        Object.keys(errors).forEach(key => {
            errors[key as keyof AuthErrors] = undefined;
        });
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
            validateEmail();
            validatePassword();

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
                localStorage.setItem("user", JSON.stringify(userData.value));
                resetForm();
            } else {
                console.log(data.message);
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
            userData.value.email = "";
            email.value = "";
            userData.value.token = "";
            localStorage.setItem("user", JSON.stringify(userData.value));
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return {authorizationData, errors, userData,
        validateEmail, validatePassword, handleSubmit,
        logout, getUser, email}
})