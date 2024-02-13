import React, { useState } from 'react';
import axios from 'axios';
import { Entry } from '../types';

interface Props {
    id: string | undefined;
}

const HealthEntryForm = ({ id }: Props) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnoses, setDiagnoses] = useState<string[]>([]);
    const [dateOfDischarge, setDateOfDischarge] = useState('');
    const [criteria, setCriteria] = useState('');

    const entryCreation = (event: React.FormEvent) => {
        event.preventDefault();
        const newEntry = {
            date: date,
            type: "Hospital",
            specialist: specialist,
            diagnosisCodes: diagnoses,
            description: description,
            discharge: {
                date: dateOfDischarge,
                criteria: criteria
            }
        };
        axios.post<Entry>(`http://localhost:3000/api/patients/${id}/entries`, newEntry)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error adding entry:', error);
            });
        setDate('');
        setDescription('');
        setSpecialist('');
        setDiagnoses([]);
        setDateOfDischarge('');
        setCriteria('');
    };

    const handleDiagnosesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDiagnoses(value.split(',').map(code => code.trim()));
    };

    return (
        <>
            <h3> New HealthCheck entry </h3>
            <form onSubmit={entryCreation}>
                <div> Date:
                    <input type="date" value={date} onChange={({ target }) => setDate(target.value)} />
                </div>
                <div> Description:
                    <input type="text" value={description} onChange={({ target }) => setDescription(target.value)} />
                </div>
                <div> Specialist:
                    <input type="text" value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
                </div>
                <div> Diagnoses codes:
                    <input type="text" value={diagnoses.join(',')} onChange={handleDiagnosesChange} />
                </div>
                <p> Discharge: </p>
                <div>
                    Date:
                    <input type = "date" value = {dateOfDischarge} onChange = {({ target }) => setDateOfDischarge(target.value)} />
                </div>
                <div>
                    Criteria:
                    <input type = "text" value = {criteria} onChange = {({ target }) => setCriteria(target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default HealthEntryForm;
