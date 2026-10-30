import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});   

const DB_FILE = './database.json';
let estudiantes: any[] = [];

async function loadDatabase() {
  if (existsSync(DB_FILE)) {
    const data = await readFile(DB_FILE, 'utf-8');
    estudiantes = JSON.parse(data);
  }
}

async function saveDatabase() {
  await writeFile(DB_FILE, JSON.stringify(estudiantes, null, 2));
}
app.get('/', (_req, res) => {
  res.json({ ok: true });
});   

// GET /estudiantes
app.get('/api/students', (_req, res) => {
  res.json(estudiantes);
});


app.post('/api/students', (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  estudiantes.push(nuevo);
  saveDatabase();
  res.status(201).json(nuevo);
});
// POST /estudiantes
app.post('/estudiantes', (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  estudiantes.push(nuevo);
  saveDatabase();
  res.status(201).json(nuevo);
});

// PUT /estudiantes/:id
app.put('/api/students/:id', (req, res) => {
  const idx = estudiantes.findIndex(e => e.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  estudiantes[idx] = { ...estudiantes[idx], ...req.body };
  saveDatabase();
  res.json(estudiantes[idx]);
});

// DELETE /estudiantes/:id
app.delete('/api/students/:id', (req, res) => {
  const idx = estudiantes.findIndex(e => e.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  estudiantes.splice(idx, 1);
  saveDatabase();
  res.status(204).end();
});

// --- Arranque ---
const PORT = process.env.PORT ?? 3000;

loadDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});   