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
const app_1 = require("./app");
const connection_1 = require("./database/connection");
const PORT = process.env.PORT || 3000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, app_1.initializeDatabase)();
            console.log("Conexão com o banco de dados estabelecida com sucesso");
            yield connection_1.AppDataSource.runMigrations();
            console.log("Migrations executadas com sucesso");
            app_1.app.listen(PORT, () => {
                console.log(`Servidor rodando na porta ${PORT}`);
            });
        }
        catch (error) {
            console.error("Erro ao iniciar o servidor:", error);
            process.exit(1);
        }
    });
}
startServer();
