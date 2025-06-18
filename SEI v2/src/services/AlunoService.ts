import { Aluno } from "../models/Aluno";
import { AlunoRepository } from "../repository/AlunoRepository";

export class AlunoService {
    private repository: AlunoRepository;

    constructor() {
        this.repository = new AlunoRepository();
    }

    async create(aluno: Aluno): Promise<Aluno> {
        return await this.repository.create(aluno);
    }

    async findById(id: number): Promise<Aluno | null> {
        return await this.repository.findByid(id);
    }

    async update(id: number, aluno: Partial<Aluno>): Promise<Aluno | null> {
        return await this.repository.update(id, aluno);
    }

    async delete(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }

    async list(): Promise<Aluno[]> {
        return await this.repository.list();
    }

    async findByNome(nome: string): Promise<Aluno[]> {
        return await this.repository.findByNome(nome);
    }
}
