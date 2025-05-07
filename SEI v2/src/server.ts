import "reflect-metadata";
import { app, initializeDatabase } from './app';
import { AppDataSource } from './database/connection';

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await initializeDatabase();
        console.log("Conexão com o banco de dados estabelecida com sucesso");
        
        await AppDataSource.runMigrations();
        console.log("Migrations executadas com sucesso");
        
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
        process.exit(1);
    }
}

startServer();