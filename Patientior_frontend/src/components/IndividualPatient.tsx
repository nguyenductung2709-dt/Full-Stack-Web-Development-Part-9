import { Patient, Entry } from '../types';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const IndividualPatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const patientData = await patientService.getById(id);
          setPatient(patientData);
        }
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    fetchPatient();

    return () => {
      setPatient(null); 
    };
  }, [id]);

  const renderEntry = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <div key={entry.id}>
            <p>
              <span>{entry.date}</span> <span> <i>{entry.description}</i> </span>{" "}
            </p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((diagnosis, index) => (
                  <li key={index}>{diagnosis}</li>
                ))}
              </ul>
            )}
            {entry.discharge && (
              <p>Discharge Date: {entry.discharge.date}</p>
            )}
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div key={entry.id}>
            <p>
              <span>{entry.date}</span> <span> <i>{entry.description}</i> </span>{" "}
            </p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((diagnosis, index) => (
                  <li key={index}>{diagnosis}</li>
                ))}
              </ul>
            )}
            {entry.sickLeave && (
              <p>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
            )}
          </div>
        );
      case "HealthCheck":
        return (
          <div key={entry.id}>
            <p>
              <span>{entry.date}</span> <span> <i>{entry.description}</i> </span>{" "}
            </p>
            {entry.healthCheckRating && (
              <p>Health Check Rating: {entry.healthCheckRating}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (!patient) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <h2>
        {patient.name}{" "}
        <span>{patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}</span>
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>
        <strong> entries </strong>
      </p>
      {patient.entries.map(renderEntry)}
    </>
  );
};

export default IndividualPatient;
