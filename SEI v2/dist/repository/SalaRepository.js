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
exports.SalaRepository = void 0;
const BaseRepository_1 = require("./base/BaseRepository");
const Sala_1 = require("../models/Sala");
const connection_1 = require("../database/connection");
class SalaRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(connection_1.AppDataSource.getRepository(Sala_1.Sala));
    }
    findByCapacidadeMinima(capacidade) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({
                where: {
                    capacidade: capacidade >= 0 ?
                        { gte: capacidade } :
                        undefined,
                    ativo: true
                },
                order: {
                    capacidade: "ASC"
                }
            });
        });
    }
}
exports.SalaRepository = SalaRepository;
