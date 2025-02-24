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

export type ErrorCode =
| 400 // Bad request
| 401 // Unauthorized
| 403 // Forbidden
| 404 // Not found
| 408 // Request timeout
| 429 // Too many requests
| 500 // Internal server error
| 503 // Service unavailable