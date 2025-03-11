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
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null
}