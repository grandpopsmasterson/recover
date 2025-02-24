import { Dispatch, SetStateAction } from "react";

export interface CreateProject {
    projectName: string;
    //startDate: string;
    lossDate: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
    stage: string;
    projectType: string;
    carrier: string;
    //assignedUser: string[]; //??? maybe add later
    //recievedDate: string; //Dave has this autosetting in backend
    catReference?: string;
    lossType: string;
    scope: string;
    claimNumber: string;
    policyExpiration: string;
    policyStart: string;
    yearBuilt: number;
    //officeId: string; //TODO ADD LATER? number??
}

// export interface ProjectRoleRequest {
//     userId: string;
//     roleType: string;
//     projectId: string;
// }

export interface CreateProjectError {
    message: string;
    field?: string;
}

export interface ProjectStageArray {
    label: string;
    key: string;
}
export interface LossTypeArray {
    label: string;
    key: string;
}

export interface StepOneProps {
    firstName: string;
    lastName: string;
    formData: CreateProject;
    errors: CreateProjectError | null;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface StepTwoProps {
    projectType: string[];
    formData: CreateProject;
    errors: CreateProjectError | null;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleProjectTypeChange: (projectType: string) => void;
}

export interface StepThreeProps {
    scope: string[];
    lossType: string[];
    formData: CreateProject;
    errors: CreateProjectError | null;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    setErrors: Dispatch<SetStateAction<CreateProjectError | null>>;
}

export interface StepFourProps {
    formData: CreateProject
    errors: CreateProjectError | null;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface StepFiveProps {
    formData: CreateProject
    projStage: string[];
    handleStageChange: (projectStage: string) => void;
}