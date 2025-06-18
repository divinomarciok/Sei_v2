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
exports.AlunoController = void 0;
const AlunoService_1 = require("../services/AlunoService");
class AlunoController {
    constructor() {
        this.service = new AlunoService_1.AlunoService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aluno = yield this.service.create(req.body);
                res.status(201).json(aluno);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao criar aluno', error });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const aluno = yield this.service.findById(id);
                if (!aluno) {
                    res.status(404).json({ message: 'Aluno não encontrado' });
                    return;
                }
                res.json(aluno);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar aluno', error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const aluno = yield this.service.update(id, req.body);
                if (!aluno) {
                    res.status(404).json({ message: 'Aluno não encontrado' });
                    return;
                }
                res.json(aluno);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao atualizar aluno', error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const deleted = yield this.service.delete(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Aluno não encontrado' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao excluir aluno', error });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alunos = yield this.service.list();
                res.json(alunos);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao listar alunos', error });
            }
        });
    }
    findByNome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nome = req.params.nome;
                const alunos = yield this.service.findByNome(nome);
                res.json(alunos);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar alunos por nome', error });
            }
        });
    }
}
exports.AlunoController = AlunoController;
