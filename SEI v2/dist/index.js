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
require("reflect-metadata");
const connection_1 = require("./database/connection");
const connection_2 = require("./database/connection");
// Inicializa a conexão com o banco de dados quando o aplicativo é iniciado
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connection_1.initializeDatabase)();
            console.log("Aplicação iniciada com sucesso!");
            // Descomente a linha abaixo para executar as migrations automaticamente ao iniciar a aplicação
            yield connection_2.AppDataSource.runMigrations();
            console.log("Migrations executadas com sucesso!");
        }
        catch (error) {
            console.error("Erro ao iniciar a aplicação:", error);
            process.exit(1);
        }
    });
}
main();
