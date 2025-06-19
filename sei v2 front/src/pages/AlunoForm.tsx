
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { AlunoService } from '../services/AlunoService';
import { Aluno } from '../types/Aluno';
import { useToast } from '@/hooks/use-toast';

const AlunoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    matricula: '',
    dataNascimento: '',
    cpf: '',
    ativo: true
  });

  useEffect(() => {
    if (isEditing) {
      const loadAluno = async () => {
        try {
          const aluno = await AlunoService.getById(Number(id));
          setFormData({
            nome: aluno.nome,
            email: aluno.email || '',
            matricula: aluno.matricula,
            dataNascimento: aluno.dataNascimento 
              ? new Date(aluno.dataNascimento).toISOString().split('T')[0] 
              : '',
            cpf: aluno.cpf,
            ativo: aluno.ativo
          });
        } catch (error) {
          toast({
            title: "Erro",
            description: "Erro ao carregar aluno",
            variant: "destructive"
          });
        }
      };
      loadAluno();
    }
  }, [id, isEditing, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const alunoData = {
      nome: formData.nome,
      email: formData.email || undefined,
      matricula: formData.matricula,
      dataNascimento: formData.dataNascimento ? new Date(formData.dataNascimento) : undefined,
      cpf: formData.cpf,
      ativo: formData.ativo
    };

    try {
      if (isEditing) {
        await AlunoService.update(Number(id), alunoData);
        toast({
          title: "Sucesso",
          description: "Aluno atualizado com sucesso!",
        });
      } else {
        await AlunoService.create(alunoData);
        toast({
          title: "Sucesso",
          description: "Aluno cadastrado com sucesso!",
        });
      }
      navigate('/alunos');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar aluno!",
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
              {isEditing ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}
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
                  required
                />
              </div>

              <div>
                <Label htmlFor="matricula">Matrícula *</Label>
                <Input
                  id="matricula"
                  value={formData.matricula}
                  onChange={(e) => setFormData({...formData, matricula: e.target.value})}
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

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData({...formData, dataNascimento: e.target.value})}
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
                <Link to="/alunos">
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

export default AlunoForm;
