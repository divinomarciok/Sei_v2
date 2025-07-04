import { ILike } from 'typeorm';
import { BaseRepository } from './base/BaseRepository';
import { Disciplina } from '../models/Disciplina';
import { AppDataSource } from '../database/connection';


export class DisciplinaRepository extends BaseRepository<Disciplina> {
    constructor() {
        super(AppDataSource.getRepository(Disciplina));
    }

    async findByNome(nome: string): Promise<Disciplina[]> {
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