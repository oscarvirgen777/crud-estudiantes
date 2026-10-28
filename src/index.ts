import express from 'express';
import estudiantesRouter from './routes/estudiantes';

const app = express();
app.use(express.json());

app.use('/api/estudiantes', estudiantesRouter);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));   