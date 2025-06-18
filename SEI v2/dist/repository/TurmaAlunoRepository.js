"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmaAlunoRepository = void 0;
const BaseRepository_1 = require("./base/BaseRepository");
const TurmaAluno_1 = require("../models/TurmaAluno");
const connection_1 = require("../database/connection");
class TurmaAlunoRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(connection_1.AppDataSource.getRepository(TurmaAluno_1.TurmaAluno));
    }
}
exports.TurmaAlunoRepository = TurmaAlunoRepository;
