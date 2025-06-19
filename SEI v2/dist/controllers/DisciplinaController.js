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
exports.DisciplinaController = void 0;
const DisciplinaService_1 = require("../services/DisciplinaService");
class DisciplinaController {
    constructor() {
        this.service = new DisciplinaService_1.DisciplinaService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const disciplina = yield this.service.create(req.body);
                res.status(201).json(disciplina);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao criar disciplina', error });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const disciplina = yield this.service.findById(id);
                if (!disciplina) {
                    res.status(404).json({ message: 'Disciplina não encontrada' });
                    return;
                }
                res.json(disciplina);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar disciplina', error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const disciplina = yield this.service.update(id, req.body);
                if (!disciplina) {
                    res.status(404).json({ message: 'Disciplina não encontrada' });
                    return;
                }
                res.json(disciplina);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao atualizar disciplina', error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const deleted = yield this.service.delete(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Disciplina não encontrada' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao excluir disciplina', error });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const disciplinas = yield this.service.list();
                res.json(disciplinas);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao listar disciplinas', error });
            }
        });
    }
    findByNome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nome = req.params.nome;
                const disciplinas = yield this.service.findByNome(nome);
                res.json(disciplinas);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar disciplinas por nome', error });
            }
        });
    }
    findAtivos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const disciplinas = yield this.service.findAtivos();
                res.json(disciplinas);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar disciplinas ativas', error });
            }
        });
    }
    findInativos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const disciplinas = yield this.service.findInativos();
                res.json(disciplinas);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar disciplinas inativas', error });
            }
        });
    }
}
exports.DisciplinaController = DisciplinaController;
