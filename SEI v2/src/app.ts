import express from 'express';
import cors from 'cors';
import {disciplinaRouter} from './routes/disciplinaRoutes';
import {professorRouter} from './routes/professorRoutes';
import {salaRouter} from './routes/salaRoutes';
import {turmaRouter} from './routes/turmaRoutes';
import { initializeDatabase } from './database/connection';
import { turmaAlunoRouter } from './routes/turmaAlunoRoutes';
import { alunoRouter } from './routes/alunoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', disciplinaRouter);
app.use('/api', professorRouter);
app.use('/api', salaRouter);
app.use('/api', turmaRouter);
app.use('/api', turmaAlunoRouter);
app.use('/api', alunoRouter)



app.get('/', (req, res) => {
    res.send('SEI v2 API is running');
});

export { app, initializeDatabase };