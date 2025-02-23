export interface TechDash {
    number: number;
    handleOpen: () => void;

}

export type SignatureField = {
    envelopeId: string;
    signerEmail: string;
    status: "pending" | "completed";
}

export interface CheckInType {
    checkIn: boolean;
    photo: string | null;
    scopeAndCarrier: boolean;
    workAuth: string | null; //SignatureField;
}

export interface MicroForm {
    carrier: string;
    scope: string;
}