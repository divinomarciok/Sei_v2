
import { Professor } from '../types/Professor';

export class ProfessorService {
  private static baseUrl = 'http://localhost:3000/api/professor';

  static async getAll(): Promise<Professor[]> {
    const response = await fetch("http://localhost:3000/api/professores");
    if (!response.ok) throw new Error('Erro ao buscar professores');
    return response.json();
  }

  static async getAtivos(): Promise<Professor[]> {
    const all = await this.getAll();
    return all.filter(p => p.ativo);
  }

  static async getInativos(): Promise<Professor[]> {
    const all = await this.getAll();
    return all.filter(p => !p.ativo);
  }

  static async getByMatricula(matricula: string): Promise<Professor> {
    const response = await fetch(`${this.baseUrl}/matricula/${matricula}`);
    if (!response.ok) throw new Error('Erro ao buscar professor por matrícula');
    return response.json();
  }

  static async getById(id: number): Promise<Professor> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar professor');
    return response.json();
  }

  static async create(professor: Omit<Professor, 'id'>): Promise<Professor> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(professor),
    });
    if (!response.ok) throw new Error('Erro ao criar professor');
    return response.json();
  }

  static async update(id: number, professor: Omit<Professor, 'id'>): Promise<Professor> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(professor),
    });
    if (!response.ok) throw new Error('Erro ao atualizar professor');
    return response.json();
  }

  static async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar professor');
  }

  static async reativar(id: number): Promise<Professor> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ativo: true }),
    });
    if (!response.ok) throw new Error('Erro ao reativar professor');
    return response.json();
  }
}
