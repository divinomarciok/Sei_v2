"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmaAlunoController = void 0;
const TurmaAlunoService_1 = require("../services/TurmaAlunoService");
class TurmaAlunoController {
    constructor() {
        this.service = new TurmaAlunoService_1.TurmaAlunoService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turmaAluno = yield this.service.create(req.body);
                res.status(201).json(turmaAluno);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao criar turma-aluno', error });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const turmaAluno = yield this.service.findById(id);
                if (!turmaAluno) {
                    res.status(404).json({ message: 'Turma-aluno não encontrado' });
                    return;
                }
                res.json(turmaAluno);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar turma-aluno', error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const turmaAluno = yield this.service.update(id, req.body);
                if (!turmaAluno) {
                    res.status(404).json({ message: 'Turma-aluno não encontrado' });
                    return;
                }
                res.json(turmaAluno);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao atualizar turma-aluno', error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const deleted = yield this.service.delete(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Turma-aluno não encontrado' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao excluir turma-aluno', error });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turmaAlunos = yield this.service.list();
                res.json(turmaAlunos);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao listar turma-alunos', error });
            }
        });
    }
    findAtivos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turmaAlunos = yield this.service.findAtivos();
                res.json(turmaAlunos);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar turma-aluno ativos', error });
            }
        });
    }
    findInativos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turmaAlunos = yield this.service.findInativos();
                res.json(turmaAlunos);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar turma-aluno inativos', error });
            }
        });
    }
}
exports.TurmaAlunoController = TurmaAlunoController;
