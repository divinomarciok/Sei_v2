import { Disciplina } from '../types/Disciplina';

export class DisciplinaService {
  private static baseUrl = 'http://localhost:3000/api/disciplina';

  static async getAll(): Promise<Disciplina[]> {
    const response = await fetch("http://localhost:3000/api/disciplinas");
    if (!response.ok) throw new Error('Erro ao buscar disciplinas');
    return response.json();
  }

  static async getAtivos(): Promise<Disciplina[]> {
    const all = await this.getAll();
    return all.filter(d => d.ativo);
  }

  static async getInativos(): Promise<Disciplina[]> {
    const all = await this.getAll();
    return all.filter(d => !d.ativo);
  }

  static async getById(id: number): Promise<Disciplina> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar disciplina');
    return response.json();
  }

  static async getByNome(nome: string): Promise<Disciplina[]> {
    const response = await fetch(`${this.baseUrl}/nome/${encodeURIComponent(nome)}`);
    if (!response.ok) throw new Error('Erro ao buscar disciplina por nome');
    return response.json();
  }

  static async create(disciplina: Omit<Disciplina, 'id'>): Promise<Disciplina> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(disciplina),
    });
    if (!response.ok) throw new Error('Erro ao criar disciplina');
    return response.json();
  }

  static async update(id: number, disciplina: Omit<Disciplina, 'id'>): Promise<Disciplina> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(disciplina),
    });
    if (!response.ok) throw new Error('Erro ao atualizar disciplina');
    return response.json();
  }

  static async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar disciplina');
  }

  static async reativar(id: number): Promise<Disciplina> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ativo: true }),
    });
    if (!response.ok) throw new Error('Erro ao reativar disciplina');
    return response.json();
  }
}