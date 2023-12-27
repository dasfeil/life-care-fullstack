import axios from "axios";
import { formData as data, inquiryAllDataRequest, loginData, signUpData } from "../types";

const Instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

Instance.interceptors.request.use((request) => {
    return request;
}, (error) => Promise.reject(error));

Instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error)
        const statusCode = error.response ? error.response.status : null;

        if (statusCode >= 500) {
            return Promise.reject(error)
        }

        if (statusCode === 400 && error.response.data.messages) {
            return Promise.reject(error.response.data.messages)
        }

        if (statusCode === null) {
            return Promise.reject(["No server respond"])
        }
        return Promise.reject(error);
    }
);

export function handleLogin(data: loginData) {
    return Instance.post("/api/v1/login", data)
}

export function handleSignUp(data: signUpData) {
    return Instance.post("/api/v1/sign-up", data)
}

export function handleCookieToken() {
    return Instance.post("/api/v1/refresh", {})
}

export const handleInquiryPagination = async (data: data, page: Number, pageSize: number) => {
    return Instance.post("/api/v1/manage/inquiry", {
        ...data,
        page: page,
        size: pageSize,
    })
};

export const handleLogout = () => {
    return Instance.post("/api/v1/manage/inquiry", {})
}

export const handleInquiryAll = async (data: inquiryAllDataRequest) => {
    return Instance.post("api/v1/manage/inquiry/all", data, {
        withCredentials: true
    })
}

export default Instance