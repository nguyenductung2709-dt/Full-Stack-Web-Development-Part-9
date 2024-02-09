export interface PatientsEntry {
    id : string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;

export type NewPatientsEntry = Omit <PatientsEntry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}