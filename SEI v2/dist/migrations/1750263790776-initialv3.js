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
exports.Initialv31750263790776 = void 0;
class Initialv31750263790776 {
    constructor() {
        this.name = 'Initialv31750263790776';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "Aluno" ADD "ativo" boolean NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "TurmaAluno" ADD "ativo" boolean NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "TurmaAluno" DROP COLUMN "ativo"`);
            yield queryRunner.query(`ALTER TABLE "Aluno" DROP COLUMN "ativo"`);
        });
    }
}
exports.Initialv31750263790776 = Initialv31750263790776;
