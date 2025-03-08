export type LoginCredentials = {
    usernameOrEmail: string;
    password: string;
}

export type LoginResponse = {
    data: any;
    token: string;
    type: string;
    username: string;
}