export interface FormData {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    companyId: string; // number?
    role: string;
    general?: string;
}

export interface SignUpError {
    message: string;
    field?: string;
}

export interface StepOneProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isInvalid: boolean;
    errors: SignUpError | null;
}

export interface StepTwoProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: SignUpError | null;
}

export interface StepThreeProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRoleChange: (role: string) => void;
    errors: SignUpError | null;
    roles: string[];
}
