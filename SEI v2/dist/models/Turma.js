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
exports.Turma = void 0;
const typeorm_1 = require("typeorm");
const Disciplina_1 = require("./Disciplina");
const Professor_1 = require("./Professor");
const Sala_1 = require("./Sala");
let Turma = class Turma {
};
exports.Turma = Turma;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Turma.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, name: "codigo_turma" }),
    __metadata("design:type", String)
], Turma.prototype, "codigoTurma", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Turma.prototype, "disciplina_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Disciplina_1.Disciplina, disciplina => disciplina.turmas),
    (0, typeorm_1.JoinColumn)({ name: "disciplina_id" }),
    __metadata("design:type", Disciplina_1.Disciplina)
], Turma.prototype, "disciplina", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Turma.prototype, "professor_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Professor_1.Professor, professor => professor.turmas),
    (0, typeorm_1.JoinColumn)({ name: "professor_id" }),
    __metadata("design:type", Professor_1.Professor)
], Turma.prototype, "professor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Turma.prototype, "sala_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sala_1.Sala, sala => sala.turmas),
    (0, typeorm_1.JoinColumn)({ name: "sala_id" }),
    __metadata("design:type", Sala_1.Sala)
], Turma.prototype, "sala", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Turma.prototype, "horario", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Turma.prototype, "ativo", void 0);
exports.Turma = Turma = __decorate([
    (0, typeorm_1.Entity)("turmas")
], Turma);
