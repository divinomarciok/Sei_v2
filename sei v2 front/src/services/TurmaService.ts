import { Turma } from '../types/Turma';

export class TurmaService {
  private static baseUrl = 'http://localhost:3000/api/turmas';

  static async getAll(): Promise<Turma[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Erro ao buscar turmas');
    return response.json();
  }

  static async getAllWithRelations(): Promise<Turma[]> {
    const response = await fetch(`${this.baseUrl}/relations`);
    if (!response.ok) throw new Error('Erro ao buscar turmas com relações');
    return response.json();
  }

  static async getAtivos(): Promise<Turma[]> {
    const all = await this.getAll();
    return all.filter(t => t.ativo);
  }

  static async getInativos(): Promise<Turma[]> {
    const all = await this.getAll();
    return all.filter(t => !t.ativo);
  }

  static async getById(id: number): Promise<Turma> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar turma');
    return response.json();
  }

  static async create(turma: Omit<Turma, 'id'>): Promise<Turma> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(turma),
    });
    if (!response.ok) throw new Error('Erro ao criar turma');
    return response.json();
  }

  static async update(id: number, turma: Omit<Turma, 'id'>): Promise<Turma> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(turma),
    });
    if (!response.ok) throw new Error('Erro ao atualizar turma');
    return response.json();
  }

  static async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar turma');
  }

  static async reativar(id: number): Promise<Turma> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ativo: true }),
    });
    if (!response.ok) throw new Error('Erro ao reativar turma');
    return response.json();
  }
}