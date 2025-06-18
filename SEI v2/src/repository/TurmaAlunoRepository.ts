import { BaseRepository } from './base/BaseRepository';
import { TurmaAluno } from '../models/TurmaAluno';
import { AppDataSource } from '../database/connection';

export class TurmaAlunoRepository extends BaseRepository<TurmaAluno> {
    constructor() {
        super(AppDataSource.getRepository(TurmaAluno));
    }
}
