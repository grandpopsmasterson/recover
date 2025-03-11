export type LoginCredentials = {
    usernameOrEmail: string;
    password: string;
}

export type LoginResponse = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    token: string;
    type: string;
    username: string;
}