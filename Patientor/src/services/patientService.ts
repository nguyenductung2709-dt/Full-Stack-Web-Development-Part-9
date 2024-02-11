import { Patient, NonSensitivePatient, NewPatientsEntry } from '../types/patientTypes';
import patientsEntries  from '../../data/patients';
import { v1 as uuid } from 'uuid'


const getPatients = (): Patient[] => {
    return patientsEntries;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => { //add non sensitive
    return patientsEntries.map(({ ssn, ...rest }) => rest); 
};

const addPatients = (newEntry: NewPatientsEntry): Patient => {
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