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
exports.InitialMigration1720000000000 = void 0;
const typeorm_1 = require("typeorm");
class InitialMigration1720000000000 {
    constructor() {
        this.name = 'InitialMigration1720000000000';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Criar tabela de Salas
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "salas",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "numero",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "capacidade",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "ativo",
                        type: "boolean",
                        default: true
                    }
                ]
            }), true);
            // Criar tabela de Disciplinas
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "disciplinas",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        length: "200",
                        isNullable: false
                    },
                    {
                        name: "carga_horaria",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "ativo",
                        type: "boolean",
                        default: true
                    }
                ]
            }), true);
            // Criar tabela de Professores
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "professores",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        length: "200",
                        isNullable: false
                    },
                    {
                        name: "matricula",
                        type: "varchar",
                        length: "30",
                        isNullable: false
                    },
                    {
                        name: "ativo",
                        type: "boolean",
                        default: true
                    }
                ]
            }), true);
            // Criar tabela de Turmas
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "turmas",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "codigo_turma",
                        type: "varchar",
                        length: "10",
                        isNullable: false
                    },
                    {
                        name: "disciplina_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "professor_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "sala_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "horario",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "ativo",
                        type: "boolean",
                        default: true
                    }
                ]
            }), true);
            // Adicionar chaves estrangeiras para a tabela Turmas
            yield queryRunner.createForeignKey("turmas", new typeorm_1.TableForeignKey({
                columnNames: ["disciplina_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "disciplinas",
                onDelete: "CASCADE"
            }));
            yield queryRunner.createForeignKey("turmas", new typeorm_1.TableForeignKey({
                columnNames: ["professor_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "professores",
                onDelete: "CASCADE"
            }));
            yield queryRunner.createForeignKey("turmas", new typeorm_1.TableForeignKey({
                columnNames: ["sala_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "salas",
                onDelete: "CASCADE"
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remover chaves estrangeiras
            const turmasTable = yield queryRunner.getTable("turmas");
            if (turmasTable) {
                const foreignKeys = turmasTable.foreignKeys;
                for (const foreignKey of foreignKeys) {
                    yield queryRunner.dropForeignKey("turmas", foreignKey);
                }
            }
            // Remover tabelas na ordem inversa
            yield queryRunner.dropTable("turmas");
            yield queryRunner.dropTable("professores");
            yield queryRunner.dropTable("disciplinas");
            yield queryRunner.dropTable("salas");
        });
    }
}
exports.InitialMigration1720000000000 = InitialMigration1720000000000;
