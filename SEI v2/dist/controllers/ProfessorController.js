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
exports.ProfessorController = void 0;
const ProfessorService_1 = require("../services/ProfessorService");
class ProfessorController {
    constructor() {
        this.service = new ProfessorService_1.ProfessorService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const professor = yield this.service.create(req.body);
                res.status(201).json(professor);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao criar professor', error });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const professor = yield this.service.findById(id);
                if (!professor) {
                    res.status(404).json({ message: 'Professor não encontrado' });
                    return;
                }
                res.json(professor);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar professor', error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const professor = yield this.service.update(id, req.body);
                if (!professor) {
                    res.status(404).json({ message: 'Professor não encontrado' });
                    return;
                }
                res.json(professor);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao atualizar professor', error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const deleted = yield this.service.delete(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Professor não encontrado' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao excluir professor', error });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const professores = yield this.service.list();
                res.json(professores);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao listar professores', error });
            }
        });
    }
    findByMatricula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const matricula = req.params.matricula;
                console.log("matricula busca : ", matricula);
                const professor = yield this.service.findByMatricula(matricula);
                if (!professor) {
                    res.status(404).json({ message: 'Professor não encontrado' });
                    return;
                }
                res.json(professor);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar professor por matrícula', error });
            }
        });
    }
    findAtivos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const professores = yield this.service.findAtivos();
                res.json(professores);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar professores ativos', error });
            }
        });
    }
    findInativos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const professores = yield this.service.findInativos();
                res.json(professores);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar professores inativos', error });
            }
        });
    }
}
exports.ProfessorController = ProfessorController;
