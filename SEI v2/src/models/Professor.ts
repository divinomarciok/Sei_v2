import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Turma } from "./Turma";

@Entity("professores")
export class Professor {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 200 })
    nome!: string;

    @Column({ length: 30 })
    matricula!: string;

    @Column({ default: true })
    ativo!: boolean;

    @OneToMany(() => Turma, turma => turma.professor)
    turmas!: Turma[];
}