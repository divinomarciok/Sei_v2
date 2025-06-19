import { Request, Response } from 'express';
import { ProfessorService } from '../services/ProfessorService';

export class ProfessorController {
    private service: ProfessorService;

    constructor() {
        this.service = new ProfessorService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const professor = await this.service.create(req.body);
            res.status(201).json(professor);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar professor', error });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const professor = await this.service.findById(id);
            
            if (!professor) {
                res.status(404).json({ message: 'Professor não encontrado' });
                return;
            }
            
            res.json(professor);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar professor', error });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const professor = await this.service.update(id, req.body);
            
            if (!professor) {
                res.status(404).json({ message: 'Professor não encontrado' });
                return;
            }
            
            res.json(professor);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar professor', error });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const deleted = await this.service.delete(id);
            
            if (!deleted) {
                res.status(404).json({ message: 'Professor não encontrado' });
                return;
            }
            
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir professor', error });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const professores = await this.service.list();
            res.json(professores);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar professores', error });
        }
    }

    async findByMatricula(req: Request, res: Response): Promise<void> {
        try {
            const matricula = req.params.matricula;
            console.log("matricula busca : ",matricula)
            const professor = await this.service.findByMatricula(matricula);
            
            if (!professor) {
                res.status(404).json({ message: 'Professor não encontrado' });
                return;
            }
            
            res.json(professor);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar professor por matrícula', error });
        }
    }

    async findAtivos(req: Request, res: Response): Promise<void> {
        try {
            const professores = await this.service.findAtivos();
            res.json(professores);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar professores ativos', error });
        }
    }

    async findInativos(req: Request, res: Response): Promise<void> {
        try {
            const professores = await this.service.findInativos();
            res.json(professores);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar professores inativos', error });
        }
    }
}