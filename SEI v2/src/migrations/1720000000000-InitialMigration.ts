import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialMigration1720000000000 implements MigrationInterface {
    name = 'InitialMigration1720000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criar tabela de Salas
        await queryRunner.createTable(
            new Table({
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
            }),
            true
        );

        // Criar tabela de Disciplinas
        await queryRunner.createTable(
            new Table({
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
            }),
            true
        );

        // Criar tabela de Professores
        await queryRunner.createTable(
            new Table({
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
            }),
            true
        );

        // Criar tabela de Turmas
        await queryRunner.createTable(
            new Table({
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
            }),
            true
        );

        // Adicionar chaves estrangeiras para a tabela Turmas
        await queryRunner.createForeignKey(
            "turmas",
            new TableForeignKey({
                columnNames: ["disciplina_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "disciplinas",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "turmas",
            new TableForeignKey({
                columnNames: ["professor_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "professores",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "turmas",
            new TableForeignKey({
                columnNames: ["sala_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "salas",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover chaves estrangeiras
        const turmasTable = await queryRunner.getTable("turmas");
        if (turmasTable) {
            const foreignKeys = turmasTable.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("turmas", foreignKey);
            }
        }

        // Remover tabelas na ordem inversa
        await queryRunner.dropTable("turmas");
        await queryRunner.dropTable("professores");
        await queryRunner.dropTable("disciplinas");
        await queryRunner.dropTable("salas");
    }
}