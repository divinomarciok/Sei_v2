import { BaseRepository } from './base/BaseRepository';
import { Professor } from '../models/Professor';
import { AppDataSource } from '../database/connection';

/**
 * Repositório para operações relacionadas a Professores
 */
export class ProfessorRepository extends BaseRepository<Professor> {
    constructor() {
        super(AppDataSource.getRepository(Professor));
    }
    
    /**
     * Busca professor por matrícula
     * @param matricula Matrícula do professor
     * @returns Professor encontrado ou null
     */
    async findByMatricula(matricula: string): Promise<Professor | null> {
        return await this.repository.findOne({
            where: {
                matricula,
                ativo: true
            } as any
        });
    }
}