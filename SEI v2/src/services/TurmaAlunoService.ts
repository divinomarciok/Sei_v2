import { TurmaAluno } from "../models/TurmaAluno";
import { TurmaAlunoRepository } from "../repository/TurmaAlunoRepository";

export class TurmaAlunoService {
    private repository: TurmaAlunoRepository;

    constructor() {
        this.repository = new TurmaAlunoRepository();
    }

    async create(turmaAluno: TurmaAluno): Promise<TurmaAluno> {
        return await this.repository.create(turmaAluno);
    }

    async findById(id: number): Promise<TurmaAluno | null> {
        return await this.repository.findByid(id);
    }

    async update(id: number, turmaAluno: Partial<TurmaAluno>): Promise<TurmaAluno | null> {
        return await this.repository.update(id, turmaAluno);
    }

    async delete(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }

    async list(): Promise<TurmaAluno[]> {
        return await this.repository.list();
    }

    async findAtivos(): Promise<TurmaAluno[]> {
        return await this.repository.findAtivos();
    }

    async findInativos(): Promise<TurmaAluno[]> {
        return await this.repository.findInativos();
    }
}
