import { Turma } from "../models/Turma";
import { TurmaRepository } from "../repository/TurmaRepository";

export class TurmaService {
    private repository: TurmaRepository;

    constructor() {
        this.repository = new TurmaRepository();
    }

    async create(turma: Turma): Promise<Turma> {
        return await this.repository.create(turma);
    }

    async findById(id: number): Promise<Turma | null> {
        return await this.repository.findByid(id);
    }

    async update(id: number, turma: Partial<Turma>): Promise<Turma | null> {
        return await this.repository.update(id, turma);
    }

    async delete(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }

    async list(): Promise<Turma[]> {
        return await this.repository.list();
    }

    async findAllWithRelations(): Promise<Turma[]> {
        return await this.repository.findAllWithRelations();
    }
}