# SEI v2

Sistema de Ensino Integrado - Versão 2

## Configuração do Projeto

### Pré-requisitos
- Node.js
- PostgreSQL

### Instalação
1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados no arquivo `src/database/connection.ts`

### Executando o projeto
```bash
# Desenvolvimento
npm run dev

# Compilar e executar
npm run buildrun
```

## Migrations

### Executar migrations
```bash
npm run migration:run
```

### Reverter a última migration
```bash
npm run migration:revert
```

### Gerar uma nova migration baseada nas alterações das entidades
```bash
npm run migration:generate -- src/migrations/NomeDaMigration
```

### Criar uma migration vazia
```bash
npm run migration:create -- src/migrations/NomeDaMigration
```

## Estrutura do Projeto
- `src/models`: Entidades do banco de dados
- `src/migrations`: Migrations para controle de versão do banco de dados
- `src/database`: Configuração de conexão com o banco de dados
- `src/repository`: Repositórios para operações no banco de dados