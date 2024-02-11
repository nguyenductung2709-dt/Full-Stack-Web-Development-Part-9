import { NewPatientsEntry, Gender, Entry } from './types/patientTypes'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
}  

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
}

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
}

const isEntries = (param: unknown[]): param is Entry[] => {
    return param.every(entry => typeof entry === 'object' && entry !== null && 'id' in entry);
};

const parseEntries = (entries: unknown[]): Entry[] => {
    if (!entries || !isEntries(entries)) {
        throw new Error('Incorrect or missing entries');
    }
    return entries;
};

const toNewPatientsEntry = (object: unknown): NewPatientsEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }

    if ('name' in object && 'dateOfBirth' in object && 'occupation' in object && 'gender' in object && 'ssn' in object && 'entries' in object) {
        const newEntry: NewPatientsEntry = {
            name: parseName(object.name),
            ssn: parseSSN(object.ssn),
            dateOfBirth: parseDate(object.dateOfBirth),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender),
            entries: parseEntries(object.entries as unknown[])
        }
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
  }
  
export default toNewPatientsEntry;