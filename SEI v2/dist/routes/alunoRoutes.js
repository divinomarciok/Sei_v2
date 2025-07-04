"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alunoRouter = void 0;
const express_1 = require("express");
const AlunoController_1 = require("../controllers/AlunoController");
const router = (0, express_1.Router)();
exports.alunoRouter = router;
const controller = new AlunoController_1.AlunoController();
router.post('/aluno', (req, res) => controller.create(req, res));
router.get('/alunos', (req, res) => controller.list(req, res));
router.delete('/aluno/:id', (req, res) => controller.delete(req, res));
router.get('/aluno/nome/:nome', (req, res) => controller.findByNome(req, res));
router.get('/aluno/ativos', (req, res) => controller.findAtivos(req, res));
router.get('/aluno/inativos', (req, res) => controller.findInativos(req, res));
router.put('/aluno/:id', (req, res) => controller.update(req, res));
router.get('/aluno/:id', (req, res) => controller.findById(req, res));
