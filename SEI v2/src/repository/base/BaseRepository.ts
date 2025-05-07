import { Repository, ObjectLiteral } from 'typeorm';
import { CRUDRepository } from '../../interfaces/crud.interface';

/**
 * Classe base abstrata que implementa operações CRUD
 */
export abstract class BaseRepository<T extends ObjectLiteral> implements CRUDRepository<T> {
    protected repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    /**
     * Cria uma nova entidade
     * @param item Dados da entidade a ser criada
     * @returns A entidade criada
     */
    async create(item: T): Promise<T> {
        const entity = this.repository.create(item);
        return this.repository.save(entity);
    }

    /**
     * Busca uma entidade pelo ID
     * @param id ID da entidade
     * @returns A entidade encontrada ou null se não existir
     */
    async findByid(id: number): Promise<T | null> {
        return this.repository.findOne({
            where: { id: id } as any
        });
    }

    /**
     * Atualiza uma entidade
     * @param id ID da entidade a ser atualizada
     * @param item Dados para atualização
     * @returns A entidade atualizada ou null se não existir
     */
    async update(id: number, item: Partial<T>): Promise<T | null> {
        const updateResult = await this.repository.update(id, item);

        if (updateResult.affected && updateResult.affected > 0) {
            return this.findByid(id);
        }
        return null;
    }

    /**
     * Remove uma entidade
     * @param id ID da entidade a ser removida
     * @returns true se removido com sucesso, false caso contrário
     */
    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(Number(id));
        return result.affected ? result.affected > 0 : false;
    }

    /**
     * Lista todas as entidades
     * @returns Lista de entidades
     */
    async list(): Promise<T[]> {
        return this.repository.find();
    }
}