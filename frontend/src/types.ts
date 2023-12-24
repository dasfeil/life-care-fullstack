export type formData = {
    id: string,
    phoneNo: string,
    username: string,
    joinFrom: string
    joinTo: string,
}

export type inquiryData = {
    userNo: number,
    id: number,
    username: string,
    phoneNo: number,
    email: string,
    joinDate: string
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