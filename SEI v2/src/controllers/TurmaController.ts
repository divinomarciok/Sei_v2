import { Request, Response } from 'express';
import { TurmaService } from '../services/TurmaService';

export class TurmaController {
    private service: TurmaService;

    constructor() {
        this.service = new TurmaService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const turma = await this.service.create(req.body);
            res.status(201).json(turma);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar turma', error });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const turma = await this.service.findById(id);
            
            if (!turma) {
                res.status(404).json({ message: 'Turma não encontrada' });
                return;
            }
            
            res.json(turma);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar turma', error });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const turma = await this.service.update(id, req.body);
            
            if (!turma) {
                res.status(404).json({ message: 'Turma não encontrada' });
                return;
            }
            
            res.json(turma);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar turma', error });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const deleted = await this.service.delete(id);
            
            if (!deleted) {
                res.status(404).json({ message: 'Turma não encontrada' });
                return;
            }
            
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir turma', error });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const turmas = await this.service.list();
            res.json(turmas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar turmas', error });
        }
    }

    async findAllWithRelations(req: Request, res: Response): Promise<void> {
        try {
            const turmas = await this.service.findAllWithRelations();
            res.json(turmas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar turmas com relacionamentos', error });
        }
    }
}