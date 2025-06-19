
export interface Aluno {
  id: number;
  nome: string;
  email?: string;
  matricula: string;
  dataNascimento?: Date;
  ativo: boolean;
  cpf: string;
}
