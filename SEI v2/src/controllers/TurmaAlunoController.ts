import { Request, Response } from 'express';
import { TurmaAlunoService } from '../services/TurmaAlunoService';

export class TurmaAlunoController {
    private service: TurmaAlunoService;

    constructor() {
        this.service = new TurmaAlunoService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const turmaAluno = await this.service.create(req.body);
            res.status(201).json(turmaAluno);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar turma-aluno', error });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const turmaAluno = await this.service.findById(id);
            
            if (!turmaAluno) {
                res.status(404).json({ message: 'Turma-aluno não encontrado' });
                return;
            }
            
            res.json(turmaAluno);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar turma-aluno', error });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const turmaAluno = await this.service.update(id, req.body);
            
            if (!turmaAluno) {
                res.status(404).json({ message: 'Turma-aluno não encontrado' });
                return;
            }
            
            res.json(turmaAluno);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar turma-aluno', error });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const deleted = await this.service.delete(id);
            
            if (!deleted) {
                res.status(404).json({ message: 'Turma-aluno não encontrado' });
                return;
            }
            
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir turma-aluno', error });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const turmaAlunos = await this.service.list();
            res.json(turmaAlunos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar turma-alunos', error });
        }
    }

    async findAtivos(req: Request, res: Response): Promise<void> {
        try {
            const turmaAlunos = await this.service.findAtivos();
            res.json(turmaAlunos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar turma-aluno ativos', error });
        }
    }

    async findInativos(req: Request, res: Response): Promise<void> {
        try {
            const turmaAlunos = await this.service.findInativos();
            res.json(turmaAlunos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar turma-aluno inativos', error });
        }
    }
}
