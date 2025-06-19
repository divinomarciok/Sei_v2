import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialv41750285819801 implements MigrationInterface {
    name = 'Initialv41750285819801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professores" ADD "cpf" character varying(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "turmas" ADD "hora_inicio" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "turmas" ADD "hora_fim" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Aluno" ADD "cpf" character varying(14) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Aluno" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "turmas" DROP COLUMN "hora_fim"`);
        await queryRunner.query(`ALTER TABLE "turmas" DROP COLUMN "hora_inicio"`);
        await queryRunner.query(`ALTER TABLE "professores" DROP COLUMN "cpf"`);
    }

}
