import express from 'express';

const app = express();
app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

app.get('/api/estudiantes', (req, res) => {
  res.json(estudiantes);
});

app.post('/api/estudiantes', (req, res) => {
  const { nombre, email, bootcamp } = req.body;

  if (!email) {
    res.status(400).json({ error: 'El campo email es obligatorio.' });
    return;
  }

  const nuevoId = estudiantes.length > 0 ? estudiantes[estudiantes.length - 1].id + 1 : 1;

  const estudiante: Estudiante = { id: nuevoId, nombre, email, bootcamp };
  estudiantes.push(estudiante);

  res.status(201).json(estudiante);
});

app.put('/api/estudiantes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = estudiantes.findIndex(e => e.id === id);

  if (indice === -1) {
    res.status(404).json({ error: 'Estudiante no encontrado.' });
    return;
  }

  const { nombre, email, bootcamp } = req.body;
  estudiantes[indice] = { ...estudiantes[indice], nombre, email, bootcamp };

  res.json(estudiantes[indice]);
});

app.delete('/api/estudiantes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = estudiantes.findIndex(e => e.id === id);

  if (indice === -1) {
    res.status(404).json({ error: 'Estudiante no encontrado.' });
    return;
  }

  estudiantes.splice(indice, 1);
  res.json({ message: 'Estudiante eliminado.' });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));   