import { Request, Response } from 'express';
import { AlunoService } from '../services/AlunoService';

export class AlunoController {
    private service: AlunoService;

    constructor() {
        this.service = new AlunoService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const aluno = await this.service.create(req.body);
            res.status(201).json(aluno);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar aluno', error });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const aluno = await this.service.findById(id);
            
            if (!aluno) {
                res.status(404).json({ message: 'Aluno não encontrado' });
                return;
            }
            
            res.json(aluno);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar aluno', error });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const aluno = await this.service.update(id, req.body);
            
            if (!aluno) {
                res.status(404).json({ message: 'Aluno não encontrado' });
                return;
            }
            
            res.json(aluno);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar aluno', error });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const deleted = await this.service.delete(id);
            
            if (!deleted) {
                res.status(404).json({ message: 'Aluno não encontrado' });
                return;
            }
            
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir aluno', error });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const alunos = await this.service.list();
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar alunos', error });
        }
    }

    async findByNome(req: Request, res: Response): Promise<void> {
        try {
            const nome = req.params.nome;
            const alunos = await this.service.findByNome(nome);
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar alunos por nome', error });
        }
    }

    async findAtivos(req: Request, res: Response): Promise<void> {
        try {
            const alunos = await this.service.findAtivos();
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar alunos ativos', error });
        }
    }

    async findInativos(req: Request, res: Response): Promise<void> {
        try {
            const alunos = await this.service.findInativos();
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar alunos inativos', error });
        }
    }
}
