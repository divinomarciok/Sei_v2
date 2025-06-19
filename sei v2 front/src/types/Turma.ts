import { Disciplina } from './Disciplina';
import { Professor } from './Professor';
import { Sala } from './Sala';

export interface Turma {
  id: number;
  codigoTurma: string;
  disciplina_id: number;
  professor_id: number;
  sala_id: number;
  horario: number;
  ativo: boolean;
  hora_inicio: string;
  hora_fim: string;
  disciplina?: Disciplina;
  professor?: Professor;
  sala?: Sala;
}