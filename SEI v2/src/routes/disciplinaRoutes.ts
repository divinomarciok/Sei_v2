import { Router } from 'express';
import { DisciplinaController } from '../controllers/DisciplinaController';

const router = Router();
const controller = new DisciplinaController();

router.post('/disciplina', (req, res) => controller.create(req, res));
router.get('/disciplinas', (req, res) => controller.list(req, res));
router.get('/disciplina/ativos', (req, res) => controller.findAtivos(req, res));
router.get('/disciplina/inativos', (req, res) => controller.findInativos(req, res));
router.get('/disciplina/nome/:nome', (req, res) => controller.findByNome(req, res));
router.put('/disciplina/:id', (req, res) => controller.update(req, res));
router.delete('/disciplina/:id', (req, res) => controller.delete(req, res));
router.get('/disciplina/:id', (req, res) => controller.findById(req, res));
export  {router as disciplinaRouter};