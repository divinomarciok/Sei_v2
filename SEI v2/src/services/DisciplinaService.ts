import { Disciplina } from "../models/Disciplina";
import { DisciplinaRepository } from "../repository/DisciplinaRepository";

export class DisciplinaService {
    private repository: DisciplinaRepository;

    constructor() {
        this.repository = new DisciplinaRepository();
    }

    async create(disciplina: Disciplina): Promise<Disciplina> {
        return await this.repository.create(disciplina);
    }

    async findById(id: number): Promise<Disciplina | null> {
        return await this.repository.findByid(id);
    }

    async update(id: number, disciplina: Partial<Disciplina>): Promise<Disciplina | null> {
        return await this.repository.update(id, disciplina);
    }

    async delete(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }

    async list(): Promise<Disciplina[]> {
        return await this.repository.list();
    }

    async findByNome(nome: string): Promise<Disciplina[]> {
        return await this.repository.findByNome(nome);
    }
}