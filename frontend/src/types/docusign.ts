export interface DocusignFormProps {
    clientInfo: {
        firstName: string;
        lastName: string;
        email: string;
    };
    formId: string; // different work auth names
    onComplete: () => void;
}

export interface DocusignResponse {
    signing_url: string;
}

export interface FormSelectorProps {
    clientInfo: {
        firstName: string;
        lastName: string;
        email: string;
    };
    onComplete: () => void;
}

export const forms = [
    {id: 'form1', name: "Contents"},
    {id: 'form2', name: "Mitigation"},
    {id: 'form3', name: "Reconstruction"},
]