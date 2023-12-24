import axios from "axios";
import { formData as data, loginData, signUpData } from "../types";

const Instance = axios.create({
    baseURL: 'http://localhost:8080'
});

Instance.interceptors.request.use((request) => {
    return request;
});

Instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const statusCode = error.response ? error.response.status : null;
        if (statusCode === 401) {
        }

        if (statusCode >= 500) {
        }

        if (statusCode === 400) {
        }
        return Promise.reject(error);
    }
);

export function handleLogin(data: loginData) {
    return Instance.post("/login", data)
}

export function handleSignUp(data: signUpData) {
    return Instance.post("/sign-up", data)
}

export const handleInquiry = async (data: data, page: Number, pageSize: number) => {
    return Instance.post("/manage/inquiry", {
        ...data,
        page: page,
        size: pageSize,
    })
};

export default Instance