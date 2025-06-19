import { Router } from 'express';
import { SalaController } from '../controllers/SalaController';

const router = Router();
const controller = new SalaController();

router.post('/salas', (req, res) => controller.create(req, res));
router.get('/salas', (req, res) => controller.list(req, res));
router.get('/salas/:id', (req, res) => controller.findById(req, res));
router.put('/salas/:id', (req, res) => controller.update(req, res));
router.delete('/salas/:id', (req, res) => controller.delete(req, res));
router.get('/salas/capacidade/:capacidade', (req, res) => controller.findByCapacidadeMinima(req, res));
router.get('/salas/ativos', (req, res) => controller.findAtivos(req, res));
router.get('/salas/inativos', (req, res) => controller.findInativos(req, res));

export {router as salaRouter};