
import { Aluno } from '../types/Aluno';

export class AlunoService {
  private static baseUrl = 'http://localhost:3000/api/aluno';

  static async getAll(): Promise<Aluno[]> {
    const response = await fetch("http://localhost:3000/api/alunos");
    if (!response.ok) throw new Error('Erro ao buscar alunos');
    return response.json();
  }

  static async getAtivos(): Promise<Aluno[]> {
    const all = await this.getAll();
    return all.filter(a => a.ativo);
  }

  static async getInativos(): Promise<Aluno[]> {
    const all = await this.getAll();
    return all.filter(a => !a.ativo);
  }

  static async getByNome(nome: string): Promise<Aluno[]> {
    const response = await fetch(`${this.baseUrl}/nome/${encodeURIComponent(nome)}`);
    if (!response.ok) throw new Error('Erro ao buscar aluno por nome');
    return response.json();
  }

  static async getById(id: number): Promise<Aluno> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar aluno');
    return response.json();
  }

  static async create(aluno: Omit<Aluno, 'id'>): Promise<Aluno> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aluno),
    });
    if (!response.ok) throw new Error('Erro ao criar aluno');
    return response.json();
  }

  static async update(id: number, aluno: Omit<Aluno, 'id'>): Promise<Aluno> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aluno),
    });
    if (!response.ok) throw new Error('Erro ao atualizar aluno');
    return response.json();
  }

  static async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar aluno');
  }

  static async reativar(id: number): Promise<Aluno> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ativo: true }),
    });
    if (!response.ok) throw new Error('Erro ao reativar aluno');
    return response.json();
  }
}
