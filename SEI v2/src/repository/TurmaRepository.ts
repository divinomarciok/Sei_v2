import { BaseRepository } from './base/BaseRepository';
import { Turma } from '../models/Turma';
import { AppDataSource } from '../database/connection';

/**
 * Repositório para operações relacionadas a Turmas
 */
export class TurmaRepository extends BaseRepository<Turma> {
    constructor() {
        super(AppDataSource.getRepository(Turma));
    }
    
    /**
     * Busca turmas com relacionamentos (disciplina, professor e sala)
     * @returns Lista de turmas com dados relacionados
     */
    async findAllWithRelations(): Promise<Turma[]> {
        return await this.repository.find({
            relations: {
                disciplina: true,
                professor: true,
                sala: true
            },
            where: {
                ativo: true
            }
        });
    }
}