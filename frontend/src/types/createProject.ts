export interface CreateProject {
    projectName: string;
    startDate: string;
    lossDate: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    streetAddress: string;
    city: string;
    state: string;
    zipcode: number;
    stage: number;
    projectType: string;
    carrier: string;
    assignedUser: string; //??? maybe
    recieveDate: string;
    catReference?: string;
    lossType: string;
    scope: string;
    claimNumber: number;
    policyExpiration: string;
    policyStartDate: string;
    yearBuilt: number;
    office: string; //? number??
}

export interface CreateProjectError {
    message: string;
    field?: string;
}

export interface StepOneProps {
    formData: CreateProject;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: CreateProjectError | null;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}