export interface LoginUser {
    email: string;
    password: string;
}

export interface RegisterUser {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
}