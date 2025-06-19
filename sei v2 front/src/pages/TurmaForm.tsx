import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TurmaService } from '../services/TurmaService';
import { DisciplinaService } from '../services/DisciplinaService';
import { ProfessorService } from '../services/ProfessorService';
import { SalaService } from '../services/SalaService';
import { Disciplina } from '../types/Disciplina';
import { Professor } from '../types/Professor';
import { Sala } from '../types/Sala';
import { useToast } from '@/hooks/use-toast';

const TurmaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    codigoTurma: '',
    disciplina_id: 0,
    professor_id: 0,
    sala_id: 0,
    horario: 0,
    hora_inicio: '',
    hora_fim: '',
    ativo: true
  });

  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [disciplinasData, professoresData, salasData] = await Promise.all([
          DisciplinaService.getAtivos(),
          ProfessorService.getAtivos(),
          SalaService.getAtivos()
        ]);
        setDisciplinas(disciplinasData);
        setProfessores(professoresData);
        setSalas(salasData);
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
      const loadTurma = async () => {
        try {
          const turma = await TurmaService.getById(Number(id));
          setFormData({
            codigoTurma: turma.codigoTurma,
            disciplina_id: turma.disciplina_id,
            professor_id: turma.professor_id,
            sala_id: turma.sala_id,
            horario: turma.horario,
            hora_inicio: turma.hora_inicio,
            hora_fim: turma.hora_fim,
            ativo: turma.ativo
          });
        } catch (error) {
          toast({
            title: "Erro",
            description: "Erro ao carregar turma",
            variant: "destructive"
          });
        }
      };
      loadTurma();
    }
  }, [id, isEditing, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await TurmaService.update(Number(id), formData);
        toast({
          title: "Sucesso",
          description: "Turma atualizada com sucesso!",
        });
      } else {
        await TurmaService.create(formData);
        toast({
          title: "Sucesso",
          description: "Turma cadastrada com sucesso!",
        });
      }
      navigate('/turmas');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar turma!",
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
              {isEditing ? 'Editar Turma' : 'Cadastrar Nova Turma'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="codigoTurma">Código da Turma *</Label>
                <Input
                  id="codigoTurma"
                  value={formData.codigoTurma}
                  onChange={(e) => setFormData({...formData, codigoTurma: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="disciplina_id">Disciplina *</Label>
                <Select value={formData.disciplina_id.toString()} onValueChange={(value) => setFormData({...formData, disciplina_id: Number(value)})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplinas.map((disciplina) => (
                      <SelectItem key={disciplina.id} value={disciplina.id.toString()}>
                        {disciplina.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="professor_id">Professor *</Label>
                <Select value={formData.professor_id.toString()} onValueChange={(value) => setFormData({...formData, professor_id: Number(value)})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {professores.map((professor) => (
                      <SelectItem key={professor.id} value={professor.id.toString()}>
                        {professor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sala_id">Sala *</Label>
                <Select value={formData.sala_id.toString()} onValueChange={(value) => setFormData({...formData, sala_id: Number(value)})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma sala" />
                  </SelectTrigger>
                  <SelectContent>
                    {salas.map((sala) => (
                      <SelectItem key={sala.id} value={sala.id.toString()}>
                        Sala {sala.numero} (Cap: {sala.capacidade})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="horario">Horário *</Label>
                <Input
                  id="horario"
                  type="number"
                  min="1"
                  value={formData.horario}
                  onChange={(e) => setFormData({...formData, horario: Number(e.target.value)})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="hora_inicio">Hora Início</Label>
                <Input
                  id="hora_inicio"
                  type="time"
                  value={formData.hora_inicio}
                  onChange={(e) => setFormData({...formData, hora_inicio: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="hora_fim">Hora Fim</Label>
                <Input
                  id="hora_fim"
                  type="time"
                  value={formData.hora_fim}
                  onChange={(e) => setFormData({...formData, hora_fim: e.target.value})}
                />
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
                <Link to="/turmas">
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

export default TurmaForm;