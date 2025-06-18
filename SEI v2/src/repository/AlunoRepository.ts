import { ILike } from 'typeorm';
import { BaseRepository } from './base/BaseRepository';
import { Aluno } from '../models/Aluno';
import { AppDataSource } from '../database/connection';

export class AlunoRepository extends BaseRepository<Aluno> {
    constructor() {
        super(AppDataSource.getRepository(Aluno));
    }

    async findByNome(nome: string): Promise<Aluno[]> {
        return await this.repository.find({
            where: {
                nome: ILike(`%${nome}%`),
                ativo: true
            },
            order: {
                nome: "ASC"
            }
        });
    }
}
