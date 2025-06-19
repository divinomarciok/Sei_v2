import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SalaService } from '../services/SalaService';
import { Sala } from '../types/Sala';
import { useToast } from '@/hooks/use-toast';

const SalasList = () => {
  const [salasAtivas, setSalasAtivas] = useState<Sala[]>([]);
  const [salasInativas, setSalasInativas] = useState<Sala[]>([]);
  const { toast } = useToast();

  const carregarDados = async () => {
    try {
      const ativas = await SalaService.getAtivos();
      const inativas = await SalaService.getInativos();
      setSalasAtivas(ativas);
      setSalasInativas(inativas);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar salas",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleInativar = async (id: number) => {
    try {
      await SalaService.delete(id);
      toast({
        title: "Sucesso",
        description: "Sala inativada com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao inativar sala",
        variant: "destructive"
      });
    }
  };

  const handleReativar = async (id: number) => {
    try {
      await SalaService.reativar(id);
      toast({
        title: "Sucesso",
        description: "Sala reativada com sucesso!",
      });
      carregarDados();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reativar sala",
        variant: "destructive"
      });
    }
  };

  const TabelaSalas = ({ salas, tipo }: { salas: Sala[], tipo: 'ativo' | 'inativo' }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3 text-left">Número</th>
            <th className="border p-3 text-left">Capacidade</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {salas.map((sala) => (
            <tr key={sala.id} className="hover:bg-gray-50">
              <td className="border p-3">{sala.numero}</td>
              <td className="border p-3">{sala.capacidade} pessoas</td>
              <td className="border p-3">
                <Badge variant={sala.ativo ? "default" : "secondary"}>
                  {sala.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </td>
              <td className="border p-3">
                <div className="flex gap-2 justify-center">
                  <Link to={`/salas/visualizar/${sala.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  {tipo === 'ativo' && (
                    <>
                      <Link to={`/salas/editar/${sala.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleInativar(sala.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {tipo === 'inativo' && (
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => handleReativar(sala.id)}
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
          <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Salas</h1>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link to="/salas/cadastrar">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Sala
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Salas</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ativos">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ativos">
                  Salas Ativas ({salasAtivas.length})
                </TabsTrigger>
                <TabsTrigger value="inativos">
                  Salas Inativas ({salasInativas.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ativos" className="mt-6">
                {salasAtivas.length > 0 ? (
                  <TabelaSalas salas={salasAtivas} tipo="ativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhuma sala ativa encontrada.
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="inativos" className="mt-6">
                {salasInativas.length > 0 ? (
                  <TabelaSalas salas={salasInativas} tipo="inativo" />
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nenhuma sala inativa encontrada.
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

export default SalasList;