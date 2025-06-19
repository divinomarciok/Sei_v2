import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TurmaAlunoService } from '../services/TurmaAlunoService';
import { TurmaService } from '../services/TurmaService';
import { AlunoService } from '../services/AlunoService';
import { Turma } from '../types/Turma';
import { Aluno } from '../types/Aluno';
import { useToast } from '@/hooks/use-toast';

const TurmaAlunoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    turma: 0,
    aluno: 0,
    ativo: true
  });

  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [turmasData, alunosData] = await Promise.all([
          TurmaService.getAtivos(),
          AlunoService.getAtivos()
        ]);
        setTurmas(turmasData);
        setAlunos(alunosData);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao carregar opções",
          variant: "destructive"
        });
      }
    };
    loadOptions();
  }, [toast]);

  useEffect(() => {
    if (isEditing) {
      const loadTurmaAluno = async () => {
        try {
          const turmaAluno = await TurmaAlunoService.getById(Number(id));
          setFormData({
            turma: turmaAluno.turma,
            aluno: turmaAluno.aluno,
            ativo: turmaAluno.ativo
          });
        } catch (error) {
          toast({
            title: "Erro",
            description: "Erro ao carregar turma-aluno",
            variant: "destructive"
          });
        }
      };
      loadTurmaAluno();
    }
  }, [id, isEditing, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await TurmaAlunoService.update(Number(id), formData);
        toast({
          title: "Sucesso",
          description: "Associação atualizada com sucesso!",
        });
      } else {
        await TurmaAlunoService.create(formData);
        toast({
          title: "Sucesso",
          description: "Associação cadastrada com sucesso!",
        });
      }
      navigate('/turma-alunos');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar associação!",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? 'Editar Associação Turma-Aluno' : 'Cadastrar Nova Associação Turma-Aluno'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="turma">Turma *</Label>
                <Select value={formData.turma > 0 ? formData.turma.toString() : ""} onValueChange={(value) => setFormData({...formData, turma: Number(value)})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma turma" />
                  </SelectTrigger>
                  <SelectContent>
                    {turmas.map((turma) => (
                      <SelectItem key={turma.id} value={turma.id.toString()}>
                        {turma.codigoTurma}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="aluno">Aluno *</Label>
<Select value={formData.aluno > 0 ? formData.aluno.toString() : ""} onValueChange={(value) => setFormData({...formData, aluno: Number(value)})}>

                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {alunos.map((aluno) => (
                      <SelectItem key={aluno.id} value={aluno.id.toString()}>
                        {aluno.nome} - {aluno.matricula}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ativo"
                  checked={formData.ativo}
                  onCheckedChange={(checked) => setFormData({...formData, ativo: !!checked})}
                />
                <Label htmlFor="ativo">Ativo</Label>
              </div>

              <div className="flex justify-between pt-4">
                <Link to="/turma-alunos">
                  <Button variant="outline">Cancelar</Button>
                </Link>
                <Button type="submit">
                  {isEditing ? 'Atualizar' : 'Cadastrar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TurmaAlunoForm;