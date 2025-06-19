import { Request, Response } from 'express';
import { DisciplinaService } from '../services/DisciplinaService';

export class DisciplinaController {
    private service: DisciplinaService;

    constructor() {
        this.service = new DisciplinaService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const disciplina = await this.service.create(req.body);
            res.status(201).json(disciplina);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar disciplina', error });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const disciplina = await this.service.findById(id);
            
            if (!disciplina) {
                res.status(404).json({ message: 'Disciplina não encontrada' });
                return;
            }
            
            res.json(disciplina);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar disciplina', error });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const disciplina = await this.service.update(id, req.body);
            
            if (!disciplina) {
                res.status(404).json({ message: 'Disciplina não encontrada' });
                return;
            }
            
            res.json(disciplina);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar disciplina', error });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const deleted = await this.service.delete(id);
            
            if (!deleted) {
                res.status(404).json({ message: 'Disciplina não encontrada' });
                return;
            }
            
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir disciplina', error });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const disciplinas = await this.service.list();
            res.json(disciplinas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar disciplinas', error });
        }
    }

    async findByNome(req: Request, res: Response): Promise<void> {
        try {
            const nome = req.params.nome;
            const disciplinas = await this.service.findByNome(nome);
            res.json(disciplinas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar disciplinas por nome', error });
        }
    }

    async findAtivos(req: Request, res: Response): Promise<void> {
        try {
            const disciplinas = await this.service.findAtivos();
            res.json(disciplinas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar disciplinas ativas', error });
        }
    }

    async findInativos(req: Request, res: Response): Promise<void> {
        try {
            const disciplinas = await this.service.findInativos();
            res.json(disciplinas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar disciplinas inativas', error });
        }
    }
}