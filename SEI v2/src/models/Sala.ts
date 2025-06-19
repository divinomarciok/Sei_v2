  import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
  import { Turma } from "./Turma";

  @Entity("salas")
  export class Sala {
      @PrimaryGeneratedColumn()
      id!: number;

      @Column()
      numero!: number;

      @Column()
      capacidade!: number;

      @Column({ default: true })
      ativo!: boolean;

      @OneToMany(() => Turma, turma => turma.sala)
      turmas!: Turma[];
  }