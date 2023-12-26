export type formData = {
    id: string,
    phoneNo: string,
    username: string,
    joinFrom: string
    joinTo: string,
}

export type inquiryData = {
    userNo: number,
    id: String,
    username: string,
    phoneNo: String,
    email: string,
    joinDate: string,
    [key: string]: unknown
}

export type inquiryAllDataRequest = {
    id: string,
    username: string,
    phoneNo: string
}

export type signUpData = {
    id: string,
    name: string,
    password: string,
    email: string,
    phoneNo: string
}

export type loginData = {
    cred: string,
    password: string,
    remember: boolean
};

export type authResponse = {
    token: string,
    type: string,
    id: number,
    username: string,
    email: string,
    roles: string[]
}