import { Request, Response } from 'express';
import { SalaService } from '../services/SalaService';

export class SalaController {
    private service: SalaService;

    constructor() {
        this.service = new SalaService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const sala = await this.service.create(req.body);
            res.status(201).json(sala);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar sala', error });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const sala = await this.service.findById(id);
            
            if (!sala) {
                res.status(404).json({ message: 'Sala não encontrada' });
                return;
            }
            
            res.json(sala);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar sala', error });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const sala = await this.service.update(id, req.body);
            
            if (!sala) {
                res.status(404).json({ message: 'Sala não encontrada' });
                return;
            }
            
            res.json(sala);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar sala', error });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const deleted = await this.service.delete(id);
            
            if (!deleted) {
                res.status(404).json({ message: 'Sala não encontrada' });
                return;
            }
            
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir sala', error });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const salas = await this.service.list();
            res.json(salas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar salas', error });
        }
    }

    async findByCapacidadeMinima(req: Request, res: Response): Promise<void> {
        try {
            const capacidade = parseInt(req.params.capacidade);
            const salas = await this.service.findByCapacidadeMinima(capacidade);
            res.json(salas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar salas por capacidade', error });
        }
    }
}