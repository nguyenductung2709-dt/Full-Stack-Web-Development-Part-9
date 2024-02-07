import { PatientsEntry, NonSensitivePatientsEntry } from '../types/patientTypes';
import patientsEntries  from '../../data/patients';

const getPatients = (): PatientsEntry[] => {
    return patientsEntries;
};

const getNonSensitivePatients = (): NonSensitivePatientsEntry[] => { //add non sensitive
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