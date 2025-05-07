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
exports.TurmaService = void 0;
const TurmaRepository_1 = require("../repository/TurmaRepository");
class TurmaService {
    constructor() {
        this.repository = new TurmaRepository_1.TurmaRepository();
    }
    create(turma) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.create(turma);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findByid(id);
        });
    }
    update(id, turma) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.update(id, turma);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.delete(id);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.list();
        });
    }
    findAllWithRelations() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findAllWithRelations();
        });
    }
}
exports.TurmaService = TurmaService;
