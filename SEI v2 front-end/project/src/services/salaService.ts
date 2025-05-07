import api from './api';
import { Sala } from '../types';

export const salaService = {
  getAll: async (): Promise<Sala[]> => {
    const response = await api.get('/salas');
    return response.data;
  },

  getById: async (id: number): Promise<Sala> => {
    const response = await api.get(`/salas/${id}`);
    return response.data;
  },

  getByCapacidadeMinima: async (capacidade: number): Promise<Sala[]> => {
    const response = await api.get(`/salas/capacidade/${capacidade}`);
    return response.data;
  },

  create: async (sala: Sala): Promise<Sala> => {
    const response = await api.post('/salas', sala);
    return response.data;
  },

  update: async (id: number, sala: Sala): Promise<Sala> => {
    const response = await api.put(`/salas/${id}`, sala);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/salas/${id}`);
  }
};