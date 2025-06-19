import { TurmaAluno } from '../types/TurmaAluno';

export class TurmaAlunoService {
  private static baseUrl = 'http://localhost:3000/api/turmaAluno';

  static async getAll(): Promise<TurmaAluno[]> {
    const response = await fetch("http://localhost:3000/api/turmaAlunos");
    if (!response.ok) throw new Error('Erro ao buscar turma-alunos');
    return response.json();
  }

  static async getAtivos(): Promise<TurmaAluno[]> {
    const all = await this.getAll();
    return all.filter(ta => ta.ativo);
  }

  static async getInativos(): Promise<TurmaAluno[]> {
    const all = await this.getAll();
    return all.filter(ta => !ta.ativo);
  }

  static async getById(id: number): Promise<TurmaAluno> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar turma-aluno');
    return response.json();
  }

  static async create(turmaAluno: Omit<TurmaAluno, 'id'>): Promise<TurmaAluno> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(turmaAluno),
    });
    if (!response.ok) throw new Error('Erro ao criar turma-aluno');
    return response.json();
  }

  static async update(id: number, turmaAluno: Omit<TurmaAluno, 'id'>): Promise<TurmaAluno> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(turmaAluno),
    });
    if (!response.ok) throw new Error('Erro ao atualizar turma-aluno');
    return response.json();
  }

  static async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar turma-aluno');
  }

  static async reativar(id: number): Promise<TurmaAluno> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ativo: true }),
    });
    if (!response.ok) throw new Error('Erro ao reativar turma-aluno');
    return response.json();
  }
}