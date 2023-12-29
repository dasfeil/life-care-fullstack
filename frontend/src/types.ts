export type FormData = {
    id: string,
    phoneNo: string,
    username: string,
    joinFrom: string
    joinTo: string,
}

export type InquiryData = {
    userNo: number,
    id: String,
    username: string,
    phoneNo: String,
    email: string,
    joinDate: string,
    [key: string]: unknown
}

export type InquiryAllDataRequest = {
    id: string,
    username: string,
    phoneNo: string
}

export type SignUpData = {
    id: string,
    name: string,
    password: string,
    email: string,
    phoneNo: string
}

export type LoginData = {
    cred: string,
    password: string,
    persist: boolean
};

export type AuthResponse = {
    id: number,
    username: string,
    email: string,
    roles: string[],
    phoneNo: string,
    userRank: string
}