import { BaseRepository } from './base/BaseRepository';
import { Sala } from '../models/Sala';
import { AppDataSource } from '../database/connection';

/**
 * Repositório para operações relacionadas a Salas
 */
export class SalaRepository extends BaseRepository<Sala> {
    constructor() {
        super(AppDataSource.getRepository(Sala));
    }
    
    /**
     * Busca salas com capacidade maior ou igual à especificada
     * @param capacidade Capacidade mínima da sala
     * @returns Lista de salas com capacidade suficiente
     */
    async findByCapacidadeMinima(capacidade: number): Promise<Sala[]> {
        return await this.repository.find({
            where: {
                capacidade: capacidade >= 0 ? 
                    { gte: capacidade } as any : 
                    undefined,
                ativo: true
            },
            order: {
                capacidade: "ASC"
            }
        });
    }
}