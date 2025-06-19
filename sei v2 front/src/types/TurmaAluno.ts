import { Turma } from './Turma';
import { Aluno } from './Aluno';

export interface TurmaAluno {
  id: number;
  turma: number;
  aluno: number;
  ativo: boolean;
  turmaData?: Turma;
  alunoData?: Aluno;
}