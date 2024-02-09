import express from 'express';
import diagnoseService from './src/services/diagnoseService';
import patientService from './src/services/patientService';
import toNewPatientsEntry from './src/utils';
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  console.log('someone pinged here');
  res.send(diagnoseService.getEntries());
});

app.get('/api/patients', (_req, res) => {
  console.log('someone pinged here');
  res.send(patientService.getNonSensitivePatients());
});

app.post('/api/patients', (req, res) => {
  try {
    const NewPatientsEntry = toNewPatientsEntry(req.body);
    const addedPatient = patientService.addPatients(NewPatientsEntry);
    res.json(addedPatient);
    console.log(addedPatient);
  }catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});