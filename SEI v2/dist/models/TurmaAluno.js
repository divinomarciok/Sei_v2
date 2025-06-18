"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmaAluno = void 0;
const typeorm_1 = require("typeorm");
const Turma_1 = require("./Turma");
const Aluno_1 = require("./Aluno");
let TurmaAluno = class TurmaAluno {
};
exports.TurmaAluno = TurmaAluno;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TurmaAluno.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Turma_1.Turma),
    (0, typeorm_1.JoinColumn)({ name: 'turma_id' }),
    __metadata("design:type", Turma_1.Turma)
], TurmaAluno.prototype, "turma", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Aluno_1.Aluno),
    (0, typeorm_1.JoinColumn)({ name: 'aluno_id' }),
    __metadata("design:type", Aluno_1.Aluno)
], TurmaAluno.prototype, "aluno", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], TurmaAluno.prototype, "ativo", void 0);
exports.TurmaAluno = TurmaAluno = __decorate([
    (0, typeorm_1.Entity)('TurmaAluno')
], TurmaAluno);
