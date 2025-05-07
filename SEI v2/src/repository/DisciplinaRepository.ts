import { ILike } from 'typeorm';
import { BaseRepository } from './base/BaseRepository';
import { Disciplina } from '../models/Disciplina';
import { AppDataSource } from '../database/connection';

/**
 * Repositório para operações relacionadas a Disciplinas
 */
export class DisciplinaRepository extends BaseRepository<Disciplina> {
    constructor() {
        super(AppDataSource.getRepository(Disciplina));
    }
    
    /**
     * Busca disciplinas por nome (busca parcial, case insensitive)
     * @param nome Nome ou parte do nome da disciplina
     * @returns Lista de disciplinas que correspondem à busca
     */
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