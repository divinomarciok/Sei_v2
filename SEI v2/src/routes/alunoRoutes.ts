import { Router } from 'express';
import { AlunoController } from '../controllers/AlunoController';

const router = Router();
const controller = new AlunoController();

router.post('/aluno', (req, res) => controller.create(req, res));
router.get('/aluno', (req, res) => controller.list(req, res));

router.put('/aluno/:id', (req, res) => controller.update(req, res));
router.delete('/aluno/:id', (req, res) => controller.delete(req, res));
router.get('/aluno/nome/:nome', (req, res) => controller.findByNome(req, res));

router.get('/aluno/:id', (req, res) => controller.findById(req, res));
export  {router as alunoRouter};
