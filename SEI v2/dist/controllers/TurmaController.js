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
exports.TurmaController = void 0;
const TurmaService_1 = require("../services/TurmaService");
class TurmaController {
    constructor() {
        this.service = new TurmaService_1.TurmaService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turma = yield this.service.create(req.body);
                res.status(201).json(turma);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao criar turma', error });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const turma = yield this.service.findById(id);
                if (!turma) {
                    res.status(404).json({ message: 'Turma não encontrada' });
                    return;
                }
                res.json(turma);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar turma', error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const turma = yield this.service.update(id, req.body);
                if (!turma) {
                    res.status(404).json({ message: 'Turma não encontrada' });
                    return;
                }
                res.json(turma);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao atualizar turma', error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const deleted = yield this.service.delete(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Turma não encontrada' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao excluir turma', error });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turmas = yield this.service.list();
                res.json(turmas);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao listar turmas', error });
            }
        });
    }
    findAllWithRelations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turmas = yield this.service.findAllWithRelations();
                res.json(turmas);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao listar turmas com relacionamentos', error });
            }
        });
    }
}
exports.TurmaController = TurmaController;
