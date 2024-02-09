import { NewPatientsEntry, Gender } from './types/patientTypes'

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

const toNewPatientsEntry = (object: unknown): NewPatientsEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }

    if ('name' in object && 'dateOfBirth' in object && 'occupation' in object && 'gender' in object) {
        const newEntry: NewPatientsEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender)
        }
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
  }
  
export default toNewPatientsEntry;