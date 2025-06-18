import { BaseRepository } from './base/BaseRepository';
import { Turma } from '../models/Turma';
import { AppDataSource } from '../database/connection';


export class TurmaRepository extends BaseRepository<Turma> {
    constructor() {
        super(AppDataSource.getRepository(Turma));
    }
     
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