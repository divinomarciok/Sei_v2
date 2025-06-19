import { Sala } from "../models/Sala";
import { SalaRepository } from "../repository/SalaRepository";

export class SalaService {
    private repository: SalaRepository;

    constructor() {
        this.repository = new SalaRepository();
    }

    async create(sala: Sala): Promise<Sala> {
        return await this.repository.create(sala);
    }

    async findById(id: number): Promise<Sala | null> {
        return await this.repository.findByid(id);
    }

    async update(id: number, sala: Partial<Sala>): Promise<Sala | null> {
        return await this.repository.update(id, sala);
    }

    async delete(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }

    async list(): Promise<Sala[]> {
        return await this.repository.list();
    }

    async findByCapacidadeMinima(capacidade: number): Promise<Sala[]> {
        return await this.repository.findByCapacidadeMinima(capacidade);
    }

    async findAtivos(): Promise<Sala[]> {
        return await this.repository.findAtivos();
    }

    async findInativos(): Promise<Sala[]> {
        return await this.repository.findInativos();
    }
}