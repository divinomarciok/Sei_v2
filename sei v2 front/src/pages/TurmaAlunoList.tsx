import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TurmaAlunoService } from '../services/TurmaAlunoService';
import { TurmaAluno } from '../types/TurmaAluno';
import { useToast } from '@/hooks/use-toast';
import { TurmaService } from '../services/TurmaService';
import { AlunoService } from '../services/AlunoService';


const TurmaAlunoList = () => {
  const [turmaAlunosAtivos, setTurmaAlunosAtivos] = useState<TurmaAluno[]>([]);
  const [turmaAlunosInativos, setTurmaAlunosInativos] = useState<TurmaAluno[]>([]);
  const { toast } = useToast();

  const carregarDados = async () => {
  try {
    const [turmaAlunos, turmas, alunos] = await Promise.all([
      TurmaAlunoService.getAll(),
      TurmaService.getAll(),
      AlunoService.getAll()
    ]);

    // Enriquecer dados com informações das turmas e alunos
    const turmaAlunosEnriquecidos = turmaAlunos.map(ta => ({
      ...ta,
      turmaData: turmas.find(t => t.id === ta.turma),
      alunoData: alunos.find(a => a.id === ta.aluno)
    }));

    const ativos = turmaAlunosEnriquecidos.filter(ta => ta.ativo);
    const inativos = turmaAlunosEnriquecidos.filter(ta => !ta.ativo);
    
    setTurmaAlunosAtivos(ativos);
    setTurmaAlunosInativos(inativos);
  } catch (error) {
    toast({
      title: "Erro",
      description: "Erro ao carregar turma-alunos",
      variant: "destructive"
    });
  }
};

  useEffect(() => {
    carregarDados();
  }, []);

  const handleInativar = async (id: number) => {
    try {
      await TurmaAlunoService.delete(id);
      toast({
        title: "Sucesso",
        description: "Turma-aluno inativado com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao inativar turma-aluno",
        variant: "destructive"
      });
    }
  };

  const handleReativar = async (id: number) => {
    try {
      await TurmaAlunoService.reativar(id);
      toast({
        title: "Sucesso",
        description: "Turma-aluno reativado com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reativar turma-aluno",
        variant: "destructive"
      });
    }
  };

  const TabelaTurmaAlunos = ({ turmaAlunos, tipo }: { turmaAlunos: TurmaAluno[], tipo: 'ativo' | 'inativo' }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3 text-left">ID</th>
            <th className="border p-3 text-left">Turma</th>
            <th className="border p-3 text-left">Aluno</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {turmaAlunos.map((turmaAluno) => (
            <tr key={turmaAluno.id} className="hover:bg-gray-50">
              <td className="border p-3">{turmaAluno.id}</td>
              <td className="border p-3">{turmaAluno.turmaData?.codigoTurma || `ID: ${turmaAluno.turma}`}</td>
              <td className="border p-3">{turmaAluno.alunoData?.nome || `ID: ${turmaAluno.aluno}`}</td>
              <td className="border p-3">
                <Badge variant={turmaAluno.ativo ? "default" : "secondary"}>
                  {turmaAluno.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </td>
              <td className="border p-3">
                <div className="flex gap-2 justify-center">
                  <Link to={`/turma-alunos/visualizar/${turmaAluno.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  {tipo === 'ativo' && (
                    <>
                      <Link to={`/turma-alunos/editar/${turmaAluno.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleInativar(turmaAluno.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {tipo === 'inativo' && (
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => handleReativar(turmaAluno.id)}
                    >
                      Reativar
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Turma-Alunos</h1>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link to="/turma-alunos/cadastrar">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Associação
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Turma-Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ativos">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ativos">
                  Associações Ativas ({turmaAlunosAtivos.length})
                </TabsTrigger>
                <TabsTrigger value="inativos">
                  Associações Inativas ({turmaAlunosInativos.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ativos" className="mt-6">
                {turmaAlunosAtivos.length > 0 ? (
                  <TabelaTurmaAlunos turmaAlunos={turmaAlunosAtivos} tipo="ativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhuma associação ativa encontrada.
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="inativos" className="mt-6">
                {turmaAlunosInativos.length > 0 ? (
                  <TabelaTurmaAlunos turmaAlunos={turmaAlunosInativos} tipo="inativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhuma associação inativa encontrada.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TurmaAlunoList;