export type LoginCredentials = {
    usernameOrEmail: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    type: string;
    username: string;
}