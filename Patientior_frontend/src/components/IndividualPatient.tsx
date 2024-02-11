import { Patient } from '../types';
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

  if (!patient) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <h2>{patient.name} <span> {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />} </span></h2>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </>
  );
};

export default IndividualPatient;
