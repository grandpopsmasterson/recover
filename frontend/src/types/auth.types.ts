export interface SignupState {
    form: {
        email: string;
        username: string;
        password: string;
        firstName: string;
        lastName: string;
        companyId?: string;
        role: string;
    };
    status: 'idle' | 'loading' | 'succeeded'  | 'failed';
    error: string | null;
    currentStep: number;
    validations: {
        email: boolean;
        username: boolean;
    };
}

export interface UserDetails {
    firstName: string;
    lastName: string;
    companyId?: string;
    role: string;
}