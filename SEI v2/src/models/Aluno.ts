import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Aluno')
export class Aluno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  email?: string;

  @Column()
  matricula!: string;

  @Column()
  dataNascimento?: Date;

  @Column()
  ativo!: boolean; // Campo ativo ajustado para boolean
}
