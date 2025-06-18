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
exports.initializeDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Disciplina_1 = require("../models/Disciplina");
const Sala_1 = require("../models/Sala");
const Professor_1 = require("../models/Professor");
const Turma_1 = require("../models/Turma");
const TurmaAluno_1 = require("../models/TurmaAluno");
const Aluno_1 = require("../models/Aluno");
// Crie uma conexão com o banco de dados
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres", // Você pode mudar para outro banco de dados se necessário
    host: "localhost",
    port: 5432,
    username: "postgres", // Altere conforme suas configurações
    password: "postgres", // Altere conforme suas configurações
    database: "sei_v2", // Altere conforme suas configurações
    synchronize: false, // Desativado para usar migrations
    logging: true,
    entities: [Sala_1.Sala, Disciplina_1.Disciplina, Professor_1.Professor, Aluno_1.Aluno, Turma_1.Turma, TurmaAluno_1.TurmaAluno],
    subscribers: [],
    migrations: [__dirname + "/../migrations/*.ts"],
    migrationsTableName: "migrations_history"
});
// Função para inicializar a conexão com o banco de dados
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.AppDataSource.initialize();
        console.log("Conexão com o banco de dados estabelecida com sucesso");
    }
    catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        throw error;
    }
});
exports.initializeDatabase = initializeDatabase;
