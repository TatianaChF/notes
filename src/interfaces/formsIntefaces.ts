export interface FormData {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface ApiResponse {
    message?: string;
    error?: string;
    statusCode?: number;
    id?: number;
    email?: string;
}