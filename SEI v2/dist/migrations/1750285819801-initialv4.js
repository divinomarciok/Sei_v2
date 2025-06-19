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
exports.Initialv41750285819801 = void 0;
class Initialv41750285819801 {
    constructor() {
        this.name = 'Initialv41750285819801';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Adiciona a coluna cpf apenas se não existir
            yield queryRunner.query(`DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='professores' AND column_name='cpf') THEN ALTER TABLE "professores" ADD "cpf" character varying(14) NOT NULL DEFAULT '00000000000'; END IF; END $$;`);
            yield queryRunner.query(`ALTER TABLE "turmas" ADD "hora_inicio" character varying(10) NOT NULL DEFAULT '00:00'`);
            yield queryRunner.query(`ALTER TABLE "turmas" ADD "hora_fim" character varying(10) NOT NULL DEFAULT '00:00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "Aluno" DROP COLUMN "cpf"`);
            yield queryRunner.query(`ALTER TABLE "turmas" DROP COLUMN "hora_fim"`);
            yield queryRunner.query(`ALTER TABLE "turmas" DROP COLUMN "hora_inicio"`);
            yield queryRunner.query(`ALTER TABLE "professores" DROP COLUMN "cpf"`);
        });
    }
}
exports.Initialv41750285819801 = Initialv41750285819801;
