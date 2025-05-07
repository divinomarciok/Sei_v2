import { ObjectLiteral } from 'typeorm';

/**
 * Interface para operações CRUD básicas
 */
export interface CRUDRepository<T extends ObjectLiteral> {
    /**
     * Cria uma nova entidade
     * @param item Dados da entidade a ser criada
     * @returns A entidade criada
     */
    create(item: T): Promise<T>;
    
    /**
     * Busca uma entidade pelo ID
     * @param id ID da entidade
     * @returns A entidade encontrada ou null se não existir
     */
    findByid(id: number): Promise<T | null>;
    
    /**
     * Atualiza uma entidade
     * @param id ID da entidade a ser atualizada
     * @param item Dados para atualização
     * @returns A entidade atualizada ou null se não existir
     */
    update(id: number, item: Partial<T>): Promise<T | null>;
    
    /**
     * Remove uma entidade
     * @param id ID da entidade a ser removida
     * @returns true se removido com sucesso, false caso contrário
     */
    delete(id: number): Promise<boolean>;
    
    /**
     * Lista todas as entidades
     * @returns Lista de entidades
     */
    list(): Promise<T[]>;
}