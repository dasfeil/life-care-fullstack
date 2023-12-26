import axios from "axios";
import { formData as data, inquiryAllDataRequest, loginData, signUpData } from "../types";
import Cookies from "js-cookie";
const Instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: { 'Content-Type': 'application/json'}, 
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
    return Instance.post("/login", data)
}

export function handleSignUp(data: signUpData) {
    return Instance.post("/sign-up", data)
}

export const handleInquiryPagination = async (data: data, page: Number, pageSize: number) => {
    return Instance.post("/manage/inquiry", {
        ...data,
        page: page,
        size: pageSize,
    })
};

export const handleLogout = () => {
    Cookies.remove("jwt");
}

export const handleInquiryAll = async (data: inquiryAllDataRequest) => {
    return Instance.post("/manage/inquiry/all", data)
}

export default Instance