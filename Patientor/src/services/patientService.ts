import { PatientsEntry, NonSensitivePatientsEntry } from '../types/patientTypes';
import patientsEntries  from '../../data/patients';

const getPatients = (): PatientsEntry[] => {
    return patientsEntries;
};

const getNonSensitivePatients = (): NonSensitivePatientsEntry[] => {
    return patientsEntries.map(({ ssn, ...rest }) => rest);
};

const addPatients = (newEntry: PatientsEntry): void => {
    patientsEntries.push(newEntry);
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatients
};