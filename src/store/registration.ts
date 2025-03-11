import {defineStore} from "pinia";
import {reactive} from "vue";

interface FormData {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default interface ApiResponse {
    message?: string;
    error?: string;
    statusCode?: number;
    id?: number;
    email?: string;
}

export const useRegistrationStore = defineStore('registrationData', () => {
    const formData = reactive<FormData>({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const errors = reactive<FormErrors>({});

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            errors.email = "Email обязателен";
        } else if (!emailRegex.test(formData.email)) {
            errors.email = "Некорректный email";
        } else errors.email = undefined;
    };

    const validatePassword = () => {
        if (!formData.password) {
            errors.password = "Пароль обязателен";
        } else if (formData.password.length < 4) {
            errors.password = "Пароль должен содержать минимум 4 символа";
        } else errors.password = undefined;
    };

    const validateConfirmPassword = () => {
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Подтверждение пароля обязательно";
        } else if (formData.password != formData.confirmPassword) {
            errors.confirmPassword = "Пароли не совпадают";
        } else errors.confirmPassword = undefined;
    };

    const resetForm = () => {
        formData.email = "";
        formData.password = "";
        formData.confirmPassword = "";

        Object.keys(errors).forEach(key => {
            errors[key as keyof FormErrors] = undefined;
        });
    }

    const handleSubmit = async () => {
        try {
            validateEmail();
            validatePassword();
            validateConfirmPassword();

            const response = await fetch('https://dist.nd.ru/api/reg', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    confirm_password: formData.confirmPassword,
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

    return {formData, errors, handleSubmit,
        validateEmail, validatePassword, validateConfirmPassword}
})