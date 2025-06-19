
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlunoService } from '../services/AlunoService';
import { Aluno } from '../types/Aluno';
import { useToast } from '@/hooks/use-toast';

const AlunosList = () => {
  const [alunosAtivos, setAlunosAtivos] = useState<Aluno[]>([]);
  const [alunosInativos, setAlunosInativos] = useState<Aluno[]>([]);
  const { toast } = useToast();

  const carregarDados = async () => {
    try {
      const ativos = await AlunoService.getAtivos();
      const inativos = await AlunoService.getInativos();
      setAlunosAtivos(ativos);
      setAlunosInativos(inativos);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar alunos",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleInativar = async (id: number) => {
    try {
      await AlunoService.delete(id);
      toast({
        title: "Sucesso",
        description: "Aluno inativado com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao inativar aluno",
        variant: "destructive"
      });
    }
  };

  const handleReativar = async (id: number) => {
    try {
      await AlunoService.reativar(id);
      toast({
        title: "Sucesso", 
        description: "Aluno reativado com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reativar aluno",
        variant: "destructive"
      });
    }
  };

  const formatarData = (data?: Date) => {
    if (!data) return 'Não informado';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const TabelaAlunos = ({ alunos, tipo }: { alunos: Aluno[], tipo: 'ativo' | 'inativo' }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3 text-left">Nome</th>
            <th className="border p-3 text-left">Matrícula</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">CPF</th>
            <th className="border p-3 text-left">Data Nascimento</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id} className="hover:bg-gray-50">
              <td className="border p-3">{aluno.nome}</td>
              <td className="border p-3">{aluno.matricula}</td>
              <td className="border p-3">{aluno.email || 'N/A'}</td>
              <td className="border p-3">{aluno.cpf}</td>
              <td className="border p-3">{formatarData(aluno.dataNascimento)}</td>
              <td className="border p-3">
                <Badge variant={aluno.ativo ? "default" : "secondary"}>
                  {aluno.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </td>
              <td className="border p-3">
                <div className="flex gap-2 justify-center">
                  <Link to={`/alunos/visualizar/${aluno.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  {tipo === 'ativo' && (
                    <>
                      <Link to={`/alunos/editar/${aluno.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleInativar(aluno.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {tipo === 'inativo' && (
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => handleReativar(aluno.id)}
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
          <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Alunos</h1>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link to="/alunos/cadastrar">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Aluno
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ativos">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ativos">
                  Alunos Ativos ({alunosAtivos.length})
                </TabsTrigger>
                <TabsTrigger value="inativos">
                  Alunos Inativos ({alunosInativos.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ativos" className="mt-6">
                {alunosAtivos.length > 0 ? (
                  <TabelaAlunos alunos={alunosAtivos} tipo="ativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhum aluno ativo encontrado.
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="inativos" className="mt-6">
                {alunosInativos.length > 0 ? (
                  <TabelaAlunos alunos={alunosInativos} tipo="inativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhum aluno inativo encontrado.
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

export default AlunosList;
