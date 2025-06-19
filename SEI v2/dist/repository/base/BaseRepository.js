"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
/**
 * Classe base abstrata que implementa operações CRUD
 */
class BaseRepository {
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Cria uma nova entidade
     * @param item Dados da entidade a ser criada
     * @returns A entidade criada
     */
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = this.repository.create(item);
            return this.repository.save(entity);
        });
    }
    /**
     * Busca uma entidade pelo ID
     * @param id ID da entidade
     * @returns A entidade encontrada ou null se não existir
     */
    findByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { id: id }
            });
        });
    }
    /**
     * Atualiza uma entidade
     * @param id ID da entidade a ser atualizada
     * @param item Dados para atualização
     * @returns A entidade atualizada ou null se não existir
     */
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield this.repository.update(id, item);
            if (updateResult.affected && updateResult.affected > 0) {
                return this.findByid(id);
            }
            return null;
        });
    }
    /**
     * Remove uma entidade
     * @param id ID da entidade a ser removida
     * @returns true se removido com sucesso, false caso contrário
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.delete(Number(id));
            return result.affected ? result.affected > 0 : false;
        });
    }
    /**
     * Lista todas as entidades
     * @returns Lista de entidades
     */
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
    /**
     * Busca todas as entidades ativas
     */
    findAtivos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({ where: { ativo: true } });
        });
    }
    /**
     * Busca todas as entidades inativas
     */
    findInativos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({ where: { ativo: false } });
        });
    }
}
exports.BaseRepository = BaseRepository;
