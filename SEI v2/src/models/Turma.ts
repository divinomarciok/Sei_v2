import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Disciplina } from "./Disciplina";
import { Professor } from "./Professor";
import { Sala } from "./Sala";

@Entity("turmas")
export class Turma {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 10, name: "codigo_turma" })
    codigoTurma!: string;

    @Column()
    disciplina_id!: number;

    @ManyToOne(() => Disciplina)
    @JoinColumn({ name: "disciplina_id" })
    disciplina!: Disciplina;

    @Column()
    professor_id!: number;

    @ManyToOne(() => Professor, professor => professor.turmas)
    @JoinColumn({ name: "professor_id" })
    professor!: Professor;

    @Column()
    sala_id!: number;

    @ManyToOne(() => Sala, sala => sala.turmas)
    @JoinColumn({ name: "sala_id" })
    sala!: Sala;

    @Column()
    horario!: number;

    @Column({ default: true })
    ativo!: boolean;

    @Column({ length: 10 })
    hora_inicio!: string;

    @Column({ length: 10 })
    hora_fim!: string;
}