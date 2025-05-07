"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const disciplinaRoutes_1 = require("./routes/disciplinaRoutes");
const professorRoutes_1 = require("./routes/professorRoutes");
const salaRoutes_1 = require("./routes/salaRoutes");
const turmaRoutes_1 = require("./routes/turmaRoutes");
const connection_1 = require("./database/connection");
Object.defineProperty(exports, "initializeDatabase", { enumerable: true, get: function () { return connection_1.initializeDatabase; } });
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', disciplinaRoutes_1.disciplinaRouter);
app.use('/api', professorRoutes_1.professorRouter);
app.use('/api', salaRoutes_1.salaRouter);
app.use('/api', turmaRoutes_1.turmaRouter);
app.get('/', (req, res) => {
    res.send('SEI v2 API is running');
});
