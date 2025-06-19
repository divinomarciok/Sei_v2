
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ProfessorService } from '../services/ProfessorService';
import { Professor } from '../types/Professor';
import { useToast } from '@/hooks/use-toast';

const ProfessorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    cpf: '',
    ativo: true
  });

  useEffect(() => {
    if (isEditing) {
      const loadProfessor = async () => {
        try {
          const professor = await ProfessorService.getById(Number(id));
          setFormData({
            nome: professor.nome,
            matricula: professor.matricula,
            cpf: professor.cpf,
            ativo: professor.ativo
          });
        } catch (error) {
          toast({
            title: "Erro",
            description: "Erro ao carregar professor",
            variant: "destructive"
          });
        }
      };
      loadProfessor();
    }
  }, [id, isEditing, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await ProfessorService.update(Number(id), formData);
        toast({
          title: "Sucesso",
          description: "Professor atualizado com sucesso!",
        });
      } else {
        await ProfessorService.create(formData);
        toast({
          title: "Sucesso",
          description: "Professor cadastrado com sucesso!",
        });
      }
      navigate('/professores');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar professor!",
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
              {isEditing ? 'Editar Professor' : 'Cadastrar Novo Professor'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  maxLength={200}
                  required
                />
              </div>

              <div>
                <Label htmlFor="matricula">Matrícula *</Label>
                <Input
                  id="matricula"
                  value={formData.matricula}
                  onChange={(e) => setFormData({...formData, matricula: e.target.value})}
                  maxLength={30}
                  required
                />
              </div>

              <div>
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 11) {
                      setFormData({...formData, cpf: value});
                    }
                  }}
                  placeholder="Apenas números (máx. 11 dígitos)"
                  maxLength={11}
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
                <Link to="/professores">
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

export default ProfessorForm;
