import {defineStore} from "pinia";
import {reactive} from "vue";
import type ApiResponse from "./registration.ts";

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

            if (data.id) {
                resetForm();
                console.log(data)
            } else {
                console.log(data)
                errors.email = data.message;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {authorizationData, errors, validateEmail, validatePassword, handleSubmit}
})