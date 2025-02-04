export interface ApiResponse<T> {
    data: T;
    error?: string;
    status: number;
}

export interface EmailCheckResponse {
    exists: boolean;
    message?: string;
}

export interface UsernameCheckResponse {
    exists: boolean;
    message?: string;
}

