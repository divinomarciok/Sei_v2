import { BaseRepository } from './base/BaseRepository';
import { Sala } from '../models/Sala';
import { AppDataSource } from '../database/connection';

export class SalaRepository extends BaseRepository<Sala> {
    constructor() {
        super(AppDataSource.getRepository(Sala));
    }
    
  
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