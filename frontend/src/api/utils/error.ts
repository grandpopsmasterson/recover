import { ErrorCode } from "@/types/api";

export const getLoginErrorMessage = (statusCode: ErrorCode): string => {
    switch (statusCode) {
        case 400:
            return 'Please check your connection and try again';
        case 401:
            return 'Please check your password and username/email and try again';
        case 403:
            return 'Account locked,  please contact support';
        case 404:
            return 'Account not found, please sign up';
        case 408:
            return 'Request timeout. Check your connection and try again';
        case 429:
            return 'Too many login attempts, please try again in 5 minutes';
        case 500:
            return 'Server busy, please try again later';
        case 503:
            return 'Server unavailable, please try again later';
        default:
            return 'An unexpected error occurred, please try again later'
    }
};