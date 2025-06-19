import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfessorService } from '../services/ProfessorService';
import { Professor } from '../types/Professor';
import { useToast } from '@/hooks/use-toast';

const ProfessoresList = () => {
  const [professoresAtivos, setProfessoresAtivos] = useState<Professor[]>([]);
  const [professoresInativos, setProfessoresInativos] = useState<Professor[]>([]);
  const { toast } = useToast();

  const carregarDados = async () => {
    try {
      const ativos = await ProfessorService.getAtivos();
      const inativos = await ProfessorService.getInativos();
      setProfessoresAtivos(ativos);
      setProfessoresInativos(inativos);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar professores",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleInativar = async (id: number) => {
    try {
      await ProfessorService.delete(id);
      toast({
        title: "Sucesso",
        description: "Professor inativado com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao inativar professor",
        variant: "destructive"
      });
    }
  };

  const handleReativar = async (id: number) => {
    try {
      await ProfessorService.reativar(id);
      toast({
        title: "Sucesso",
        description: "Professor reativado com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reativar professor",
        variant: "destructive"
      });
    }
  };

  const TabelaProfessores = ({ professores, tipo }: { professores: Professor[], tipo: 'ativo' | 'inativo' }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3 text-left">Nome</th>
            <th className="border p-3 text-left">Matrícula</th>
            <th className="border p-3 text-left">CPF</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {professores.map((professor) => (
            <tr key={professor.id} className="hover:bg-gray-50">
              <td className="border p-3">{professor.nome}</td>
              <td className="border p-3">{professor.matricula}</td>
              <td className="border p-3">{professor.cpf}</td>
              <td className="border p-3">
                <Badge variant={professor.ativo ? "default" : "secondary"}>
                  {professor.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </td>
              <td className="border p-3">
                <div className="flex gap-2 justify-center">
                  <Link to={`/professores/visualizar/${professor.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  {tipo === 'ativo' && (
                    <>
                      <Link to={`/professores/editar/${professor.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleInativar(professor.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {tipo === 'inativo' && (
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => handleReativar(professor.id)}
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
          <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Professores</h1>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link to="/professores/cadastrar">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Professor
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Professores</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ativos">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ativos">
                  Professores Ativos ({professoresAtivos.length})
                </TabsTrigger>
                <TabsTrigger value="inativos">
                  Professores Inativos ({professoresInativos.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ativos" className="mt-6">
                {professoresAtivos.length > 0 ? (
                  <TabelaProfessores professores={professoresAtivos} tipo="ativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhum professor ativo encontrado.
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="inativos" className="mt-6">
                {professoresInativos.length > 0 ? (
                  <TabelaProfessores professores={professoresInativos} tipo="inativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhum professor inativo encontrado.
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

export default ProfessoresList;