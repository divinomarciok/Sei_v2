import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Turma } from './Turma';
import { Aluno } from './Aluno';

@Entity('TurmaAluno')
export class TurmaAluno {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Turma)
  @JoinColumn({ name: 'turma_id' })
  turma!: Turma;

  @ManyToOne(() => Aluno)
  @JoinColumn({ name: 'aluno_id' })
  aluno!: Aluno;

  @Column({ type: 'boolean' })
  ativo!: boolean; // Campo ativo ajustado para boolean
}
