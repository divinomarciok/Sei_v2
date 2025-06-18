import { Router } from 'express';
import { TurmaAlunoController } from '../controllers/TurmaAlunoController';

const router = Router();
const controller = new TurmaAlunoController();

router.post('/turmaAluno', (req, res) => controller.create(req, res));
router.get('/turmaAluno', (req, res) => controller.list(req, res));

router.put('/turmaAluno/:id', (req, res) => controller.update(req, res));
router.delete('/turmaAluno/:id', (req, res) => controller.delete(req, res));

router.get('/turmaAluno/:id', (req, res) => controller.findById(req, res));
export  {router as turmaAlunoRouter};
