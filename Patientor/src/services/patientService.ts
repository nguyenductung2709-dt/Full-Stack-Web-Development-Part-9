import { PatientsEntry, NonSensitivePatientsEntry, NewPatientsEntry } from '../types/patientTypes';
import patientsEntries  from '../../data/patients';
import { v1 as uuid } from 'uuid'


const getPatients = (): PatientsEntry[] => {
    return patientsEntries;
};

const getNonSensitivePatients = (): NonSensitivePatientsEntry[] => { //add non sensitive
    return patientsEntries.map(({ ssn, ...rest }) => rest); 
};

const addPatients = (newEntry: NewPatientsEntry): PatientsEntry => {
    const newestEntry = {
        id: uuid(),
        ...newEntry
    }
    patientsEntries.push(newestEntry);
    return newestEntry;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatients 
};