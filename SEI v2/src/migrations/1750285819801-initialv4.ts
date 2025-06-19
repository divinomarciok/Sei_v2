import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialv41750285819801 implements MigrationInterface {
    name = 'Initialv41750285819801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adiciona a coluna cpf apenas se não existir
        await queryRunner.query(`DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='professores' AND column_name='cpf') THEN ALTER TABLE "professores" ADD "cpf" character varying(14) NOT NULL DEFAULT '00000000000'; END IF; END $$;`);
        await queryRunner.query(`ALTER TABLE "turmas" ADD "hora_inicio" character varying(10) NOT NULL DEFAULT '00:00'`);
        await queryRunner.query(`ALTER TABLE "turmas" ADD "hora_fim" character varying(10) NOT NULL DEFAULT '00:00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Aluno" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "turmas" DROP COLUMN "hora_fim"`);
        await queryRunner.query(`ALTER TABLE "turmas" DROP COLUMN "hora_inicio"`);
        await queryRunner.query(`ALTER TABLE "professores" DROP COLUMN "cpf"`);
    }
}
