import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialv31750263790776 implements MigrationInterface {
    name = 'Initialv31750263790776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Aluno" ADD "ativo" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TurmaAluno" ADD "ativo" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TurmaAluno" DROP COLUMN "ativo"`);
        await queryRunner.query(`ALTER TABLE "Aluno" DROP COLUMN "ativo"`);
    }

}
