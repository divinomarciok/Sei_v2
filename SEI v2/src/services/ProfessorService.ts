import { Professor } from "../models/Professor";
import { ProfessorRepository } from "../repository/ProfessorRepository";

export class ProfessorService {
    private repository: ProfessorRepository;

    constructor() {
        this.repository = new ProfessorRepository();
    }

    async create(professor: Professor): Promise<Professor> {
        return await this.repository.create(professor);
    }

    async findById(id: number): Promise<Professor | null> {
        return await this.repository.findByid(id);
    }

    async update(id: number, professor: Partial<Professor>): Promise<Professor | null> {
        return await this.repository.update(id, professor);
    }

    async delete(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }

    async list(): Promise<Professor[]> {
        return await this.repository.list();
    }

    async findByMatricula(matricula: string): Promise<Professor | null> {
        return await this.repository.findByMatricula(matricula);
    }
}