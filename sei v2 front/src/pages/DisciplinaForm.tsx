import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DisciplinaService } from '../services/DisciplinaService';
import { useToast } from '@/hooks/use-toast';

const DisciplinaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nome: '',
    carga_horaria: 0,
    ativo: true
  });

  useEffect(() => {
    if (isEditing) {
      const loadDisciplina = async () => {
        try {
          const disciplina = await DisciplinaService.getById(Number(id));
          setFormData({
            nome: disciplina.nome,
            carga_horaria: disciplina.carga_horaria,
            ativo: disciplina.ativo
          });
        } catch (error) {
          toast({
            title: "Erro",
            description: "Erro ao carregar disciplina",
            variant: "destructive"
          });
        }
      };
      loadDisciplina();
    }
  }, [id, isEditing, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await DisciplinaService.update(Number(id), formData);
        toast({
          title: "Sucesso",
          description: "Disciplina atualizada com sucesso!",
        });
      } else {
        await DisciplinaService.create(formData);
        toast({
          title: "Sucesso",
          description: "Disciplina cadastrada com sucesso!",
        });
      }
      navigate('/disciplinas');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar disciplina!",
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
              {isEditing ? 'Editar Disciplina' : 'Cadastrar Nova Disciplina'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="carga_horaria">Carga Horária *</Label>
                <Input
                  id="carga_horaria"
                  type="number"
                  min="1"
                  value={formData.carga_horaria}
                  onChange={(e) => setFormData({...formData, carga_horaria: Number(e.target.value)})}
                  required
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
                <Link to="/disciplinas">
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

export default DisciplinaForm;