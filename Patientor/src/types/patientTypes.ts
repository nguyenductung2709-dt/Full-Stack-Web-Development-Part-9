export interface PatientsEntry {
    id : string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string;
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;

export type NewPatientsEntry = Omit <PatientsEntry, 'id'>;