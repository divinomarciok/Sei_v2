import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DisciplinaService } from '../services/DisciplinaService';
import { Disciplina } from '../types/Disciplina';
import { useToast } from '@/hooks/use-toast';

const DisciplinasList = () => {
  const [disciplinasAtivas, setDisciplinasAtivas] = useState<Disciplina[]>([]);
  const [disciplinasInativas, setDisciplinasInativas] = useState<Disciplina[]>([]);
  const { toast } = useToast();

  const carregarDados = async () => {
    try {
      const ativas = await DisciplinaService.getAtivos();
      const inativas = await DisciplinaService.getInativos();
      setDisciplinasAtivas(ativas);
      setDisciplinasInativas(inativas);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar disciplinas",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleInativar = async (id: number) => {
    try {
      await DisciplinaService.delete(id);
      toast({
        title: "Sucesso",
        description: "Disciplina inativada com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao inativar disciplina",
        variant: "destructive"
      });
    }
  };

  const handleReativar = async (id: number) => {
    try {
      await DisciplinaService.reativar(id);
      toast({
        title: "Sucesso",
        description: "Disciplina reativada com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reativar disciplina",
        variant: "destructive"
      });
    }
  };

  const TabelaDisciplinas = ({ disciplinas, tipo }: { disciplinas: Disciplina[], tipo: 'ativo' | 'inativo' }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3 text-left">Nome</th>
            <th className="border p-3 text-left">Carga Horária</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((disciplina) => (
            <tr key={disciplina.id} className="hover:bg-gray-50">
              <td className="border p-3">{disciplina.nome}</td>
              <td className="border p-3">{disciplina.carga_horaria}h</td>
              <td className="border p-3">
                <Badge variant={disciplina.ativo ? "default" : "secondary"}>
                  {disciplina.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </td>
              <td className="border p-3">
                <div className="flex gap-2 justify-center">
                  <Link to={`/disciplinas/visualizar/${disciplina.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  {tipo === 'ativo' && (
                    <>
                      <Link to={`/disciplinas/editar/${disciplina.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleInativar(disciplina.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {tipo === 'inativo' && (
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => handleReativar(disciplina.id)}
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
          <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Disciplinas</h1>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link to="/disciplinas/cadastrar">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Disciplina
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Disciplinas</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ativos">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ativos">
                  Disciplinas Ativas ({disciplinasAtivas.length})
                </TabsTrigger>
                <TabsTrigger value="inativos">
                  Disciplinas Inativas ({disciplinasInativas.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ativos" className="mt-6">
                {disciplinasAtivas.length > 0 ? (
                  <TabelaDisciplinas disciplinas={disciplinasAtivas} tipo="ativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhuma disciplina ativa encontrada.
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="inativos" className="mt-6">
                {disciplinasInativas.length > 0 ? (
                  <TabelaDisciplinas disciplinas={disciplinasInativas} tipo="inativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhuma disciplina inativa encontrada.
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

export default DisciplinasList;