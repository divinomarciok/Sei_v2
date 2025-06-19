import { Sala } from '../types/Sala';

export class SalaService {
  private static baseUrl = 'http://localhost:3000/api/salas';

  static async getAll(): Promise<Sala[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Erro ao buscar salas');
    return response.json();
  }

  static async getAtivos(): Promise<Sala[]> {
    const all = await this.getAll();
    return all.filter(s => s.ativo);
  }

  static async getInativos(): Promise<Sala[]> {
    const all = await this.getAll();
    return all.filter(s => !s.ativo);
  }

  static async getById(id: number): Promise<Sala> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar sala');
    return response.json();
  }

  static async getByCapacidade(capacidade: number): Promise<Sala[]> {
    const response = await fetch(`${this.baseUrl}/capacidade/${capacidade}`);
    if (!response.ok) throw new Error('Erro ao buscar salas por capacidade');
    return response.json();
  }

  static async create(sala: Omit<Sala, 'id'>): Promise<Sala> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sala),
    });
    if (!response.ok) throw new Error('Erro ao criar sala');
    return response.json();
  }

  static async update(id: number, sala: Omit<Sala, 'id'>): Promise<Sala> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sala),
    });
    if (!response.ok) throw new Error('Erro ao atualizar sala');
    return response.json();
  }

  static async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar sala');
  }

  static async reativar(id: number): Promise<Sala> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ativo: true }),
    });
    if (!response.ok) throw new Error('Erro ao reativar sala');
    return response.json();
  }
}