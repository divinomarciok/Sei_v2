import { DataSource } from "typeorm";
import {  Disciplina } from "../models/Disciplina";
import {  Sala } from "../models/Sala";
import {  Professor } from "../models/Professor";
import {  Turma } from "../models/Turma";

// Crie uma conexão com o banco de dados
export const AppDataSource = new DataSource({
    type: "postgres", // Você pode mudar para outro banco de dados se necessário
    host: "localhost",
    port: 5432,
    username: "postgres", // Altere conforme suas configurações
    password: "postgres", // Altere conforme suas configurações
    database: "sei_v2", // Altere conforme suas configurações
    synchronize: false, // Desativado para usar migrations
    logging: true,
    entities: [Sala, Disciplina, Professor, Turma],
    subscribers: [],
    migrations: [__dirname + "/../migrations/*.js"],
    migrationsTableName: "migrations_history"
});

// Função para inicializar a conexão com o banco de dados
export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Conexão com o banco de dados estabelecida com sucesso");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        throw error;
    }
};