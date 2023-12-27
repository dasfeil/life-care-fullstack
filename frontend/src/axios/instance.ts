import axios from "axios";
import { formData as data, inquiryAllDataRequest, loginData, signUpData } from "../types";

const Instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

Instance.interceptors.request.use((request) => {
    return request;
}, (error) => Promise.reject(error));

Instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const statusCode = error.response ? error.response.status : null;
        console.log(error)
        if (statusCode === 401) {
        }

        if (statusCode >= 500) {
            return Promise.reject(["Internal Server Error"])
        }

        if (statusCode === 400) {
            return Promise.reject(error.response.data.messages)
        }

        if (statusCode === null) {
            return Promise.reject(["Network error"])
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

export function handlePersist() {
    return Instance.post("/api/v1/authenticate", {}, { withCredentials: true })
}

export const handleInquiryPagination = async (data: data, page: Number, pageSize: number) => {
    return Instance.post("/api/v1/manage/inquiry", {
        ...data,
        page: page,
        size: pageSize,
    }, {
        withCredentials: true
    })
};

export const handleLogout = () => {
    return Instance.post("/api/v1/manage/inquiry", {}, {withCredentials: true})
}

export const handleInquiryAll = async (data: inquiryAllDataRequest) => {
    return Instance.post("api/v1/manage/inquiry/all", data, {
        withCredentials: true
    })
}

export default Instance