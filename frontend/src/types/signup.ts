export interface SignupRequest {
    user: {
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        password: string;
        companyId?: string; // number?
    }
    globalRole: string;
}

export interface SignupResponse { 
    message: string; 
    username: string; 
    email: string;
}

export interface SignUpError {
    message: string;
    field?: string;
}

export interface StepOneProps {
    formData: SignupRequest;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: SignUpError | null;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface StepTwoProps {
    formData: SignupRequest;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: SignUpError | null;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    confirmPassword: string;
}

export interface StepThreeProps {
    formData: SignupRequest;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRoleChange: (role: string) => void;
    errors: SignUpError | null;
    roles: string[];
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
