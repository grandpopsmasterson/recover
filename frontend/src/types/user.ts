export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    roles: string[];
    verified: string;
    pin?: number | null;
}

export interface UserState {
    user: User | null;
    status?: "idle" | "loading" | "succeeded" | "failed";
    error: string | null
}