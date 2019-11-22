export interface LoginUser {
    login: string;
    password: string;
}

export interface RegisterUser {
    login: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
}