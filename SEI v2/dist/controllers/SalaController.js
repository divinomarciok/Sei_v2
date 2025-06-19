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
exports.SalaController = void 0;
const SalaService_1 = require("../services/SalaService");
class SalaController {
    constructor() {
        this.service = new SalaService_1.SalaService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sala = yield this.service.create(req.body);
                res.status(201).json(sala);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao criar sala', error });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const sala = yield this.service.findById(id);
                if (!sala) {
                    res.status(404).json({ message: 'Sala não encontrada' });
                    return;
                }
                res.json(sala);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar sala', error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const sala = yield this.service.update(id, req.body);
                if (!sala) {
                    res.status(404).json({ message: 'Sala não encontrada' });
                    return;
                }
                res.json(sala);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao atualizar sala', error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const deleted = yield this.service.delete(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Sala não encontrada' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao excluir sala', error });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salas = yield this.service.list();
                res.json(salas);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao listar salas', error });
            }
        });
    }
    findByCapacidadeMinima(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const capacidade = parseInt(req.params.capacidade);
                const salas = yield this.service.findByCapacidadeMinima(capacidade);
                res.json(salas);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar salas por capacidade', error });
            }
        });
    }
    findAtivos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salas = yield this.service.findAtivos();
                res.json(salas);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar salas ativas', error });
            }
        });
    }
    findInativos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salas = yield this.service.findInativos();
                res.json(salas);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar salas inativas', error });
            }
        });
    }
}
exports.SalaController = SalaController;
