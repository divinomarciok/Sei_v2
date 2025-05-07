import { Router, Request, Response } from 'express';
import { TurmaController } from '../controllers/TurmaController';

const router = Router();
const controller = new TurmaController();

router.post('/turmas', (req, res) => controller.create(req, res));
router.get('/turmas', (req, res) => controller.list(req, res));
router.get('/turmas/relations', (req, res) => controller.findAllWithRelations(req, res));
router.get('/turmas/:id', (req, res) => controller.findById(req, res));
router.put('/turmas/:id', (req, res ) => controller.update(req, res));
router.delete('/turmas/:id', (req,res) => controller.delete(req, res));

export {router as turmaRouter};
