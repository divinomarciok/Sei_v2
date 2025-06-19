import { Router } from 'express';
import { ProfessorController } from '../controllers/ProfessorController';

const router = Router();
const controller = new ProfessorController();

router.post('/professor', (req, res) => controller.create(req, res));
router.get('/professores', (req, res) => controller.list(req, res));
router.get('/professor/ativos', (req, res) => controller.findAtivos(req, res));
router.get('/professor/inativos', (req, res) => controller.findInativos(req, res));
router.get('/professor/matricula/:matricula', (req, res) => controller.findByMatricula(req, res));
router.put('/professor/:id', (req, res) => controller.update(req, res));
router.delete('/professor/:id', (req, res) => controller.delete(req, res));
router.get('/professor/:id', (req, res) => controller.findById(req, res));

export  {router as professorRouter};