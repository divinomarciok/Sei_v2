import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TurmaService } from '../services/TurmaService';
import { Turma } from '../types/Turma';
import { useToast } from '@/hooks/use-toast';

const TurmasList = () => {
  const [turmasAtivas, setTurmasAtivas] = useState<Turma[]>([]);
  const [turmasInativas, setTurmasInativas] = useState<Turma[]>([]);
  const { toast } = useToast();

  const carregarDados = async () => {
  try {
    const todasTurmas = await TurmaService.getAllWithRelations();
    const ativas = todasTurmas.filter(t => t.ativo);
    const inativas = todasTurmas.filter(t => !t.ativo);
    setTurmasAtivas(ativas);
    setTurmasInativas(inativas);
  } catch (error) {
    toast({
      title: "Erro",
      description: "Erro ao carregar turmas",
      variant: "destructive"
    });
  }
};

  useEffect(() => {
    carregarDados();
  }, []);

  const handleInativar = async (id: number) => {
    try {
      await TurmaService.delete(id);
      toast({
        title: "Sucesso",
        description: "Turma inativada com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao inativar turma",
        variant: "destructive"
      });
    }
  };

  const handleReativar = async (id: number) => {
    try {
      await TurmaService.reativar(id);
      toast({
        title: "Sucesso",
        description: "Turma reativada com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reativar turma",
        variant: "destructive"
      });
    }
  };

  const TabelaTurmas = ({ turmas, tipo }: { turmas: Turma[], tipo: 'ativo' | 'inativo' }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3 text-left">Código</th>
            <th className="border p-3 text-left">Disciplina</th>
            <th className="border p-3 text-left">Professor</th>
            <th className="border p-3 text-left">Sala</th>
            <th className="border p-3 text-left">Horário</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {turmas.map((turma) => (
            <tr key={turma.id} className="hover:bg-gray-50">
              <td className="border p-3">{turma.codigoTurma}</td>
              <td className="border p-3">{turma.disciplina?.nome || `ID: ${turma.disciplina_id}`}</td>
              <td className="border p-3">{turma.professor?.nome || `ID: ${turma.professor_id}`}</td>
              <td className="border p-3">{turma.sala?.numero || `ID: ${turma.sala_id}`}</td>  
            <td className="border p-3"> {turma.hora_inicio}
      </td>
              <td className="border p-3">
                <Badge variant={turma.ativo ? "default" : "secondary"}>
                  {turma.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </td>
              <td className="border p-3">
                <div className="flex gap-2 justify-center">
                  <Link to={`/turmas/visualizar/${turma.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  {tipo === 'ativo' && (
                    <>
                      <Link to={`/turmas/editar/${turma.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleInativar(turma.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {tipo === 'inativo' && (
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => handleReativar(turma.id)}
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
          <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Turmas</h1>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link to="/turmas/cadastrar">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Turma
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Turmas</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ativos">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ativos">
                  Turmas Ativas ({turmasAtivas.length})
                </TabsTrigger>
                <TabsTrigger value="inativos">
                  Turmas Inativas ({turmasInativas.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ativos" className="mt-6">
                {turmasAtivas.length > 0 ? (
                  <TabelaTurmas turmas={turmasAtivas} tipo="ativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhuma turma ativa encontrada.
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="inativos" className="mt-6">
                {turmasInativas.length > 0 ? (
                  <TabelaTurmas turmas={turmasInativas} tipo="inativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhuma turma inativa encontrada.
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

export default TurmasList;