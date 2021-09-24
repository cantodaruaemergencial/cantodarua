
export type FetchInitiatives = () => Promise<Initiative[]> 

export interface Initiative {
    id: number;
    InitiativeName: string;
    Address: string;
}