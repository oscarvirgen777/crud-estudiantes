import { Router, Request, Response } from 'express';

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

const router = Router();

// GET /api/estudiantes (o ?bootcamp=X)
router.get('/', (req: Request, res: Response) => {
  const { bootcamp } = req.query;
  if (bootcamp) {
    res.json(estudiantes.filter(e => e.bootcamp === bootcamp));
  } else {
    res.json(estudiantes);
  }
});

// POST /api/estudiantes
router.post('/', (req: Request, res: Response) => {
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

// GET /api/estudiantes/:id
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const estudiante = estudiantes.find(e => e.id === id);

  if (!estudiante) {
    res.status(404).json({ error: 'Estudiante no encontrado.' });
    return;
  }

  res.json(estudiante);
});

// PUT /api/estudiantes/:id
router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const indice = estudiantes.findIndex(e => e.id === id);

  if (indice === -1) {
    res.status(404).json({ error: 'Estudiante no encontrado.' });
    return;
  }

  const { nombre, email, bootcamp } = req.body;
  estudiantes[indice] = { ...estudiantes[indice], nombre, email, bootcamp };

  res.json(estudiantes[indice]);
});

// DELETE /api/estudiantes/:id
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const indice = estudiantes.findIndex(e => e.id === id);

  if (indice === -1) {
    res.status(404).json({ error: 'Estudiante no encontrado.' });
    return;
  }

  estudiantes.splice(indice, 1);
  res.json({ message: 'Estudiante eliminado.' });
});

export default router;   